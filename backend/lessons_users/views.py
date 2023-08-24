from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Lessons_users
from .serializers import *


class LessonUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = Lessons_usersSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LessonUserRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lessons_users.objects.all()
    serializer_class = Lessons_usersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, partial=True, data=request.data)
        serializer.is_valid(raise_exception=True)
        lesson_user = serializer.save()
        return Response({"status": "success", "data": Lessons_usersSerializer(lesson_user).data})


class UserLessonsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        lessons_users = Lessons_users.objects.filter(user=user_id)
        serializer = Lessons_usersSerializer(
            lessons_users, many=True, context={'request': request})
        return Response(serializer.data)


class LessonUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, lesson_id, *args, **kwargs):
        lessons_users = Lessons_users.objects.filter(lesson=lesson_id)
        serializer = Lessons_usersSerializer(
            lessons_users, many=True, context={'request': request})
        return Response(serializer.data)


class SpecificUserLessonView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, lesson_id, *args, **kwargs):
        try:
            lesson_user = Lessons_users.objects.get(user=user_id, lesson=lesson_id)
            serializer = Lessons_usersSerializer(
                lesson_user, context={'request': request})
            return Response(serializer.data)
        except Lessons_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, lesson_id, *args, **kwargs):
        try:
            lesson_user = Lessons_users.objects.get(user=user_id, lesson=lesson_id)
            lesson_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Lessons_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LessonUserRetrieveView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, lesson_id, *args, **kwargs):
        current_user = request.user

        # Fetch the latest lesson_user based on the start date
        lesson_user = Lessons_users.objects.filter(user=current_user, lesson=lesson_id).latest('lesson_start_date')
        if lesson_user:
            serializer = Lessons_usersSerializer(lesson_user, context={'request': request})
            return Response(serializer.data)
        else:
            return Response({"detail": "Lesson not started yet."}, status=status.HTTP_404_NOT_FOUND)


# class LessonUserCreateOrUpdateView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request, lesson_id, *args, **kwargs):
#         current_user = request.user

#         # Check if a lesson_user exists for the given user and lesson
#         existing_lesson_users = Lessons_users.objects.filter(user=current_user, lesson=lesson_id)
        
#         if existing_lesson_users.exists():
#             # Fetch the latest lesson_user based on the start date
#             latest_lesson_user = existing_lesson_users.latest('lesson_start_date')

#             if latest_lesson_user.percentage_completed == 100:
#                 # Create a new record
#                 new_lesson_user_data = {
#                     'lesson': lesson_id,
#                     'user': current_user.id,
#                     'percentage_completed': 0  # or any default value you want
#                 }
#                 serializer = LessonsUsersSerializerWithTaskUser(data=new_lesson_user_data, context={'request': request})
#                 if serializer.is_valid():
#                     serializer.save()
#                     return Response(serializer.data, status=status.HTTP_201_CREATED)
#                 else:
#                     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#             else:
#                 return Response({"detail": "Latest lesson is already in progress."}, status=status.HTTP_400_BAD_REQUEST)

#         else:
#             # Create a new record if none exists
#             new_lesson_user_data = {
#                 'lesson': lesson_id,
#                 'user': current_user.id,
#                 'percentage_completed': 0  # or any default value you want
#             }
#             serializer = LessonsUsersSerializerWithTaskUser(data=new_lesson_user_data, context={'request': request})
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   
   
   
class LessonUserCreateOrUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, lesson_id, *args, **kwargs):
        current_user = request.user

        
        # Check if a lesson_user exists for the given user and lesson
        existing_lesson_users = Lessons_users.objects.filter(user=current_user, lesson=lesson_id)
        
        if existing_lesson_users.exists():
            # Fetch the latest lesson_user based on the start date
            latest_lesson_user = existing_lesson_users.latest('lesson_start_date')

            if latest_lesson_user.percentage_completed == 100:
                # Create a new record
                new_lesson_user_data = {
                    'lesson': lesson_id,
                    'user': current_user.id,
                    'percentage_completed': 0  # or any default value you want
                }
                serializer = LessonsUsersSerializerWithTaskUser(data=new_lesson_user_data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:

                return LessonUserRetrieveViewWithTaskUser.get(self, request, lesson_id, *args, **kwargs)

        else:
            # Create a new record if none exists
            new_lesson_user_data = {
                'lesson': lesson_id,
                'user': current_user.id,
                'percentage_completed': 0  
            }
            serializer = LessonsUsersSerializerWithTaskUser(data=new_lesson_user_data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        #except:
            
            
            # Create a new record if none exists
            new_lesson_user_data = {
                'lesson': lesson_id,
                'user': current_user.id,
                'percentage_completed': 0  # or any default value you want
            }
            serializer = LessonsUsersSerializerWithTaskUser(data=new_lesson_user_data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   
   
   
   
   

class LessonUserRetrieveViewWithTaskUser(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, lesson_id, *args, **kwargs):
        current_user = request.user

        # Fetch the latest lesson_user based on the start date
        lesson_user = Lessons_users.objects.filter(user=current_user, lesson=lesson_id).latest('lesson_start_date')
        if lesson_user:
            serializer = LessonsUsersSerializerWithTaskUser(lesson_user, context={'request': request})
            return Response(serializer.data)
        else:
            return Response({"detail": "Lesson not started yet."}, status=status.HTTP_404_NOT_FOUND)



class SpecificUserLessonByIDView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, lesson_user_id, *args, **kwargs):
        try:
            lesson_user = Lessons_users.objects.get(id=lesson_user_id)
            serializer = Lessons_usersSerializer(
                lesson_user, context={'request': request})
            return Response(serializer.data)
        except Lessons_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, lesson_id, *args, **kwargs):
        try:
            lesson_user = Lessons_users.objects.get(user=user_id, lesson=lesson_id)
            lesson_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Lessons_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)