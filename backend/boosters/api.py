from rest_framework import viewsets
from .models import Booster
from .serializers import BoosterSerializer

class BoostersViewSet(viewsets.ModelViewSet):
    queryset = Booster.objects.all()
    serializer_class = BoosterSerializer