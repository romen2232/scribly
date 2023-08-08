from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Badges_users
from .serializers import BadgeUserSerializer


class BadgeUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = BadgeUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserBadgesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        badges_users = Badges_users.objects.filter(user=user_id)
        serializer = BadgeUserSerializer(
            badges_users, many=True, context={'request': request})
        return Response(serializer.data)


class BadgeUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, badge_id, *args, **kwargs):
        badges_users = Badges_users.objects.filter(badge=badge_id)
        serializer = BadgeUserSerializer(badges_users, many=True)
        return Response(serializer.data)


class SpecificUserBadgeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, badge_id, *args, **kwargs):
        try:
            badge_user = Badges_users.objects.get(user=user_id, badge=badge_id)
            serializer = BadgeUserSerializer(badge_user)
            return Response(serializer.data)
        except Badges_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, badge_id, *args, **kwargs):
        try:
            badge_user = Badges_users.objects.get(user=user_id, badge=badge_id)
            badge_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Badges_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
