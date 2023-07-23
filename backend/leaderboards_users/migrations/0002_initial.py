# Generated by Django 4.2.3 on 2023-07-17 14:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('leaderboards_users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='leaderboarduser',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
    ]
