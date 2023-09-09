from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Badge
from .serializers import BadgeSerializer


class BadgeListCreateView(generics.ListCreateAPIView):
    """
    get: Return a list of all the existing badges.

    post: Create a new badge instance.
    """
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):


        serializer = BadgeSerializer(

            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        badge = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BadgeRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """
    get: Return the given badge.
    update: Update the given badge.
    delete: Delete the given badge.
    """

    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        badge = serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    
 
class ImportBadges(generics.CreateAPIView):
    
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]    

    def create(self, request, *args, **kwargs):
        # Assuming 'lessons' is the key in the JSON
        badges_datas = request.data.get('badges', [])
        created_badges = []
        print(badges_datas)

        for badge_data in badges_datas:

            badge_data_edited = {"badge_name": badge_data["badge_name"], "badge_description": badge_data["badge_description"]}
            
            serializer = self.get_serializer(data=badge_data_edited)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            created_badges.append(serializer.data)

        return Response(created_badges, status=status.HTTP_201_CREATED)
    
    
    
    