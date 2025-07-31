from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('id','username', 'email', 'first_name', 'last_name', 'role')
    search_fields = ('id','username', 'email')

admin.site.register(User, UserAdmin)