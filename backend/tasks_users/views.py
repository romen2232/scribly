from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tasks_users
from .serializers import TasksUserSerializer

from tasks.models import Tasks

from .apps import *


class TaskUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = TasksUserSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskUserUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, user_id, task_id, *args, **kwargs):
        try:
            task_user = Tasks_users.objects.filter(
                user=user_id, task=task_id).last()
            serializer = TasksUserSerializer(
                task_user, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UserTasksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        tasks_users = Tasks_users.objects.filter(user=user_id)
        serializer = TasksUserSerializer(
            tasks_users, many=True, context={'request': request})
        return Response(serializer.data)


class TaskUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, task_id, *args, **kwargs):
        tasks_users = Tasks_users.objects.filter(
            task=task_id)
        serializer = TasksUserSerializer(
            tasks_users, many=True, context={'request': request})
        return Response(serializer.data)

    def patch(self, request, task_id, *args, **kwargs):
        try:
            task_user = Tasks_users.objects.filter(
                task=task_id, user=request.user).order_by('task_date').first()

            if not task_user:
                raise Tasks_users.DoesNotExist

            serializer = TasksUserSerializer(
                task_user, data=request.data, partial=True, context={'request': request})

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SpecificUserTaskView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, task_id, *args, **kwargs):
        try:
            task_user = Tasks_users.objects.get(user=user_id, task=task_id)
            serializer = TasksUserSerializer(
                task_user, context={'request': request})
            return Response(serializer.data)
        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, task_id, *args, **kwargs):
        try:
            task_user = Tasks_users.objects.get(user=user_id, task=task_id)
            task_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UpdateReponseWrite(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, user_id, task_id, *args, **kwargs):
        try:
            task_user = Tasks_users.objects.filter(
                user=user_id, task=task_id).last()

            text_user = task_user.answer_note.note_content
            reponse = chatbotAnswer(text_user)
            correction = chatbotCorrection(text_user)

            task_user.response_text = reponse
            task_user.is_completed = correction
            task_user.save()

            return Response({"message": "Answer updated successfully"})
        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UpdateReponse(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, user_id, task_id, *args, **kwargs):
        try:
            task_user = Tasks_users.objects.filter(
                user=user_id, task=task_id).last()

            note = task_user.answer_note

            correct_text = task_user.task.text

            text_user = task_user.answer_text

            type = task_user.task.type

            statement = task_user.task.task_description

            correction, reponse = Correction(
                note, text_user, correct_text, type, statement)

            if correction and type != "WRITTE":
                task_user.earned_points = task_user.task.task_points

                task_user.save()

            task_user.response_text = reponse
            task_user.is_completed = correction
            task_user.save()

            # upate percentage_completed in lesson_user

            lesson_user = task_user.lesson_user
            number_tasks = Tasks.objects.filter(
                lesson=lesson_user.lesson).count()
            number_tasks_completed = Tasks_users.objects.filter(
                lesson_user=lesson_user, is_completed=True).count()

            if number_tasks == 0:
                lesson_user.percentage_completed = 0
            else:
                lesson_user.percentage_completed = int(
                    number_tasks_completed * 100 / number_tasks)

            lesson_user.save()

            return Response({"message": "Answer updated successfully"})
        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SkipTask(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, user_id, task_id, *args, **kwargs):
        try:
            task_user = Tasks_users.objects.filter(
                user=user_id, task=task_id).last()

            type = task_user.task.type

            if type == "WRITTE":

                return Response({"message": "You can't skip this task"})

            task_user.is_completed = True
            task_user.save()

            return Response({"message": "Skipped successfully"})
        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class EvaluateText(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, user_id, task_id, *args, **kwargs):
        try:
            task_user = Tasks_users.objects.filter(
                user=user_id, task=task_id).last()

            note = task_user.answer_note

            correct_text = task_user.task.text

            text_user = task_user.answer_text

            type = task_user.task.type

            # difficulty = task_user.task.difficulty   from lesson

            statement = task_user.task.task_description

            input = note.note_content

            mark, message = evaluation(input=input, statement=statement)

            # if correction and type != "WRITTE":
            #     task_user.earned_points = task_user.task.task_points

            #     task_user.save()
            if mark > 4:
                completed = True
            else:
                completed = False

            task_user.response_text = message
            task_user.is_completed = completed
            task_user.save()

            # upate percentage_completed in lesson_user

            # lesson_user = task_user.lesson_user
            # number_tasks = Tasks.objects.filter(lesson=lesson_user.lesson).count()
            # number_tasks_completed = Tasks_users.objects.filter(lesson_user=lesson_user, is_completed=True).count()

            # if number_tasks == 0:
            #     lesson_user.percentage_completed = 0
            # else:
            #     lesson_user.percentage_completed = int(number_tasks_completed * 100 / number_tasks)

            # lesson_user.save()

            # print(mark)
            return Response({"message": message, "mark": mark})
        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
