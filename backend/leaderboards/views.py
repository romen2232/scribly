
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Leaderboard
from .serializers import Leaderboard


class LeaderboardList(APIView):
    def get(self, request, format=None):
        leaderboards = Leaderboard.objects.all()
        serializer = Leaderboard(leaderboards, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Leaderboard(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LeaderboardDetail(APIView):
    def get_object(self, pk):
        try:
            return Leaderboard.objects.get(pk=pk)
        except Leaderboard.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        leaderboard = self.get_object(pk)
        serializer = Leaderboard(leaderboard)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        leaderboard = self.get_object(pk)
        serializer = Leaderboard(leaderboard, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        leaderboard = self.get_object(pk)
        leaderboard.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
