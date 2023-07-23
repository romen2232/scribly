from rest_framework import viewsets
from .models import BoosterUser
from .serializers import BoosterUserSerializer

class Boosters_usersViewSet(viewsets.ModelViewSet):
    queryset = BoosterUser.objects.all()
    serializer_class = BoosterUserSerializer