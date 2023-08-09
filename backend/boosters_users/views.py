from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Boosters_users
from .serializers import BoosterUserSerializer


class BoosterUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = BoosterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserBoostersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        boosters_users = Boosters_users.objects.filter(user=user_id)
        serializer = BoosterUserSerializer(
            boosters_users, many=True, context={'request': request})
        return Response(serializer.data)


class BoosterUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, booster_id, *args, **kwargs):
        boosters_users = Boosters_users.objects.filter(booster=booster_id)
        serializer = BoosterUserSerializer(
            boosters_users, many=True, context={'request': request})
        return Response(serializer.data)


class SpecificUserBoosterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, booster_id, *args, **kwargs):
        try:
            booster_user = Boosters_users.objects.get(
                user=user_id, booster=booster_id)
            serializer = BoosterUserSerializer(booster_user)
            return Response(serializer.data)
        except Boosters_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, user_id, booster_id, *args, **kwargs):
        try:
            booster_user = Boosters_users.objects.get(
                user=user_id, booster=booster_id)
            serializer = BoosterUserSerializer(booster_user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Boosters_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, user_id, booster_id, *args, **kwargs):
        try:
            booster_user = Boosters_users.objects.get(
                user=user_id, booster=booster_id)
            # set partial=True to update a data partially
            serializer = BoosterUserSerializer(
                booster_user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Boosters_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, booster_id, *args, **kwargs):
        try:
            booster_user = Boosters_users.objects.get(
                user=user_id, booster=booster_id)
            booster_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Boosters_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
