from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Directs
from .serializers import DirectSerializer


class DirectCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = DirectSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConversationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, sender_id, receiver_id, *args, **kwargs):
        # get all messages between two users either as sender or receiver (order by date)
        conversation = Directs.objects.filter(sender=sender_id, receiver=receiver_id) | Directs.objects.filter(
            sender=receiver_id, receiver=sender_id)
        ordered_conversation = conversation.order_by('sent_date')
        serializer = DirectSerializer(ordered_conversation, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DirectDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, direct_id, *args, **kwargs):
        try:
            direct = Directs.objects.get(id=direct_id)
            direct.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Directs.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
