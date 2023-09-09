from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tasks_users
from .serializers import TasksUserSerializer

from tasks.models import Tasks
from badges.models import Badge
from badges_users.models import Badges_users

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


# class UpdateReponseWrite(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def put(self, request, user_id, task_id, *args, **kwargs):
#         try:
#             task_user = Tasks_users.objects.filter(
#                 user=user_id, task=task_id).last()

#             text_user = task_user.answer_note.note_content
#             reponse = chatbotAnswer(text_user)
#             correction = chatbotCorrection(text_user)

#             task_user.response_text = reponse
#             task_user.is_completed = correction
#             task_user.save()

#             return Response({"message": "Answer updated successfully"})
#         except Tasks_users.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
          


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




class CompleteAnswerView(APIView):
    permission_classes = [permissions.IsAuthenticated]

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

                # Call the function UpdateReponse to update the response_text and is_completed fields
                self.update_response(task_user)

                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Tasks_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update_response(self, task_user):
        user_id = self.request.user

        task_user.is_completed = True
        task_user.save()

        correction, response = self.calculate_correction(task_user)

        task_user.response_text = response
        task_user.answer_boolean = correction
        task_user.save()

        # Resto de la lógica de actualización de porcentaje, etc.

    def calculate_correction(self, task_user):
        
        user_id = self.request.user
        
        type = task_user.task.type
        correct_text = task_user.task.text
        text_user = task_user.answer_text
        
        
        if type == "WRITE":
            
            input = task_user.answer_note.note_content
            statement = task_user.task.task_description
            correction, reponse, mark = CorrectionWrite(input=input, statement=statement)
            if correction:
                task_user.earned_points = mark * task_user.task.task_points
                # create badge user
                badge = Badge.objects.get(name="Escritor Novato")
                #check if it already exist, if not creat it
                if not Badges_users.objects.filter(user=user_id, badge=badge):
                    badge_user = Badges_users(user=user_id, badge=badge)
                    badge_user.save()
                
                if mark==10:
                
                    # create badge user
                    badge = Badge.objects.get(name="Maestro de la Calificación")
                    #check if it already exist, if not creat it
                    if not Badges_users.objects.filter(user=self.request.user, badge=badge):
                        badge_user = Badges_users(user=self.request.user, badge=badge)
                        badge_user.save()
                        
                if Tasks_users.objects.filter(user=user_id, is_completed=True).count()==20:
                    # create badge user
                    badge = Badge.objects.get(name="Trabajador Dedicado")
                    #check if it already exist, if not creat it
                    if not Badges_users.objects.filter(user=self.request.user, badge=badge):
                        badge_user = Badges_users(user=self.request.user, badge=badge)
                        badge_user.save()
                
                if Tasks_users.objects.filter(user=user_id, is_completed=True).count()==100:
                    # create badge user
                    badge = Badge.objects.get(name="Maestro de Tareas")
                    #check if it already exist, if not creat it
                    if not Badges_users.objects.filter(user=self.request.user, badge=badge):
                        badge_user = Badges_users(user=self.request.user, badge=badge)
                        badge_user.save()
                    
                
                    
                    
            
        else:   
            
            if type != "COMPLETE" and type != "REORDER" and type != "CHOOSE":
                return (False,"Type not found")
            
            correct_text = correct_text.split("\n\n")[0]
            text_user = text_user.split("\n\n")[0]
            
            
            if text_user == correct_text:
                correction = True
                reponse = "Correcto"
                task_user.earned_points = task_user.task.task_points
                
            else:
                correction = False
                reponse = "Incorrecto"
                task_user.earned_points = 0
                
        self.update_percentage(task_user)
        
        self.update_user_points(task_user)
            
        return correction, reponse
    
    def update_percentage(self, task_user):
        
        lesson_user = task_user.lesson_user
        number_tasks = Tasks.objects.filter(lesson=lesson_user.lesson).count()
        number_tasks_completed = Tasks_users.objects.filter(lesson_user=lesson_user, is_completed=True).count()

        if number_tasks == 0:
            lesson_user.percentage_completed = 0
        else:
            lesson_user.percentage_completed = int(number_tasks_completed * 100 / number_tasks)


        if lesson_user.percentage_completed==100:
                
                # create badge user
                badge = Badge.objects.get(name="Iniciado del Aprendizaje")
                #check if it already exist, if not creat it
                if not Badges_users.objects.filter(user=self.request.user, badge=badge):
                    badge_user = Badges_users(user=self.request.user, badge=badge)
                    badge_user.save()
                    
                    
        lesson_user.save()
        
        
        
        return lesson_user.percentage_completed
    def update_response(self, task_user):
        user_id = self.request.user

        task_user.is_completed = True
        task_user.save()

        correction, response = self.calculate_correction(task_user)

        task_user.response_text = response
        task_user.answer_boolean = correction
        task_user.save()

        # Resto de la lógica de actualización de porcentaje, etc.

    def calculate_correction(self, task_user):
        
        user_id = self.request.user
        
        type = task_user.task.type
        correct_text = task_user.task.text
        text_user = task_user.answer_text
        
        
        if type == "WRITE":
            
            input = task_user.answer_note.note_content
            print(input)
            statement = task_user.task.task_description
            correction, reponse, mark = CorrectionWrite(input=input, statement=statement)
            if correction:
                task_user.earned_points = mark * task_user.task.task_points
            
        else:   
            
            if type != "COMPLETE" and type != "REORDER" and type != "CHOOSE":
                return (False,"Type not found")
            
            correct_text = correct_text.split("\n\n")[0]
            text_user = text_user.split("\n\n")[0]
            
            
            if text_user == correct_text:
                correction = True
                reponse = "Correcto"
                task_user.earned_points = task_user.task.task_points
                print(task_user.earned_points)
                
            else:
                correction = False
                reponse = "Incorrecto"
                task_user.earned_points = 0
                
        self.update_percentage(task_user)
        
        self.update_user_points(task_user)
            
        return correction, reponse
    
    def update_percentage(self, task_user):
        
        lesson_user = task_user.lesson_user
        number_tasks = Tasks.objects.filter(lesson=lesson_user.lesson).count()
        number_tasks_completed = Tasks_users.objects.filter(lesson_user=lesson_user, is_completed=True).count()

        if number_tasks == 0:
            lesson_user.percentage_completed = 0
        else:
            lesson_user.percentage_completed = int(number_tasks_completed * 100 / number_tasks)

        lesson_user.save()
        
        return lesson_user.percentage_completed
    
    def update_user_points(self, task_user):
        
        user = task_user.user
        if task_user.is_completed:
            
            user.gems += task_user.earned_points
                
        
            user.save()
        
        return task_user.earned_points
        

    def update_user_points(self, task_user):
        
        user = task_user.user
        if task_user.is_completed:
            
            user.gems += task_user.earned_points
                
        
            user.save()
        
        return task_user.earned_points
        
