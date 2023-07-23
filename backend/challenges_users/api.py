from rest_framework import viewsets
from .models import ChallengeUser
from .serializers import ChallengeUserSerializer

class Challenges_usersViewSet(viewsets.ModelViewSet):
    queryset = ChallengeUser.objects.all()
    serializer_class = ChallengeUserSerializer