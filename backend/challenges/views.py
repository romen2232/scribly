from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Challenges
from .serializers import ChallengesSerializer


class ChallengesListCreateView(generics.ListCreateAPIView):
    queryset = Challenges.objects.all()
    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(
            data=request.data)
        # print("lol")
        serializer.is_valid(raise_exception=True)
        challenge = serializer.save(user=request.user)
        return Response({"status": "success", "data": ChallengesSerializer(challenge).data}, status=status.HTTP_201_CREATED)


class ChallengesRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Challenges.objects.all()
    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        challenge = serializer.save()
        return Response({"status": "success", "data": ChallengesSerializer(challenge).data})



class ImportChallengeView(generics.CreateAPIView):
    queryset = Challenges.objects.all()
    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_Serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        challenge = serializer.save(user=request.user)
        return Response({"status": "success", "data": ChallengesSerializer(challenge).data}, status=status.HTTP_201_CREATED)
    

import os
import openai
import requests



def checkChallenge(input):
    
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    
    URL = "https://api.openai.com/v1/chat/completions"
    
    system_text = """
    Evalúa la siguiente propuesta de actividad del usuario. Determina si es adecuada para una web pública y si cumple con el tipo de actividad que estamos buscando. Si es adecuada, reescribe la actividad en lenguaje formal. Si no es adecuada, proporciona una justificación. Responde en el formato especificado: "si\n\n{actividad reescrita}" para propuestas adecuadas y "no\n\n{justificación}" para propuestas inadecuadas.
    """

    # Configurar el payload para la API de OpenAI
    payload = {
        "model": "gpt-3.5-turbo",
        "temperature": 1.0,
        "messages": [
            {"role": "system", "content": system_text},
            {"role": "user", "content": input},
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
    print(response)
    
    return response['choices'][0]['message']['content']
 
 
class ChallengesCreateUser(generics.ListCreateAPIView):
    queryset = Challenges.objects.all()
    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(
            data=request.data, user=request.user)
        challenge_content = request.data['challenge_content']
        if request.user.gems < 20:
            
            
            return Response({"status": "error", "message": "No tienes suficientes gemas"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            request.user.gems -= 20
            request.user.save()
        chat = checkChallenge(input=challenge_content)
        serializer.is_valid(raise_exception=True)
        challenge = serializer.save()
        return Response({"status": "success","answer":chat, "data": ChallengesSerializer(challenge).data}, status=status.HTTP_201_CREATED)
