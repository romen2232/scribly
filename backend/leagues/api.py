from rest_framework import viewsets
from .models import League
from .serializers import LeagueSerializer

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer