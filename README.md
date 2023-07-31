# Escribly

Summer of code 2023 Aircury

## Backend

cd ./backend

Create an venv

python3 -m venv venv

source venv/bin/activate

create .env with
python3 contrib/env_gen.py

Install the Message Broker RabbitMQ

docker run -d --hostname rmq --name rabbitmq-server -p 8080:15672 -p 5672:5672 rabbitmq:3-management

Go to http://localhost:8080/ To check if rabbit is working
username guest
password guest

pip install -r requirements.txt

# Celery Worker Command

Este comando ejecuta una instancia de Celery como un trabajador para procesar tareas en segundo plano.

## Comando:

celery -A escribly_api worker -l info -P eventlet

## Detalles:

-   `celery`: Comando principal para interactuar con Celery, un sistema de cola y programación distribuida en Python.

-   `-A escribly_api`: Especifica el nombre del módulo de la aplicación de Celery. Reemplaza "escribly_api" con el nombre de tu propia aplicación.

-   `worker`: Inicia un trabajador (worker) para procesar las tareas en la cola de tareas.

-   `-l info`: Establece el nivel de registro a "info", lo que muestra mensajes de registro de nivel de información y superiores mientras se ejecutan las tareas.

-   `-P eventlet`: Especifica el pool de ejecución que utilizará el trabajador. En este caso, se utiliza el pool "eventlet" para aplicaciones que necesiten realizar operaciones de I/O.

Asegúrate de configurar tu aplicación con las tareas que deseas ejecutar utilizando Celery antes de ejecutar este comando.

find . -maxdepth 1 -type d -exec mkdir "{}/migrations" \; -exec touch "{}/migrations/\_\_init\_\_.py" \;
python3 manage.py makemigrations
python3 manage.py migrate
