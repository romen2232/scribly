from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Escribly
from .serializers import EscriblySerializer

class EscriblyListCreateView(generics.ListCreateAPIView):
    queryset = Escribly.objects.all()
    serializer_class = EscriblySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        escribly = serializer.save()
        return Response({"status": "success", "data": EscriblySerializer(escribly).data})

class EscriblyRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Escribly.objects.all()
    serializer_class = EscriblySerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        escribly = serializer.save()
        return Response({"status": "success", "data": EscriblySerializer(escribly).data})
