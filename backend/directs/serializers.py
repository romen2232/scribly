from rest_framework import serializers
from .models import Directs
from users.serializers import UserSerializer


class DirectSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = Directs
        fields = ['sender', 'receiver', 'message', 'sent_date']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Explicitly set the context for nested serializers
        sender_serializer = UserSerializer(
            instance.sender, context=self.context)
        receiver_serializer = UserSerializer(
            instance.receiver, context=self.context)
        representation['sender'] = sender_serializer.data
        representation['receiver'] = receiver_serializer.data
        return representation

    def create(self, validated_data):
        direct = Directs.objects.create(**validated_data)
        direct.save()
        return direct
