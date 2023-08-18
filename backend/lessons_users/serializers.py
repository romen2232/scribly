from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from .models import Lessons_users
from users.models import User
from lessons.models import Lessons
from tasks_users.models import Tasks_users
from tasks.models import Tasks


from lessons.serializers import LessonsSerializer
from users.serializers import UserSerializer





class Lessons_usersSerializer(serializers.ModelSerializer):
    lesson = LessonsSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    lesson = serializers.PrimaryKeyRelatedField(
        queryset=Lessons.objects.all(), write_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Lessons_users
        fields = '__all__'  # or a list of field names

    def to_representation(self, instance):
            representation = super().to_representation(instance)

            # Explicitly set the context for nested serializers
            lesson_serializer = LessonsSerializer(
                instance.lesson, context=self.context)
            user_serializer = UserSerializer(instance.user, context=self.context)

            representation['lesson'] = lesson_serializer.data
            representation['user'] = user_serializer.data
            #oe danger
            return representation

    
    def create(self, validated_data):
       
        
        

        lesson_user = Lessons_users.objects.create(**validated_data)
        lesson_user.save()

        return lesson_user

    def get(self, validated_data):
        lesson = validated_data['lesson']
        user = validated_data['user']
        
        lesson_user = Lessons_users.objects.get(lesson=lesson, user=user)

        return lesson_user

class TasksUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tasks_users
        fields = ['task', 'user', 'task_end_date', 'earned_points', 'answerNote', 'answerText', 'answerBoolean',]

class LessonsUsersSerializerWithTaskUser(serializers.ModelSerializer):
    lesson = LessonsSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    lesson = serializers.PrimaryKeyRelatedField(
        queryset=Lessons.objects.all(), write_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)
    
    task_user = serializers.SerializerMethodField()
    
    

    class Meta:
        model = Lessons_users
        fields = ['id','percentage_completed', 'lesson_start_date', 'lesson', 'user', 'task_user']

    def to_representation(self, instance):
            representation = super().to_representation(instance)

            #Explicitly set the context for nested serializers
            lesson_serializer = LessonsSerializer(
                instance.lesson, context=self.context)
            user_serializer = UserSerializer(instance.user, context=self.context)
            #task_user_serializer = TasksUserSerializer(instance.task_user, context=self.context)


            representation['lesson'] = lesson_serializer.data
            representation['user'] = user_serializer.data
            representation['task_user'] = self.get_task_user(instance)
            #oe danger
            return representation

    
    def create(self, validated_data):
       
        
        lesson_user = Lessons_users.objects.create(**validated_data)
        
        # Create a task_user for each task in the lesson
        tasks = Tasks.objects.filter(lesson=validated_data['lesson'])
        
        #Filter tasks by every type
        
        task_write = Tasks.objects.filter(lesson=validated_data['lesson'], type="WRITE")
        task_complete = Tasks.objects.filter(lesson=validated_data['lesson'], type="COMPLETE")
        task_reorder = Tasks.objects.filter(lesson=validated_data['lesson'], type="REORDER")
        task_choose = Tasks.objects.filter(lesson=validated_data['lesson'], type="CHOOSE")
        
        
        
        
        # Select random n task from each type
        n =2
        task_write = task_write.order_by('?')[:n]
        task_complete = task_complete.order_by('?')[:n]
        task_reorder = task_reorder.order_by('?')[:n]
        task_choose = task_choose.order_by('?')[:n]
        
        # Define a list with all the tasks
        
        tasks = list(task_write) + list(task_complete) + list(task_reorder) + list(task_choose)
        
        for task in tasks: 
            task_user = Tasks_users.objects.create(
                task=task,
                user=validated_data['user'],
                lesson_user=lesson_user

                
            )
        

        
        
        #add lesson_user to every task_user previously created
        # for task_user in Tasks_users.objects.filter(user=validated_data['user'], lesson_user=lesson_user):
        #     task_user.lesson_user = lesson_user
        #     task_user.save()

        
        lesson_user.save()

        return lesson_user

 
    
    def get_task_user(self, obj):
        task_users = Tasks_users.objects.filter(user=obj.user, lesson_user=obj)
        
        # Serializa cada objeto task_user usando el serializador TasksUserSerializer
        serialized_task_users = TasksUserSerializer(task_users, many=True, context=self.context).data

        return serialized_task_users
    
    
   
    
     


        