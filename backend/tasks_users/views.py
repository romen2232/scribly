from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tasks_users
from .serializers import TasksUserSerializer


class TaskUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = TasksUserSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        tasks_users = Tasks_users.objects.filter(task=task_id)
        serializer = TasksUserSerializer(
            tasks_users, many=True, context={'request': request})
        return Response(serializer.data)


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
