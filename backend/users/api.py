from rest_framework import viewsets
from .models import User
from .serializers import UsersSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer