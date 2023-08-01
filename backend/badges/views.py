from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Badge
from .serializers import BadgeSerializer

class BadgeListCreateView(generics.ListCreateAPIView):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        badge = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BadgeRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        badge = serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
