from rest_framework import viewsets
from .models import Tivi
from .serializers import TiviSerializer

#class TiviViewSet(viewsets.ModelViewSet):
   # queryset = Tivi.objects.all()
   # serializer_class = TiviSerializer