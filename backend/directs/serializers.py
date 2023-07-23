
from rest_framework import serializers
from .models import Direct

class DirectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direct
        fields = ['sender', 'receiver', 'message', 'sent_date']
