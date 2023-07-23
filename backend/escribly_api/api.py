from rest_framework import viewsets
from .models import Escribly_api
from .serializers import Escribly_apiSerializer

class Escribly_apiViewSet(viewsets.ModelViewSet):
    queryset = Escribly_api.objects.all()
    serializer_class = Escribly_apiSerializerSerializer