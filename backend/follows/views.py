from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Follows
from .serializers import FollowSerializer
from users.serializers import UserSerializer
from django.contrib.auth import get_user_model


class FollowListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        follows = Follows.objects.all()
        serializer = FollowSerializer(
            follows, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = FollowSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FollowerView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        follows = Follows.objects.filter(followed_id=user_id)
        serializer = FollowSerializer(
            follows, many=True, context={'request': request})
        return Response(serializer.data)


class FollowingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        follows = Follows.objects.filter(follower_id=user_id)
        serializer = FollowSerializer(
            follows, many=True, context={'request': request})
        return Response(serializer.data)


class FollowDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, follower_id, followed_id, *args, **kwargs):
        try:
            follow = Follows.objects.get(
                follower_id=follower_id, followed_id=followed_id)
            serializer = FollowSerializer(follow, context={'request': request})
            return Response(serializer.data)
        except Follows.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UnfollowView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, follower_id, followed_id, *args, **kwargs):
        try:
            follow = Follows.objects.get(
                follower_id=follower_id, followed_id=followed_id)
            follow.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Follows.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class FriendsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        # This filter is a bit more complex than the others. It's a bit hard to read, but it's basically saying:
        # Get all the users that the user follows, and then get all the users that follow the user, and then get the intersection of those two sets.
        friends = Follows.objects.filter(
            follower_id=user_id, followed__follows_received__follower_id=user_id)
        serializer = FollowSerializer(
            friends, many=True, context={'request': request})
        return Response(serializer.data)


class NotFollowingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        # This filter shows all the users that the user is not following.
        not_following = get_user_model().objects.exclude(
            id__in=Follows.objects.filter(follower_id=user_id).values_list('followed_id', flat=True))
        serializer = UserSerializer(
            not_following, many=True, context={'request': request})
        return Response(serializer.data)
