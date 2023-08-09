from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Challenges_users
from .serializers import ChallengeUserSerializer


class ChallengeUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChallengeUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserChallengesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        challenges_users = Challenges_users.objects.filter(user=user_id)
        serializer = ChallengeUserSerializer(
            challenges_users, many=True, context={'request': request})
        return Response(serializer.data)


class ChallengeUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, challenge_id, *args, **kwargs):
        challenges_users = Challenges_users.objects.filter(
            challenge=challenge_id)
        serializer = ChallengeUserSerializer(
            challenges_users, many=True, context={'request': request})
        return Response(serializer.data)


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
