# ratings/views.py

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Ratings
from .serializers import RatingsSerializer

from challenges.models import Challenges
from notes.models import Notes

from badges.models import Badge
from badges_users.models import Badges_users


class RatingsListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        ratings = Ratings.objects.all()
        serializer = RatingsSerializer(
            ratings, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = RatingsSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def update_challenge_average_rating(challenge_id):
    ratings = Ratings.objects.filter(challenge_id=challenge_id)
    sum = 0
    for rating in ratings:
        sum += rating.rating
    average = sum / len(ratings)
    challenge = Challenges.objects.get(id=challenge_id)
    challenge.challenge_average_rating = average
    challenge.save()
    
def update_note_average_rating(note_id):
    ratings = Ratings.objects.filter(note_id=note_id)
    sum = 0
    for rating in ratings:
        sum += rating.rating
    average = sum / len(ratings)
    note = Notes.objects.get(id=note_id)
    note.note_average_rating = average
    note.save()


class UserRatingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        ratings = Ratings.objects.filter(user_id=user_id)
        serializer = RatingsSerializer(
            ratings, many=True, context={'request': request})
        return Response(serializer.data)


class ChallengeRatingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, challenge_id, *args, **kwargs):
        ratings = Ratings.objects.filter(challenge_id=challenge_id)
        serializer = RatingsSerializer(
            ratings, many=True, context={'request': request})
        return Response(serializer.data)
    
    def post(self, request, challenge_id, *args, **kwargs):
        serializer = RatingsSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user, challenge_id=challenge_id)
            update_challenge_average_rating(challenge_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class NoteRatingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]


    def get(self, request, note_id, *args, **kwargs):
        ratings = Ratings.objects.filter(note_id=note_id)
        serializer = RatingsSerializer(
            ratings, many=True, context={'request': request})
        return Response(serializer.data)
    
    def post(self, request, note_id, *args, **kwargs):
        serializer = RatingsSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user, note_id=note_id)
            
            
            
        if Ratings.objects.filter(user=request.user).count() == 1:
            
            # create badge user
            badge = Badge.objects.get(name="Crítico de Contenidos")
            #check if it already exist, if not creat it
            if not Badges_users.objects.filter(user=self.request.user, badge=badge):
                badge_user = Badges_users(user=self.request.user, badge=badge)
                badge_user.save()
            
            
            
            update_note_average_rating(note_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    


class TaskRatingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, task_id, *args, **kwargs):
        ratings = Ratings.objects.filter(task_id=task_id)
        serializer = RatingsSerializer(
            ratings, many=True, context={'request': request})
        return Response(serializer.data)


class RatingDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, user_id, challenge_id=None, task_id=None, note_id=None):
        try:
            if challenge_id is not None:
                return Ratings.objects.get(user_id=user_id, challenge_id=challenge_id)
            elif task_id is not None:
                return Ratings.objects.get(user_id=user_id, task_id=task_id)
            elif note_id is not None:
                return Ratings.objects.get(user_id=user_id, note_id=note_id)
        except Ratings.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, user_id, challenge_id=None, task_id=None, format=None):
        rating = self.get_object(user_id, challenge_id, task_id)
        serializer = RatingsSerializer(rating, context={'request': request})
        return Response(serializer.data)

    def patch(self, request, user_id, challenge_id=None, task_id=None, format=None):
        rating = self.get_object(user_id, challenge_id, task_id)
        serializer = RatingsSerializer(rating, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, challenge_id=None, task_id=None, format=None):
        rating = self.get_object(user_id, challenge_id, task_id)
        rating.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
