
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import BadgeUser
from .serializers import BadgeUsers


class BadgeUserList(APIView):
    def get(self, request, format=None):
        badgeusers = BadgeUser.objects.all()
        serializer = BadgeUsers(badgeusers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = BadgeUsers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BadgeUserDetail(APIView):
    def get_object(self, pk):
        try:
            return BadgeUser.objects.get(pk=pk)
        except BadgeUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        badgeuser = self.get_object(pk)
        serializer = BadgeUsers(badgeuser)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        badgeuser = self.get_object(pk)
        serializer = BadgeUsers(badgeuser, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        badgeuser = self.get_object(pk)
        badgeuser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
