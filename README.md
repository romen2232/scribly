<p align="center">
  <a href="https://example.com/">
    <img src="https://via.placeholder.com/72" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Logo</h3>

  <p align="center">
    Short description
    <br>
    <a href="https://reponame/issues/new?template=bug.md">Report bug</a>
    ·
    <a href="https://reponame/issues/new?template=feature.md&labels=feature">Request feature</a>
  </p>
</p>

## Table of contents

-   [Quick start](#quick-start)
-   [Status](#status)
-   [What's included](#whats-included)
-   [Bugs and feature requests](#bugs-and-feature-requests)
-   [Contributing](#contributing)
-   [Creators](#creators)
-   [Thanks](#thanks)
-   [Copyright and license](#copyright-and-license)

## Quick start

Some text

-   Instruction 1
-   Instruction 2
-   Instruction 3

## Status

Here goes all the budgets

## What's included

Some text

```text
folder1/
└── folder2/
    ├── folder3/
    │   ├── file1
    │   └── file2
    └── folder4/
        ├── file3
        └── file4
```

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://reponame/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://reponame/issues/new).

## Contributing

Please read through our [contributing guidelines](https://reponame/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, all HTML and CSS should conform to the [Code Guide](https://github.com/mdo/code-guide), maintained by [Main author](https://github.com/usernamemainauthor).

Editor preferences are available in the [editor config](https://reponame/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <https://editorconfig.org/>.

## Creators

**Creator 1**

-   <https://github.com/usernamecreator1>

## Thanks

Some Text

## Copyright and license

Code and documentation copyright 2011-2018 the authors. Code released under the [MIT License](https://reponame/blob/master/LICENSE).

Enjoy :metal:

# Scribly

Summer of code 2023 Aircury

# Backend

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

## Celery Worker Command

Este comando ejecuta una instancia de Celery como un trabajador para procesar tareas en segundo plano.

### Comando:

celery -A scribly_api worker -l info -P eventlet

### Detalles:

-   `celery`: Comando principal para interactuar con Celery, un sistema de cola y programación distribuida en Python.

-   `-A scribly_api`: Especifica el nombre del módulo de la aplicación de Celery. Reemplaza "scribly_api" con el nombre de tu propia aplicación.

-   `worker`: Inicia un trabajador (worker) para procesar las tareas en la cola de tareas.

-   `-l info`: Establece el nivel de registro a "info", lo que muestra mensajes de registro de nivel de información y superiores mientras se ejecutan las tareas.

-   `-P eventlet`: Especifica el pool de ejecución que utilizará el trabajador. En este caso, se utiliza el pool "eventlet" para aplicaciones que necesiten realizar operaciones de I/O.

Asegúrate de configurar tu aplicación con las tareas que deseas ejecutar utilizando Celery antes de ejecutar este comando.

---

```bash
sudo ./migrations.sh
```

---

---

# Frontend

cd ./frontend
npm install
npx tailwindcss -i ./src/assets/styles/tailwind.css -o ./dist/main.css --watch
npm run dev
