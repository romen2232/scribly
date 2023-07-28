from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """ Defining a custom admin model for the user model """

    readonly_fields = ('date_joined',)
    fieldsets = (
        (None, {'fields': ('email', 'password',
                           'receive_future_promotional_emails', 'provide_data_to_improve_user_exp')}),
        (_('Personal info'), {
         'fields': ('first_name', 'last_name', 'phone_number')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('id', 'email', 'first_name', 'last_name',
                    'is_staff', 'receive_future_promotional_emails', 'provide_data_to_improve_user_exp')
    list_display_links = ('id', 'email')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    list_per_page = 10
