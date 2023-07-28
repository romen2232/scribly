
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import ChallengeUser
from .serializers import ChallengeUser


class ChallengeUserList(APIView):
    def get(self, request, format=None):
        challengeusers = ChallengeUser.objects.all()
        serializer = ChallengeUser(challengeusers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ChallengeUser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChallengeUserDetail(APIView):
    def get_object(self, pk):
        try:
            return ChallengeUser.objects.get(pk=pk)
        except ChallengeUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        challengeuser = self.get_object(pk)
        serializer = ChallengeUser(challengeuser)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        challengeuser = self.get_object(pk)
        serializer = ChallengeUser(challengeuser, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        challengeuser = self.get_object(pk)
        challengeuser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
