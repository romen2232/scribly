from django.db import models


# Create your models here.
class Note(models.Model):
    note_name = models.CharField(max_length=100)
    note_content = models.TextField(max_length=10000)
    note_image = models.ImageField(upload_to='note_images', blank=True)
    note_last_modified = models.DateTimeField(auto_now=True)
    public = models.BooleanField(default=False)
    note_average_rating = models.FloatField(default=0)
    tags = models.TextField(max_length=1000, default="")
    task = models.ForeignKey('tasks.Task', on_delete=models.CASCADE, null=True, blank=True)
    challenge = models.ForeignKey('challenges.Challenge', on_delete=models.CASCADE, null=True, blank=True)
    folder = models.ForeignKey('folders.Folder', on_delete=models.CASCADE, null=True, blank=True)