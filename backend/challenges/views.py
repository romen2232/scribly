from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Challenges
from .serializers import ChallengesSerializer


class ChallengesListCreateView(generics.ListCreateAPIView):
    queryset = Challenges.objects.all()
    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_Serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        challenge = serializer.save(user=request.user)
        return Response({"status": "success", "data": ChallengesSerializer(challenge).data}, status=status.HTTP_201_CREATED)


class ChallengesRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Challenges.objects.all()
    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        challenge = serializer.save()
        return Response({"status": "success", "data": ChallengesSerializer(challenge).data})
