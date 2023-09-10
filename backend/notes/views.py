import requests
import openai
import os
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Notes
from users.models import User
from .serializers import NoteSerializer
from rest_framework.pagination import PageNumberPagination


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    # pagination_class = LargeResultsSetPagination

    def create(self, request, *args, **kwargs):
        serializer = NoteSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        note = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class NoteRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        note = serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class NotesList(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notes.objects.filter(user=self.request.user)


class NoteListByFolder(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        folder_id = self.kwargs['folder_id']
        return Notes.objects.filter(user=self.request.user, folder=folder_id)


class NoteListByTag(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        tag_id = self.kwargs['tag_id']
        return Notes.objects.filter(user=self.request.user, tags=tag_id)


class NoteListByChallenge(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        challenge_id = self.kwargs['challenge_id']
        return Notes.objects.filter(user=self.request.user, challenge=challenge_id)


class NoteListByTask(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs['task_id']
        return Notes.objects.filter(user=self.request.user, task=task_id)


class PublicNoteList(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notes.objects.filter(public=True)


class PublicNoteListByUser(generics.ListAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Notes.objects.filter(user=user_id, public=True)

    def get_serializer_class(self):
        return NoteSerializer


class PublicNoteListByUsername(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs['username']
        user = User.objects.get(username=username)
        # user_email = user.email
        return Notes.objects.filter(user=user, public=True)

    def get_serializer_class(self):
        return NoteSerializer


def AnswerNote(input):

    openai.api_key = "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"

    URL = "https://api.openai.com/v1/chat/completions"

    # statement = "Escribe una historia sen la que el protagonista sea un robot del fututo"
    difficulty = 3
    # Descripción de la dificultad
    difficulty_descriptions = [
        "Sé amable y enfócate en los aspectos positivos, incluso si hay áreas de mejora.",
        "Proporciona una crítica equilibrada, destacando tanto los aspectos positivos como las áreas de mejora.",
        "Sé objetivo y evalúa el texto de manera justa en todos los aspectos.",
        "Sé crítico y no dudes en señalar áreas de mejora, manteniendo un tono respetuoso.",
        "Sé muy crítico y riguroso en tu evaluación, buscando áreas de mejora en todos los aspectos del texto."
    ]
    critical_level = difficulty_descriptions[difficulty - 1]

    system_text = f"Eres un asistente de enseñanza amigable y servicial. Explicas conceptos de gran profundidad en pocas palabras,  usando términos simples y das ejemplos para ayudar a las personas a aprender. Proporcionas respuestas personalizadas que ayudan  al usuario a mejorar sus puntos débiles y darse cuenta de sus puntos fuertes.\n\nTu enfoque es {critical_level}."
    user_text = f'''
    Por favor,se te proporcionará un texto y evalúa el siguiente texto siguiendo los criterios detallados a continuación y presenta los resultados en un formato específico:

**Información de referencia:**

- **TEXTO propuesto por el alumno:** {input}

**Instrucciones de Evaluación:**



2. **Atributos a evaluar:**
   - **Calidad literaria:** Evalúa la gramática, la puntuación y la estructura del texto.
   - **Creatividad y originalidad:** Considera la innovación y la singularidad del texto.
   - **Coherencia:** Asegúrate de que el texto tenga un flujo lógico y coherente.

3. **Proceso de Reflexión:** Antes de tomar una decisión sobre la puntuación, tómate un momento para reflexionar sobre el texto y considerar todos los aspectos mencionados.

**Formato 1 de Presentación de la Evaluación:**



- **Calidad literaria:** [Análisis detallado]
- **Creatividad y originalidad:** [Análisis detallado]
- **Coherencia:** [Análisis detallado]
- **Recomendaciones de mejora:** [Recomendaciones de mejora]
- **Resumen:** [Resumen general de los análisis]

    '''

    payload = {
        "model": "gpt-3.5-turbo",
        "temperature": 1.0,
        "messages": [

            {"role": "system", "content": system_text},
            {"role": "user", "content": user_text},

        ]

    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}"
    }

    response = requests.post(
        URL,
        headers=headers,
        json=payload
    )

    response = response.json()
    # print(response)

    return response['choices'][0]['message']['content']


class AnalyzeNote(generics.ListCreateAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = LargeResultsSetPagination

    def create(self, request, *args, **kwargs):
        serializer = NoteSerializer(
            data=request.data, context={'request': request})
        note_content = request.data['note_content']
        chat = AnswerNote(input=note_content)

        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user, note_analysis=chat)
        # note = serializer.save()
        return Response(chat, status=status.HTTP_201_CREATED)


class AnalyzeNoteEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):

        gems = request.user.gems
        if gems < 100:
            return Response({"detail": "No tienes suficientes gemas para analizar tu nota"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            request.user.gems = gems - 100
            request.user.save()
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        note_content = instance.note_content
        chat = AnswerNote(input=note_content)
        serializer.is_valid(raise_exception=True)
        note = serializer.save(note_analysis=chat)
        print(note.note_analysis)
        return Response(serializer.data, status=status.HTTP_200_OK)
