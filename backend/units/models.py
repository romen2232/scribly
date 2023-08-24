from django.db import models


class Unit(models.Model):
    unit_number = models.IntegerField(default=0)
    unit_name = models.CharField(max_length=100)
    unit_description = models.TextField(max_length=1000)
    unit_style = models.CharField(max_length=100, default='default')
    unit_color = models.CharField(
        max_length=100, default='tiviElectricPurple')
