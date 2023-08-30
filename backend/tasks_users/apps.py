from django.apps import AppConfig
import openai   
import requests 

import re
class TasksUsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tasks_users'


def evaluation(input, statement, difficulty=1):
    openai.api_key = "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"

    
    # Descripción de la dificultad
    difficulty_descriptions = [
        "Sé amable y enfócate en los aspectos positivos, incluso si hay áreas de mejora.",
        "Proporciona una crítica equilibrada, destacando tanto los aspectos positivos como las áreas de mejora.",
        "Sé objetivo y evalúa el texto de manera justa en todos los aspectos.",
        "Sé crítico y no dudes en señalar áreas de mejora, manteniendo un tono respetuoso.",
        "Sé muy crítico y riguroso en tu evaluación, buscando áreas de mejora en todos los aspectos del texto."
    ]
    critical_level = difficulty_descriptions[difficulty - 1]
    
    URL = "https://api.openai.com/v1/chat/completions"
    payload = {
        "model": "gpt-3.5-turbo",
        "temperature": 1.0,
        "messages": [
            # {"role": "system", "content": f"Eres un crítico literario y tu enfoque es {critical_level}. Tu tarea es evaluar un texto breve en relación con el statement: {statement}."},
            # {"role": "user", "content": f"TEXTO \n\n{input}\n\n FIN TEXTO \n\n"},
            # {"role": "assistant", "content": f"Evaluaré el texto cuidadosamente y proporcionaré una puntuación justa y detallada."}
        
            {"role": "system", "content": f"Eres un sistema de puntuación de una página web sobre escritura de relatos y tu enfoque es {critical_level}. Tu tarea es evaluar de 0 a 10 un texto breve en relación con el statement: {statement}. Y proporcionar una respuesta personalizada que ayude al usuario a mejorar sus puntos débiles y darse cuenta de sus puntos fuertes."},
            {"role": "user", "content": f"TEXTO \n\n{input}\n\n FIN TEXTO \n\n"},
            {"role": "assistant", "content": f"Evaluaré el texto cuidadosamente y proporcionaré una puntuación justa y detallada en formato n/10.Usaré el criterio: #La evaluacion irá de 0 a 10 #  0 si el texto no corresponde a la solucion del statement. # 1 a 4 si el texto sicorresponde a la solucion del statement, pero es demasiado corto y simple. # 5 a 10 si el texto si en este caso lo cumple bien y es minimamente elaborado.  # Se tomarán como atributos a evaluar ( # 1. Cumplimiento del enunciado. 2. Calidad literaria, incluyendo gramática y puntuación. 3. Creatividad y originalidad."}
        
        ]
    
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}"
    }
    
    response = requests.post(URL, headers=headers, json=payload)
    response = response.json()
    print(response)
    message = response['choices'][0]['message']['content']
    
    # Extraer la puntuación final del mensaje
    note = re.search(r'(\d+(\.\d+)?)/10', message)
    if note:
        note = float(note.group(1))
    else:
        note = -10 # Puedes manejar este caso como prefieras

    return (note,message)





def chatbotAnswer(input):
    openai.api_key = "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"




    URL = "https://api.openai.com/v1/chat/completions"

    payload = {
    "model": "gpt-3.5-turbo",
    "temperature" : 1.0,
    "messages" : [
        {"role": "system", "content": f"Eres un profesor de literatura. Experto en realizar correcciones positivas y constructivas a jóvenes escritores."},
        {"role": "user", "content": f"TEXTO \n\n{input}\n\n FIN TEXTO \n\n"}, 
        {"role": "assistant", "content": f"Te procuraré una serie de correcciones para que puedas mejorar tu texto, señalando a que partes del texto se refieren las correcciones . Finalmente te daré la versión corregida del texto."},
    ]
    }

    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai.api_key}"
    }

    response = requests.post(URL, headers=headers, json=payload)
    response = response.json()

    return response['choices'][0]['message']['content']



def chatbotCorrection(input):
    openai.api_key = "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"

    mission = "Escribe una breve historia introduciendo a tu personaje principal."
    

    URL = "https://api.openai.com/v1/chat/completions"

    payload = {
    "model": "gpt-3.5-turbo",
    "temperature" : 1.0,
    "messages" : [
        {"role": "system", "content": f"Eres un profesor de literatura. Experto en realizar correcciones ."},
        {"role": "user", "content": f"TEXTO \n\n{input}\n\n FIN TEXTO \n\n"}, 
        {"role": "assistant", "content": f"Si el texto del usuario cumple el cometido responderé SI, sino NO."},
    ]
    }

    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai.api_key}"
    }

    response = requests.post(URL, headers=headers, json=payload)
    response = response.json()

    if response['choices'][0]['message']['content'] == "SI": 
        return True
    else:
        return False


    return 

def CorrectionWrite(input, statement):
    mark,reponse = evaluation(input=input, statement=statement)
    
    if mark >4: 
        correction = True
    else:
        correction = False
           
    return correction, reponse, mark

# def CorrectionComplete(text_user, correct_text):
    
#     #format correct_text
    
#     correct_text = correct_text.split("\n\n")[0]
#     text_user = text_user.split("\n\n")[0]
    
    
        
#     return correction, reponse


# def CorrectionReorder(text_user, correct_text):
    
#     #format correct_text
    
#     if text_user == correct_text:
#         correction = True
#         reponse = "Correcto"
#     else:
#         correction = False
#         reponse = "Incorrecto"
        
#     return correction, reponse


# def CorrectionChoose(text_user, correct_text):    

#     correct_text = correct_text.split("\n\n")[0]
#     text_user = text_user.split("\n\n")[0]
    
#     if text_user == correct_text:
#         correction = True
#         reponse = "Correcto"
#     else:
#         correction = False
#         reponse = "Incorrecto"
        
#     return correction, reponse


# def Correction(note, text_user, correct_text, type, statement):
    
#     if type == "WRITE":
        
#         task_user = note.note_content
#         correction, reponse = CorrectionWrite(input=task_user, statement=statement)
#     elif type == "COMPLETE":
#         correct_text = correct_text
#         text_user = text_user
#         correction, reponse = CorrectionComplete(text_user, correct_text)
#     elif type == "REORDER":
#         correct_text = correct_text
#         text_user = text_user
#         correction, reponse = CorrectionReorder(text_user, correct_text)
#     elif type == "CHOOSE":
#         correct_text = correct_text
#         text_user = text_user
#         correction, reponse = CorrectionChoose(text_user, correct_text)
#     else:
#         correction = False
#         reponse = "Type not found"
        
#     return correction, reponse
    
   
    
     