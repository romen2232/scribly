from rest_framework import viewsets
from .models import Scribly_api
from .serializers import Scribly_apiSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class Scribly_apiViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Scribly_api.objects.all()
    serializer_class = Scribly_apiSerializerSerializer