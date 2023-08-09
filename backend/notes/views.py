from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Notes
from .serializers import NoteSerializer


class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = NoteSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        note = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class NoteRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        note = serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
