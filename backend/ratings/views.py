# ratings/views.py

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Ratings
from .serializers import RatingsSerializer


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


class TaskRatingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, task_id, *args, **kwargs):
        ratings = Ratings.objects.filter(task_id=task_id)
        serializer = RatingsSerializer(
            ratings, many=True, context={'request': request})
        return Response(serializer.data)


class NoteRatingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, note_id, *args, **kwargs):
        print("note_id", note_id)
        ratings = Ratings.objects.filter(note_id=note_id)
        serializer = RatingsSerializer(
            ratings, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = RatingsSerializer(
            data=request.data, context={'request': request})
        user = request.user
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
