from django.db import models

# Create your models here.
class Tivi(models.Model):
    tivi_name = models.CharField(max_length=100)
    