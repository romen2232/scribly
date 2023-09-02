from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone

from scribly_api import settings
from django.template.loader import render_to_string


@shared_task
def send_mail_to_verify_account(user_email, username, token):
    """ Task that sends the account activation email """

    print("Sending email to verify account")
    msg_html=render_to_string('verify_email.html', {'username': username, 'action_url': f'{settings.FRONTEND_URL}/activate/{token}', 'logo_url': f'{settings.BACKEND_URL}/static/favicon.png', 'year': f'{timezone.now().year}'}
    )
    print(msg_html)

    send_mail(
        subject='Account Activation',
        from_email='scribly@gmail.com',
        message="",
        recipient_list=[user_email, ],
        html_message=msg_html
    )


@shared_task
def send_mail_to_reset_user_password(user_email, first_name, token):
    """ Task that sends an email to reset the password """

    send_mail(
        subject='Password Reset',
        from_email='from@example.com',
        message="",
        recipient_list=[user_email, ],
        html_message=f"<h3>Hello, {first_name},</h3>"
                     f"<p>Click on the button below to reset your password.</p>"
                     f"<a href='{settings.FRONTEND_URL}/reset-password/{token}'>RESET PASSWORD</a>"
    )
