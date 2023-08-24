from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView

from .models import Tasks
from .serializers import TasksSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        task = serializer.save()
        return Response({"status": "success", "data": TasksSerializer(task).data}, 
                        status=status.HTTP_201_CREATED)

class TaskRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        task = serializer.save()
        return Response({"status": "success", "data": TasksSerializer(task).data})


class TasksList(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tasks.objects.filter(user=self.request.user)
    
    
    
class TaskImportView(generics.CreateAPIView):
    
    serializer_class = TasksSerializer

    def create(self, request,id=1, *args, **kwargs):
        tasks_data = request.data.get('tasks', [])  # Assuming 'tasks' is the key in the JSON
        created_tasks = []

        for task_data in tasks_data:
            #edit lesson_data["lesson"] = id
            
            task_data_edited = {"lesson": id, "task_name": task_data["task_name"], "task_description": task_data["task_description"],"task_points":task_data["task_points"] ,"text": task_data["text"], "type": task_data["type"]}
            
            
            serializer = self.get_serializer(data=task_data_edited)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            created_tasks.append(serializer.data)

        return Response(created_tasks, status=status.HTTP_201_CREATED)





