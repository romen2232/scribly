from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Lessons
from units.models import Unit
from units.serializers import UnitCompletedSerializer

class LessonsSerializer(serializers.ModelSerializer):
    
    
    unit = UnitCompletedSerializer(read_only=True)
    
    unit = serializers.PrimaryKeyRelatedField(
        queryset=Unit.objects.all(), write_only=True)
    
    
    
    class Meta:
        model = Lessons
        fields = ['id', 'lesson_name', 'lesson_description', 'lesson_theory', 'difficulty', 'unit']
        
    def create(self, validated_data):
        lesson_name = validated_data['lesson_name']
        lesson_description = validated_data['lesson_description']
        lesson_theory = validated_data['lesson_theory']
        difficulty = validated_data['difficulty']
        unit = validated_data['unit'] 
           
        

        lesson = Lessons.objects.create(
            lesson_name=lesson_name, lesson_description=lesson_description, lesson_theory=lesson_theory,  difficulty=difficulty, unit=unit)

        lesson.save()

        return lesson
    
    
    def to_representation(self, instance):
            representation = super().to_representation(instance)

            #Explicitly set the context for nested serializers
            unit_serializer = UnitCompletedSerializer(
                instance.unit, context=self.context)
           

            representation['unit'] = unit_serializer.data
            
            return representation



class LessonsSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessons
        fields = ['id', 'lesson_name', 'lesson_description', 'lesson_theory', 'difficulty']
        
    def create(self, validated_data):
        lesson_name = validated_data['lesson_name']
        lesson_description = validated_data['lesson_description']
        lesson_theory = validated_data['lesson_theory']
        difficulty = validated_data['difficulty']
        
           
        

        lesson = Lessons.objects.create(
            lesson_name=lesson_name, lesson_description=lesson_description, lesson_theory=lesson_theory,  difficulty=difficulty)

        lesson.save()

        return lesson