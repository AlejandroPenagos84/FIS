from django.contrib import admin

# Register your models here.
from .models import Client, Sede

admin.site.register(Client)
admin.site.register(Sede)