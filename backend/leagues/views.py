from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Leagues
from .serializers import LeagueSerializer


class LeagueListCreateView(generics.ListCreateAPIView):
    queryset = Leagues.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        league = serializer.save()
        return Response({"status": "success", "data": LeagueSerializer(league).data},
                        status=status.HTTP_201_CREATED)


class LeagueRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leagues.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        league = serializer.save()
        return Response({"status": "success", "data": LeagueSerializer(league).data})
