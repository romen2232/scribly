# Generated by Django 3.2 on 2023-07-31 06:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('follows', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='follows',
            name='followed',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follows_received', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='follows',
            name='follower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follows_made', to=settings.AUTH_USER_MODEL),
        ),
    ]