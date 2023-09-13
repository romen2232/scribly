
<p align="center">
  <a href="https://scribly.com/">
    <img src="https://scribly.org/static/assets/favicon-a3ed11a3.a1da6098592d.png" alt="Scribly Logo" width=72 height=72>
  </a>

  <h3 align="center">Scribly</h3>

  <p align="center">
    An innovative platform designed to enhance writing in an interactive and engaging manner.
    <br>
    <a href="https://scribly.com/issues/new?template=bug.md">Report a bug</a>
    ·
    <a href="https://scribly.com/issues/new?template=feature.md&labels=feature">Request a feature</a>
  </p>
</p>

## Table of Contents

- [Quick Start](#quick-start)
- [About Scribly](#about-scribly)
- [Features](#features)
- [UI/UX Design](#uiux-design)
- [Implementation and Technology](#implementation-and-technology)
- [Potential Impact and Benefits](#potential-impact-and-benefits)
- [Status](#status)
- [Contents](#contents)
- [Bugs and Feature Requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators](#creators)
- [Acknowledgements](#acknowledgements)
- [Copyright and License](#copyright-and-license)

## Quick Start

To get started with Scribly:

### Backend

- Navigate to the backend directory:
  ```bash
  cd ./backend
  ```

- Create a virtual environment:
  ```bash
  python3 -m venv venv
  ```

- Activate the virtual environment:
  ```bash
  source venv/bin/activate
  ```

- Create an .env file:
  ```bash
  python3 contrib/env_gen.py
  ```

- Install RabbitMQ:
  ```bash
  docker run -d --hostname rmq --name rabbitmq-server -p 8080:15672 -p 5672:5672 rabbitmq:3-management
  ```

- Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```

- Celery Worker Command:
  ```bash
  celery -A scribly_api worker -l info -P eventlet
  ```

### Frontend

- Navigate to the frontend directory:
  ```bash
  cd ./frontend
  ```

- Setup TailwindCSS:
  ```bash
  npx tailwindcss -i ./src/assets/styles/tailwind.css -o ./dist/main.css --watch
  ```

- Start the development server:
  ```bash
  npm run dev
  ```

## About Scribly

Scribly was conceived to address a crucial need in our lives: the ability to write effectively. Writing allows us to communicate, express ideas and emotions, and develop critical reasoning skills. It offers advantages in academic and professional environments, enabling solid relationships to be built, maintained, and developed. Writing transcends cultural and generational barriers, proving to be a valuable and powerful skill for personal and professional success.

## Features

- **Interactive Lessons**: Scribly offers themed lessons covering relevant areas of writing like grammar, style, character creation, conflict resolution, and more. Each lesson combines theory and practice, ensuring in-depth understanding and immediate application of learned concepts.
- **Gamification**: Engage with your learning through gamification. Earn points and achievements as you explore different writing styles, complete lessons, and take on daily challenges.
- **Personalized Writing Assistant**: Utilizing artificial intelligence, our writing assistant offers personalized feedback and suggestions to improve every text.
- **Community and Feedback**: Share your writings and receive constructive feedback from the Scribly community. Themed challenges provide additional opportunities for learning and growth.

## UI/UX Design

The design of Scribly prioritizes a fluid and rewarding user experience, blending visual aesthetics with functionality. Special attention is given to usability, ensuring smooth navigation across the platform and quick access to various features.

## Implementation and Technology

Scribly is developed using modern technologies like React and Redux for the frontend, Django Restframework for the backend, and Tailwind for styling. Advanced AI libraries such as Pandas and TensorFlow power the real-time and personalized feedback features.

## Potential Impact and Benefits

Scribly aims to fill a market gap by offering an interactive, engaging, and effective solution for writing learning. By combining gamification, themed lessons, and AI-powered personalized feedback, we deliver a unique and innovative learning experience. Our platform holds immense potential across sectors, from education to the corporate world, proving invaluable for students, professionals, aspiring writers, and anyone aiming to enhance their writing skills.

## Status

Include the current status of the project here, such as versions, recent updates, and other relevant details.

## Contents

Directory and file structure of the project:

```text
Scribly/
├── backend/
│   ├── venv/
│   ├── contrib/
│   ├── requirements.txt
│   └── ...
└── frontend/
    ├── src/
    │   ├── assets/
    │   └── ...
    ├── dist/
    └── ...
```

## Bugs and Feature Requests

Encountered a bug or have a feature request? First, read the [issue guidelines](https://scribly.com/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea hasn't been addressed yet, [please open a new issue](https://scribly.com/issues/new).

## Contributing

For contributions, check our [contribution guidelines](https://scribly.com/blob/master/CONTRIBUTING.md). It includes instructions on how to open issues, coding standards, and development notes.

## Creators

**Romen Medina Beltrán**

- <https://github.com/romenmedinabeltran>


## Acknowledgements

A journey to innovation is seldom traveled alone. Along the path, we've had the pleasure of crossing with visionary entities that recognize and nurture potential. Among them, a special nod of gratitude goes to Aircury SL. Their initiative "Summer of Code" is not merely a program; it's a testament to their commitment to fostering talent and innovation, especially in sectors that touch the very essence of our society, such as education. While Scribly stands as a beacon for interactive learning, the winds beneath its wings were, in many ways, provided by the trust and opportunity rendered by Aircury. Our heartfelt thanks to their team and their vision. Here's to many more summers of code, innovation, and impact!
## Copyright and License

Code and documentation © 2023 Romen Medina Beltrán. Code released under the [MIT License](https://scribly.com/blob/master/LICENSE).

Keep writing and enjoy! 🚀
