from rest_framework import serializers
from .models import Unit
from lessons.models import Lessons

from lessons_users.models import Lessons_users


from django.conf import settings


class UnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unit
        fields = ['id', 'unit_name', 'unit_description',
                  'unit_style', 'unit_color', 'unit_number']

    def create(self, validated_data):

        unit_name = validated_data['unit_name']
        unit_description = validated_data['unit_description']
        unit_style = validated_data['unit_style']
        unit_color = validated_data['unit_color']
        unit_number = validated_data['unit_number']

        unit = Unit.objects.create(
            unit_name=unit_name, unit_description=unit_description, unit_style=unit_style, unit_color=unit_color, unit_number=unit_number)

        unit.save()

        return unit


class LessonsSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessons
        fields = ['id', 'lesson_name', 'lesson_description',
                  'lesson_theory', 'difficulty']


class UnitCompletedSerializer(serializers.ModelSerializer):

    lessons = LessonsSimpleSerializer(many=True, read_only=True)

    # user from rquest

    class Meta:
        model = Unit
        fields = ['id', 'unit_name', 'unit_description',
                  'unit_style', 'unit_color', 'lessons', 'unit_number']

    def to_representation(self, instance):

        representation = super().to_representation(instance)

        representation['lessons'] = self.get_lessons(instance)
        # oe danger
        return representation

    def create(self, validated_data):

        unit_name = validated_data['unit_name']
        unit_description = validated_data['unit_description']
        unit_style = validated_data['unit_style']
        unit_color = validated_data['unit_color']
        unit_number = validated_data['unit_number']

        unit = Unit.objects.create(
            unit_name=unit_name, unit_description=unit_description, unit_style=unit_style, unit_color=unit_color, unit_number=unit_number)

        unit.save()

        return unit

    def get_lessons(self, obj):

        lessons = obj.lessons_set.all()
        return LessonsSimpleSerializer(lessons, many=True).data


class LessonsPercentageSerializer(serializers.ModelSerializer):
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = Lessons
        fields = ['id', 'lesson_name', 'lesson_description',
                  'lesson_theory', 'difficulty', 'percentage', 'bg_color']

    def to_representation(self, instance):

        representation = super().to_representation(instance)

        representation['percentage'] = self.get_percentage(instance)
        # oe danger
        return representation

    def get_percentage(self, obj):
        # get the last Lessons_users for this user and lesson
        lesson_user = Lessons_users.objects.filter(
            user=self.context['request'].user,  # get the user from the request
            lesson=obj,
        ).order_by('-lesson_start_date').first()

        if lesson_user:
            return lesson_user.percentage_completed
        return 0  # If there are no Lessons_users, the percentage is 0


class UnitPercentageSerializer(serializers.ModelSerializer):
    # dont forget to pass the request to the Lesson serializer

    lessons = LessonsPercentageSerializer(many=True, read_only=True)

    class Meta:
        model = Unit
        fields = ['id', 'unit_name', 'unit_description',
                  'unit_style', 'unit_color', 'lessons', 'unit_number']

    def to_representation(self, instance):

        representation = super().to_representation(instance)

        representation['lessons'] = self.get_lessons(instance)

        return representation

    def get_lessons(self, obj):

        lessons = obj.lessons_set.all()
        return LessonsPercentageSerializer(lessons, many=True, context={'request': self.context['request']}).data
