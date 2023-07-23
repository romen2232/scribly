from rest_framework import viewsets
from .models import Clubs
from .serializers import ClubsSerializer

class ClubsViewSet(viewsets.ModelViewSet):
    queryset = Clubs.objects.all()
    serializer_class = ClubsSerializerSerializer