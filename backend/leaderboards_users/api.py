from rest_framework import viewsets
from .models import LeaderboardUser
from .serializers import LeaderboardUserSerializer

class Leaderboards_usersViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardUser.objects.all()
    serializer_class = LeaderboardUserSerializer