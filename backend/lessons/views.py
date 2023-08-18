from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView

from .models import Lessons
from .serializers import LessonsSerializer

from tasks.views import TaskImportView

class LessonListCreateView(generics.ListCreateAPIView):
    queryset = Lessons.objects.all()
    serializer_class = LessonsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
    def create(self, request, *args, **kwargs):
        serializer = LessonsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        lesson = serializer.save()
        return Response({"status": "success", "data": LessonsSerializer(lesson).data}, 
                        status=status.HTTP_201_CREATED)

class LessonRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lessons.objects.all()
    serializer_class = LessonsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        lesson = serializer.save()
        return Response({"status": "success", "data": LessonsSerializer(lesson).data})


class LessonsList(generics.ListAPIView):
    serializer_class = LessonsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Lessons.objects.filter(user=self.request.user)
    
    
class LessonImportView(generics.CreateAPIView):
    
    serializer_class = LessonsSerializer

    def create(self, request, *args, **kwargs):
        lesson_data = request.data.get('lessons', [])  # Assuming 'lessons' is the key in the JSON
        created_lessons = []

        
        serializer = self.get_serializer(data=lesson_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        id = serializer.data["id"]
        
        #Create tasks using TaskImportView
         
        
         
                             
        TaskImportView.create(self, request, id, *args, **kwargs)
        

        return Response(serializer.data, status=status.HTTP_201_CREATED)
   
    
    
    
    
    
    


