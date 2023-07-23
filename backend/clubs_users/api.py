from rest_framework import viewsets
from .models import Clubs_users
#from .serializers import Clubs_usersSerializer

#class Clubs_usersViewSet(viewsets.ModelViewSet):
    queryset = Clubs_users.objects.all()
    serializer_class = Clubs_usersSerializerSerializer