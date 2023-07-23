from rest_framework import viewsets
from .models import Folder
from .serializers import FolderSerializer

class FoldersViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer