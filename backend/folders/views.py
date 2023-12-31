from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view


from .models import Folders
from .serializers import FoldersSerializer, FoldersRecursiveSerializer



class FoldersListCreateView(generics.ListCreateAPIView):
    queryset = Folders.objects.all()
    serializer_class = FoldersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = FoldersSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        folder = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FoldersRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folders.objects.all()
    serializer_class = FoldersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            folder = self.queryset.get(pk=kwargs['pk'])
            if folder.user != request.user:
                return Response({'detail': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
            serializer = self.get_serializer(folder)
            return Response(serializer.data)
        except Folders.DoesNotExist:
            return Response({'detail': 'Folder not found.'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        folder = serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)





class FolderList(generics.ListAPIView):
    serializer_class = FoldersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        #print(self.request.user)
        return Folders.objects.filter(user=self.request.user)

class FolderListRecursive(generics.RetrieveAPIView): # Using RetrieveAPIView since we're fetching one object
    queryset = Folders.objects.all()
    serializer_class = FoldersRecursiveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            folder = self.queryset.get(pk=kwargs['folder_id'])
            if folder.user != request.user:
                return Response({'detail': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
            serializer = self.get_serializer(folder)
            return Response(serializer.data)
        except Folders.DoesNotExist:
            return Response({'detail': 'Folder not found.'}, status=status.HTTP_404_NOT_FOUND)


class FolderListByDepth(generics.ListAPIView): # Using RetrieveAPIView since we're fetching one object
    #queryset = Folders.objects.all()
    #serializer_class = FoldersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        depth = self.kwargs['depth']
        return Folders.objects.filter(user=self.request.user, depth=depth)
    
    def get_serializer_class(self):
        return FoldersSerializer
    
    
class RootFolder(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FoldersRecursiveSerializer

    def get_object(self):
        try:
            
            return Folders.objects.get(user=self.request.user, depth=0)
        except Folders.DoesNotExist:
            raise generics.PermissionDenied("Root folder not found")
        except Folders.MultipleObjectsReturned:
            raise generics.PermissionDenied("More than one root folder found")


