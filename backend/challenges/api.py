from rest_framework import viewsets
from .models import Challenge
from .serializers import ChallengeSerializer

class ChallengesViewSet(viewsets.ModelViewSet):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer