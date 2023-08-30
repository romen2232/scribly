from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Challenges_users
from .serializers import ChallengeUserSerializer
from tasks_users.apps import *


class ChallengeUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChallengeUserSerializer(
            data=request.data, context={'request': request})
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            print('2')
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print('3')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request, *args, **kwargs):
    # #     serializer = ChallengeUserSerializer(
    # #         data=request.data, context={'request': request})
    # #     print(serializer)
    # #     print('1antesdetry')
    # #     try:
    # #         serializer.is_valid(raise_exception=True)
    # #         print('1despues')
    # #     except serializer.ValidationError as e:
    # #         print('Validation Error:', e.detail)
    # #         return Response({'error': 'Validation failed'}, status=status.HTTP_400_BAD_REQUEST)
    # #     print('2')
    # #     serializer.save()
    # #     return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserChallengesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        challenges_users = Challenges_users.objects.filter(user=user_id)
        serializer = ChallengeUserSerializer(
            challenges_users, many=True, context={'request': request})
        return Response(serializer.data)
    
    
    
    def post(self, request, *args, **kwargs):
        serializer = ChallengeUserSerializer(
            data=request.data,partial = True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChallengeUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, challenge_id, *args, **kwargs):
        challenges_users = Challenges_users.objects.filter(
            challenge=challenge_id)
        serializer = ChallengeUserSerializer(
            challenges_users, many=True, context={'request': request})
        return Response(serializer.data)
    
    def post(self, request, challenge_id, *args, **kwargs):
        serializer = ChallengeUserSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SpecificUserChallengeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, challenge_id, *args, **kwargs):
        try:
            challenge_user = Challenges_users.objects.get(
                user=user_id, challenge=challenge_id)
            return Response(ChallengeUserSerializer(challenge_user).data)
        except Challenges_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, challenge_id, *args, **kwargs):
        try:
            challenge_user = Challenges_users.objects.get(
                user=user_id, challenge=challenge_id)
            challenge_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Challenges_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


      
class AnswerChallengeView(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def patch(self, request, challenge_id, *args, **kwargs):
        
        try:
            challenge_user = Challenges_users.objects.get(
                user=request.user, challenge=challenge_id)
            
            if challenge_user.is_completed:
                raise Challenges_users.DoesNotExist
            
            serializer = ChallengeUserSerializer(
                challenge_user, data=request.data, partial=True, context={'request': request})
            
            if serializer.is_valid():
                serializer.save()
                
                self.update_response(challenge_user)
                
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Challenges_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
    def update_response(self, challenge_user):
        
        input = challenge_user.answer_note.note_content
        statement = challenge_user.challenge.challenge_description
        correction, response_text, mark = CorrectionWrite(input=input, statement=statement)
        
        
        challenge_user.is_completed = correction
        challenge_user.response_text = response_text
        
        if correction:
            challenge_user.earned_points = mark * challenge_user.challenge.challenge_points
            
        self.update_user_points(challenge_user)
        
        return correction, response_text
        
    def update_user_points(self, challenge_user):
        
        user = challenge_user.user
        if challenge_user.is_completed:
            
            user.gems += challenge_user.earned_points
                
        
            user.save()
        
        return challenge_user.earned_points