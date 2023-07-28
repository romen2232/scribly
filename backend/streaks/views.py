
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Streak
from .serializers import Streak


class StreakList(APIView):
    def get(self, request, format=None):
        streaks = Streak.objects.all()
        serializer = Streak(streaks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Streak(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StreakDetail(APIView):
    def get_object(self, pk):
        try:
            return Streak.objects.get(pk=pk)
        except Streak.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        streak = self.get_object(pk)
        serializer = Streak(streak)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        streak = self.get_object(pk)
        serializer = Streak(streak, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        streak = self.get_object(pk)
        streak.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
