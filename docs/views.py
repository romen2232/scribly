from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Scribly
from .serializers import ScriblySerializer


class ScriblyListCreateView(generics.ListCreateAPIView):
    queryset = Scribly.objects.all()
    serializer_class = ScriblySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):

        serializer = self.get_Serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        scribly = serializer.save()
        return Response({"status": "success", "data": ScriblySerializer(scribly).data})


class ScriblyRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scribly.objects.all()
    serializer_class = ScriblySerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        scribly = serializer.save()
        return Response({"status": "success", "data": ScriblySerializer(scribly).data})
