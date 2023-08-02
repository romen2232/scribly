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

python manage.py makemigrations badges
python manage.py makemigrations badges_users
python manage.py makemigrations boosters
python manage.py makemigrations boosters_users
python manage.py makemigrations challenges
python manage.py makemigrations challenges_users
python manage.py makemigrations clubs
python manage.py makemigrations clubs_users
python manage.py makemigrations directs
python manage.py makemigrations follows
python manage.py makemigrations folders
python manage.py makemigrations leaderboards
python manage.py makemigrations leaderboards_users
python manage.py makemigrations lessons
python manage.py makemigrations lessons_users
python manage.py makemigrations notes
python manage.py makemigrations ratings
python manage.py makemigrations resources
python manage.py makemigrations streaks
python manage.py makemigrations tasks
python manage.py makemigrations tasks_users
python manage.py makemigrations tivi
python manage.py makemigrations users
python3 manage.py migrate
