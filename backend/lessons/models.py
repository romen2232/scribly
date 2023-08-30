from django.db import models


class Lessons(models.Model):
    lesson_name = models.CharField(max_length=100)

    lesson_description = models.TextField(
        max_length=1000, default="Text with lesson description")
    lesson_theory = models.TextField(
        max_length=10000, default="Text with lesson theory")
    difficulty = models.IntegerField(default=0)
    unit = models.ForeignKey(
        "units.Unit", on_delete=models.CASCADE, null=True, blank=True)
    bg_color = models.CharField(max_length=100, default="bg-tiviElectricPurple-50")
