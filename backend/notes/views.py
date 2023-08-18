from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Notes
from users.models import User
from .serializers import NoteSerializer


class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = NoteSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
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


class NotesList(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notes.objects.filter(user=self.request.user)
    
class NoteListByFolder(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Notes.objects.filter(user=self.request.user, folder=folder_id)
    
class NoteListByTag(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        tag_id = self.kwargs['tag_id']
        return Notes.objects.filter(user=self.request.user, tags=tag_id)
    
class NoteListByChallenge(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        challenge_id = self.kwargs['challenge_id']
        return Notes.objects.filter(user=self.request.user, challenge=challenge_id)
    

class NoteListByTask(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs['task_id']
        return Notes.objects.filter(user=self.request.user, task=task_id)
    
    
    
class PublicNoteList(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notes.objects.filter(public=True)
    
class PublicNoteListByUser(generics.ListAPIView):

    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Notes.objects.filter(user=user_id, public=True)
    
    def get_serializer_class(self):
        return NoteSerializer
  


class PublicNoteListByUsername(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        username = self.kwargs['username']
        user = User.objects.get(username=username)
        #user_email = user.email
        return Notes.objects.filter(user=user, public=True)
    
    def get_serializer_class(self):
        return NoteSerializer
    
    
