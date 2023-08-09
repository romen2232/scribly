from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Boosters
from .serializers import BoostersSerializer


class BoostersListCreateView(generics.ListCreateAPIView):
    queryset = Boosters.objects.all()
    serializer_class = BoostersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_Serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        booster = serializer.save()
        return Response({"status": "success", "data": BoostersSerializer(booster).data}, status=status.HTTP_201_CREATED)


class BoostersRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Boosters.objects.all()
    serializer_class = BoostersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        booster = serializer.save()
        return Response({"status": "success", "data": BoostersSerializer(booster).data})
