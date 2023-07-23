from rest_framework import viewsets
from .models import Direct
from .serializers import DirectSerializer

class DirectsViewSet(viewsets.ModelViewSet):
    queryset = Direct.objects.all()
    serializer_class = DirectSerializer