import json
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView

from .models import Lessons
from .serializers import LessonsSerializer

from tasks.views import TaskImportView, import_tasks

# from tasks.apps import import_tasks


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
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        lesson = serializer.save()
        return Response({"status": "success", "data": LessonsSerializer(lesson).data})


class LessonsList(generics.ListAPIView):
    serializer_class = LessonsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Lessons.objects.filter(user=self.request.user)


# class LessonImportView(generics.CreateAPIView):

#     serializer_class = LessonsSerializer

#     def create(self, request, *args, **kwargs):
#         lessons_datas = request.data.get('lessons', [])  # Assuming 'lessons' is the key in the JSON
#         created_lessons = []

#         for lesson_data in lessons_datas:

#             lesson_data_edited = {"lesson_name": lesson_data["lesson_name"], "lesson_description": lesson_data["lesson_description"],"lesson_theory":lesson_data["lesson_theory"] ,"difficulty": lesson_data["difficulty"], "unit": lesson_data["unit"]}
#             #print(lesson_data_edited["lesson_name"])

#             serializer = self.get_serializer(data=lesson_data_edited)
#             serializer.is_valid(raise_exception=True)
#             self.perform_create(serializer)

#             created_lessons.append(serializer.data)

#             id = serializer.data["id"]
#             task_data = lesson_data["tasks"]
#             #Create tasks using TaskImportView


#             created_tasks = TaskImportView.create(self, request, id=id, tasks_data=task_data, *args, **kwargs)


#             lessons_combined = {"lesson": created_lessons, "tasks": created_tasks.data}
#             json_response = json.dumps(lessons_combined, indent=4)

#         return Response(lessons_combined, status=status.HTTP_201_CREATED)


class LessonImportView(generics.CreateAPIView):

    serializer_class = LessonsSerializer

    def create(self, request, *args, **kwargs):
        # Assuming 'lessons' is the key in the JSON
        lessons_datas = request.data.get('lessons', [])
        created_lessons = []

        for lesson_data in lessons_datas:

            lesson_data_edited = {"lesson_name": lesson_data["lesson_name"], "lesson_description": lesson_data["lesson_description"],
                                  "lesson_theory": lesson_data["lesson_theory"], "difficulty": lesson_data["difficulty"], "unit": lesson_data["unit"], "bg_color": lesson_data["bg_color"]}
            # print(lesson_data_edited["lesson_name"])

            serializer = self.get_serializer(data=lesson_data_edited)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            created_lessons.append(serializer.data)

            id = serializer.data["id"]
            task_data = lesson_data["tasks"]

            # Create an instance of TaskImportView
            created_tasks = import_tasks(request, id, task_data)

            # Set the request for the task view

            lessons_combined = {
                "lesson": created_lessons, "tasks": created_tasks}

        return Response(lessons_combined, status=status.HTTP_201_CREATED)
