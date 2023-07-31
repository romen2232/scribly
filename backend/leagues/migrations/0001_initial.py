# Generated by Django 3.2 on 2023-07-31 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Leagues',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('league_name', models.CharField(max_length=100)),
                ('league_description', models.TextField(max_length=1000)),
                ('league_image', models.ImageField(blank=True, upload_to='league_images')),
            ],
        ),
    ]
