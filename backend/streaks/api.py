from rest_framework import viewsets
from .models import Streak
from .serializers import StreakSerializer

class StreaksViewSet(viewsets.ModelViewSet):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer