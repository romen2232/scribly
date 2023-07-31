from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a user given an email and password."""
        if not email:
            raise ValueError('The given email must be set!')
        email = self.normalize_email(email)
        
        user_permissions = extra_fields.pop('user_permissions', None)
        groups = extra_fields.pop('groups', None)
        
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        
        if user_permissions is not None:
            user.user_permissions.set(user_permissions)
            
        if groups is not None:
            user.groups.set(groups)
        
        
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        "Username", max_length=30, unique=True)
    first_name = models.CharField("First name", max_length=30)
    last_name = models.CharField("Last name", max_length=100)
    email = models.EmailField("E-mail", max_length=255, unique=True)
    phone_number = models.CharField(
        "Cellphone number", max_length=15, blank=True, null=True)
    experience = models.IntegerField("Experience", default=0)
    gems = models.IntegerField("Gems", default=100)
    appear_daily_challenge = models.BooleanField(
        "Appear daily challenge", default=True)
    receive_future_promotional_emails = models.BooleanField("Receive future promotional emails", default=False,
                                                            help_text='If false, do not send emails to the user')
    provide_data_to_improve_user_exp = models.BooleanField("Provide data to improve the user experience", default=False,
                                                           help_text='If false, do not use the user data')
    is_staff = models.BooleanField("Staff member", default=False,
                                   help_text='Designates whether the user can log into this admin site.')
    is_active = models.BooleanField(
        "Active", default=False, help_text='Designates whether this user has activated the account in the email.')

    date_joined = models.DateTimeField("Creation", auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

    objects = UserManager()

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name


class PasswordResetToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, unique=True)


class VerifyEmailToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, unique=True)
