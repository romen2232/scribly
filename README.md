<p align="center">
  <a href="https://scribly.org/">
    <img src="https://scribly.org/static/assets/favicon-a3ed11a3.a1da6098592d.png" alt="Scribly Logo" width=72 height=72>
  </a>

  <h3 align="center">Scribly<i>!</i></h3>

  <p align="center">
    Unleash Your Writing Creativity 🖋️
    <br>
    <a href="https://github.com/romen2232/scribly/issues/new?template=bug.yaml">Report a bug</a>
    ·
    <a href="https://github.com/romen2232/scribly/issues/new?template=feature.yaml&labels=feature">Request a feature</a>
  </p>
</p>

## Table of Contents 📌

-   [About Scribly](#about-scribly-)
-   [Features](#features-)
-   [Language Support](#language-support-)
-   [Getting Started](#getting-started-)
-   [Status](#status-)
-   [Folder Structure](#folder-structure-)
-   [Contributing](#contributing-)
-   [Creator](#creator-)
-   [Special Thanks](#special-thanks-)
-   [Copyright and License](#copyright-and-license-)

## About Scribly! 📘

Scribly is a cutting-edge web application designed to help budding writers and seasoned authors alike to hone their creative writing skills. Whether you're looking to improve your storytelling, develop unique characters, play with the metrics, or simply find inspiration, Scribly has got you covered.

![Scribly Screenshot](path/to/screenshot.png)  
_Sample screenshot of Scribly in action._

## Features 🌟

-   **Folder Management System**: Organize your notes, drafts, and final pieces with ease.
-   **Create & Analyze Notes**: Jot down your thoughts and let Scribly provide feedback to enhance your writing.
-   **Social Functionalities**: Connect with fellow writers, share your work, and get feedback.
-   **Diverse Lessons**: From basics to advanced topics, learn the art of creative writing at your own pace.
-   **Badges & Achievements**: Stay motivated with badges that mark your progress and achievements.
-   ... and much more!

## Language Support 🌍

Currently, Scribly is available exclusively in Spanish. However, we're eager to make Scribly accessible to a wider audience. If you're proficient in Spanish and another language, and would like to help with the translation, we'd be thrilled to collaborate! Please reach out to us at [scribly@gmail.com](mailto:scribly@gmail.com) to discuss how you can contribute.

## Getting Started 🚀

There are two main ways to dive into the world of Scribly:

### 1. **Online Experience**:

-   **Sign Up**: Create your Scribly account [here](https://scribly.org/registro).
-   **Dive into Lessons**: Start with beginner lessons or jump straight into advanced topics.
-   **Write & Analyze**: Use Scribly's intuitive editor to draft your stories and get instant feedback.
-   **Connect**: Join the community, share your work, and collaborate with fellow writers.

### 2. **Local Installation**:

For those who love to tinker with code, you can set up Scribly locally and make it your own!

-   **Clone the Repository**: `git clone https://github.com/romen2232/scribly`
-   **Install Dependencies**: Coming soon is an `install.sh`` script that will automate all initial setup commands. In the meantime, you can:

---

#### Backend

-   Navigate to the backend directory:

    ```bash
    cd ./backend
    ```

-   Create a virtual environment:

    ```bash
    python3 -m venv venv
    ```

-   Activate the virtual environment:

    ```bash
    source venv/bin/activate
    ```

-   Create an .env file:

    ```bash
    python3 contrib/env_gen.py
    ```

-   Install RabbitMQ:

    ```bash
    docker run -d --hostname rmq --name rabbitmq-server -p 8080:15672 -p 5672:5672 rabbitmq:3-management
    ```

-   Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

-   Celery Worker Command:
    ```bash
    celery -A scribly_api worker -l info -P eventlet
    ```

#### Frontend

-   Navigate to the frontend directory:

    ```bash
    cd ./frontend
    ```

-   Setup TailwindCSS:

    ```bash
    npx tailwindcss -i ./src/assets/styles/tailwind.css -o ./dist/main.css --watch
    ```

-   Start the development server:
    ```bash
    npm run dev
    ```

---

## Status 🚧

Current Version: 0.9.0
Last Updated: September 13, 2023

We're on the brink of releasing Scribly 1.0! Here's a brief overview of what's left to tackle:

### Fixes:

-   **UI & Design**: Improvements in responsiveness, UI transitions, toast notifications, lesson icons, and overall design.
-   **Authentication**: Issues with account activation, double login, email functionalities, and other related auth requirements.
-   **User Experience**: Enhancements in lesson progress, user configurations, followers/following system, and badges.
-   **Backend**: Refinements in backend language, image serving, and other backend-related functionalities.
-   **Miscellaneous**: Various fixes in posts, ratings, loading, lessons, and documentation.

### Features to Add:

-   Landing page
-   Resend mail functionality
-   Forgot password feature
-   A `getStarted.sh` script
-   Testing

This summary provides a high-level overview of the tasks left for version 1.0. For detailed information on each task, check the [project](https://github.com/users/romen2232/projects/14)

Stay tunned for the 1.0 release.

## Folder Structure 📂

Scribly's codebase is organized in a structured manner to ensure ease of navigation and maintainability. Here's a brief overview of the main directories and their purposes:

```text
scribly/
│
├── backend/                 # Backend source code directory
│   ├── module/              # Entity module for all the MVT related operations
│   │   └── migrations/      # Database migrations for the entity
│   ├── ...                  # (Similar structure for other modules)
│   ├── frontend/            # Frontend source code directory
│   │   ├── public/          # Publicly accessible files
│   │   │   └── img/         # Public images
│   │   └── src/             # Main source code for frontend
│   │       ├── app/                  # Core application setup and bootstrap logic
│   │       ├── assets/               # Static assets utilized across the application
│   │       ├── components/           # Reusable UI components, organized by functionality
│   │       ├── hoc/                  # Higher-Order Components enhancing base components
│   │       ├── hooks/                # Custom React hooks for various functionalities
│   │       ├── i18n/                 # Internationalization setup and language files
│   │       ├── pages/                # Components representing entire pages or views
│   │       ├── services/             # Services for external API calls and data management
│   │       ├── stores/               # State management using zustand
│   │       └── utils/                # Utility functions and helpers used across the app
│   └── scribly_api/         # Main API module for Scribly
└── docs/                    # Documentation directory

```

## Contributing 🤝

For contributions, check our [contribution guidelines](https://github.com/romen2232/scribly/blob/main/CONTRIBUTING.md). It includes instructions on how to open issues, coding standards, and development notes.

We welcome contributions! If you find a bug or have a feature request, please open an issue. If you'd like to contribute code, please fork the repository and submit a pull request.

## Creator ✨

Scribly is the result of dedication, passion, and countless hours of work by:

**[Romen Medina Beltrán](https://github.com/romen2232)**

-   **Role**: Developer, Designer, & Visionary
-   **About**: With a passion for both technology and storytelling, Romen envisioned a platform where writers could hone their skills and connect with others.
-   **Contact**: [Email](mailto:romenmedbel@gmail.com) | [LinkedIn](https://www.linkedin.com/in/romen-medina-442776231/)

## Special Thanks 🙏

A journey to innovation is seldom traveled alone. Along the path, we've had the pleasure of crossing with visionary entities that recognize and nurture potential. Among them, a special nod of gratitude goes to **Aircury SL**. Their initiative "Summer of Code" is not merely a program; it's a testament to their commitment to fostering talent and innovation, especially in sectors that touch the very essence of our society, such as education. While Scribly stands as a beacon for interactive learning, the winds beneath its wings were, in many ways, provided by the trust and opportunity rendered by Aircury.

Beyond organizations, there are special individuals whose personal touch, guidance, and unwavering support have been instrumental in shaping Scribly's journey:

-   **[Sergi Heras](https://www.linkedin.com/in/sergiheras/)**: A special shoutout to Sergi for being an incredible mentor throughout this journey. Your guidance, patience, and expertise were invaluable.

-   **[German Amian](https://www.linkedin.com/in/germ%C3%A1n-ami%C3%A1n-mata-42a202173/)**: Thank you, German, for being a pillar of support throughout the project. Your encouragement and insights made a world of difference.

## Copyright and License 📄

Code and documentation © 2023 Romen Medina Beltrán. Code released under the [MIT License](https://github.com/romen2232/scribly/blob/main/LICENSE).

---

Keep writing and enjoy 🖋️
