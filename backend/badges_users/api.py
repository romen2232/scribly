from rest_framework import viewsets
from .models import BadgeUser
from .serializers import BadgeUsersSerializer

class BadgeUsersViewSet(viewsets.ModelViewSet):
    queryset = BadgeUser.objects.all()
    serializer_class = BadgeUsersSerializer