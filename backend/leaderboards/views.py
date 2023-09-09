from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Leaderboards
from .serializers import *
from .serializers import *


class LeaderboardsListCreateView(generics.ListCreateAPIView):
    queryset = Leaderboards.objects.all()
    serializer_class = LeaderboardsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(
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



class LeaderboardUsers(generics.ListAPIView):
    queryset = Leaderboards.objects.all()
    serializer_class = LeaderboardsSerializerWithUser
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, league_id, *args, **kwargs):
        leaderboard = queryset.filter(
            league=league_id)
        serializer = LeaderboardsSerializerWithUser(leaderboard, many=True)
        return Response(serializer.data)
    
    def get_queryset(self,league_id):
        #print(self.request.user)
        return Leaderboards.objects.filter(league=league)



