from rest_framework import serializers
from .models import Ratings

class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ['id', 'user', 'rating', 'challenge', 'task', 'rating_date']
    
    def create(self, validated_data):
        return Ratings.objects.create(**validated_data)

    def validate(self, data):
        # Ensuring that either a challenge or a task is rated, not both
        if self.instance:  # If it's an update
            if 'challenge' in data and 'task' in data:
                raise serializers.ValidationError("A rating cannot be both for a challenge and a task.")
            if 'challenge' not in data and 'task' not in data:  # Neither in updated data
                if not self.instance.challenge and not self.instance.task:  # Neither in current instance
                    raise serializers.ValidationError("A rating must be for either a challenge or a task.")
        else:  # If it's a creation
            if data.get('challenge') and data.get('task'):
                raise serializers.ValidationError("A rating cannot be both for a challenge and a task.")
            if not data.get('challenge') and not data.get('task'):
                raise serializers.ValidationError("A rating must be for either a challenge or a task.")
        return data