from rest_framework import viewsets
from .models import Lessons_Users
from .serializers import Lessons_Users_Serializer

class Lessons_Users_ViewSet(viewsets.ModelViewSet):
    queryset = Lessons_Users.objects.all()
    serializer_class = Lessons_Users_Serializer