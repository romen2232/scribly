from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone

from escribly_api import settings


@shared_task
def send_mail_to_verify_account(user_email, first_name, token):
    """ Task that sends the account activation email """

    print("Sending email to verify account")

    send_mail(
        subject='Account Activation',
        from_email='escribly@gmail.com',
        message="",
        recipient_list=[user_email, ],
        html_message=f"<h3>Hello, {first_name},</h3>"
                     f"<p>Click on the link below to activate your account."
                     f"<a href='{settings.FRONTEND_URL}/activate/{token}'>ACTIVATE ACCOUNT</a>"
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
