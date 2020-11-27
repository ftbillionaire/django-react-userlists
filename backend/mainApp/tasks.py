from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def addDigits(x, y):
    return x + y

@shared_task
def sendEmail(name, email, text):
    body = f"Name: {name}\nEmail: {email}\nText: {text}"
    send_mail('Message Test', body, email, [settings.EMAIL_HOST_USER], fail_silently=False)