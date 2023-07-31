# Generated by Django 4.2.3 on 2023-07-28 02:33

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Badge",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("badge_name", models.CharField(max_length=100)),
                ("badge_description", models.TextField(max_length=1000)),
                (
                    "badge_image",
                    models.ImageField(blank=True, upload_to="badge_images"),
                ),
            ],
        ),
    ]