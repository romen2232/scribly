from rest_framework import viewsets
from .models import Follow
from .serializers import FollowSerializer

class FollowsViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer