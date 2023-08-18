from rest_framework import serializers
from .models import Unit
from lessons.models import Lessons  

from django.conf import settings


class UnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unit
        fields = ['id', 'unit_name', 'unit_description',
                  'unit_style', 'unit_color']

    def create(self, validated_data):
        
        unit_name = validated_data['unit_name']
        unit_description = validated_data['unit_description']
        unit_style = validated_data['unit_style']
        unit_color = validated_data['unit_color']

        unit = Unit.objects.create(
            unit_name=unit_name, unit_description=unit_description, unit_style=unit_style, unit_color = unit_color)

        unit.save()

        return unit
    
class LessonsSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessons
        fields = ['id', 'lesson_name', 'lesson_description', 'lesson_theory', 'difficulty']
   
    
class UnitCompletedSerializer(serializers.ModelSerializer):


    lessons = LessonsSimpleSerializer(many=True, read_only=True)
    
    #user from rquest

    class Meta:
        model = Unit
        fields = ['id', 'unit_name', 'unit_description',
                  'unit_style', 'unit_color', 'lessons']


    def to_representation(self, instance):
        
        representation = super().to_representation(instance)

        representation['lessons'] = self.get_lessons(instance)
            #oe danger
        return representation


    def create(self, validated_data):
        
        unit_name = validated_data['unit_name']
        unit_description = validated_data['unit_description']
        unit_style = validated_data['unit_style']
        unit_color = validated_data['unit_color']

        unit = Unit.objects.create(
            unit_name=unit_name, unit_description=unit_description, unit_style=unit_style, unit_color = unit_color)

        unit.save()

        return unit
    
    
    
    def get_lessons(self, obj):
        
        
        lessons = obj.lessons_set.all()
        return LessonsSimpleSerializer(lessons, many=True).data
    
    


    