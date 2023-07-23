#from rest_framework import viewsets
#from .models import Resources
#from .serializers import ResourcesSerializer

#class ResourcesViewSet(viewsets.ModelViewSet):
    queryset = Resources.objects.all()
    serializer_class = ResourcesSerializerSerializer