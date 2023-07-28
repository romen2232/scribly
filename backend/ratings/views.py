
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Rating
from .serializers import Rating


class RatingList(APIView):
    def get(self, request, format=None):
        ratings = Rating.objects.all()
        serializer = Rating(ratings, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Rating(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RatingDetail(APIView):
    def get_object(self, pk):
        try:
            return Rating.objects.get(pk=pk)
        except Rating.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        rating = self.get_object(pk)
        serializer = Rating(rating)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        rating = self.get_object(pk)
        serializer = Rating(rating, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        rating = self.get_object(pk)
        rating.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
