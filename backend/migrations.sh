#!/bin/bash

# List of your apps
apps=( badges badges_users boosters boosters_users challenges challenges_users clubs clubs_users directs follows folders leagues leaderboards leaderboards_users lessons lessons_users notes ratings resources streaks tasks tasks_users tivi users )

# Delete migration files for each app
for app in "${apps[@]}"; do
    rm -r "$app/migrations/"
    mkdir "$app/migrations/"
    touch "$app/migrations/__init__.py"
    sudo chown -R romenmb:romenmb "$app/migrations/"
done

# Run migrate to apply the migrations
python3 manage.py makemigrations
python3 manage.py migrate
