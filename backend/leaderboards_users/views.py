from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Leaderboards_users
from .serializers import LeaderboardUserSerializer


class LeaderboardUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = LeaderboardUserSerializer(
            data=request.data, context={'request': request})
        
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLeaderboardsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        leaderboard_users = Leaderboards_users.objects.filter(user=user_id)
        serializer = LeaderboardUserSerializer(
            leaderboard_users, many=True, context={'request': request})
        return Response(serializer.data)


class LeaderboardUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, leaderboard_id, *args, **kwargs):
        leaderboard_users = Leaderboards_users.objects.filter(
            leaderboard=leaderboard_id)
        serializer = LeaderboardUserSerializer(leaderboard_users, many=True)
        return Response(serializer.data)


class SpecificUserLeaderboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, leaderboard_id, *args, **kwargs):
        try:
            leaderboard_user = Leaderboards_users.objects.get(
                user=user_id, leaderboard=leaderboard_id)
            serializer = LeaderboardUserSerializer(leaderboard_user)
            return Response(serializer.data)
        except Leaderboards_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, user_id, leaderboard_id, *args, **kwargs):
        try:
            leaderboard_user = Leaderboards_users.objects.get(
                user=user_id, leaderboard=leaderboard_id)
            serializer = LeaderboardUserSerializer(
                leaderboard_user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Leaderboards_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, leaderboard_id, *args, **kwargs):
        try:
            leaderboard_user = Leaderboards_users.objects.get(
                user=user_id, leaderboard=leaderboard_id)
            leaderboard_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Leaderboards_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
