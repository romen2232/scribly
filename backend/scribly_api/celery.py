import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scribly_api.settings')
app = Celery('scribly_api')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()