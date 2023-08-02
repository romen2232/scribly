from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Streaks
from .serializers import StreakSerializer

class StreakListCreateView(generics.ListCreateAPIView):
    queryset = Streaks.objects.all()
    serializer_class = StreakSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        streak = serializer.save()
        return Response({"status": "success", "data": StreakSerializer(streak).data}, 
                        status=status.HTTP_201_CREATED)

class StreakRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Streaks.objects.all()
    serializer_class = StreakSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        streak = serializer.save()
        return Response({"status": "success", "data": StreakSerializer(streak).data})
