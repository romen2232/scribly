from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Leaderboards
from .serializers import LeaderboardsSerializer


class LeaderboardsListCreateView(generics.ListCreateAPIView):
    queryset = Leaderboards.objects.all()
    serializer_class = LeaderboardsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_Serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        leaderboard = serializer.save()
        return Response({"status": "success", "data": LeaderboardsSerializer(leaderboard).data}, status=status.HTTP_201_CREATED)


class LeaderboardsRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leaderboards.objects.all()
    serializer_class = LeaderboardsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        leaderboard = serializer.save()
        return Response({"status": "success", "data": LeaderboardsSerializer(leaderboard).data})
