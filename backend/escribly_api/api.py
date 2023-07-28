from rest_framework import viewsets
from .models import Escribly_api
from .serializers import Escribly_apiSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class Escribly_apiViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Escribly_api.objects.all()
    serializer_class = Escribly_apiSerializerSerializer