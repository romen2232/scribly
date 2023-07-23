from rest_framework import viewsets
from .models import TaskUser
from .serializers import TaskUserSerializer

class Tasks_usersViewSet(viewsets.ModelViewSet):
    queryset = TaskUser.objects.all()
    serializer_class = TaskUserSerializer