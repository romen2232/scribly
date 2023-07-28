
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Direct
from .serializers import Direct


class DirectList(APIView):
    def get(self, request, format=None):
        directs = Direct.objects.all()
        serializer = Direct(directs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Direct(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DirectDetail(APIView):
    def get_object(self, pk):
        try:
            return Direct.objects.get(pk=pk)
        except Direct.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        direct = self.get_object(pk)
        serializer = Direct(direct)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        direct = self.get_object(pk)
        serializer = Direct(direct, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        direct = self.get_object(pk)
        direct.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
