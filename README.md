# Escribly

Summer of code 2023 Aircury

## Backend

cd ./backend

Create an venv

python3 -m venv venv

source venv/bin/activate

create .env with python3 contrib/env_gen.py

Install the Message Broker RabbitMQ

docker run -d --hostname rmq --name rabbitmq-server -p 8080:15672 -p 5672:5672 rabbitmq:3-management

Go to http://localhost:8080/ To check if rabbit is working
username guest
password guest

pip install celery
celery -A escribly_api worker -l info -P eventlet
