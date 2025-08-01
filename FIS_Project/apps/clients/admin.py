from django.contrib import admin

# Register your models here.
from .models import Client, Sede

class SedeAdmin(admin.ModelAdmin):
    list_display = ('id','name')
    search_fields = ('name',)

admin.site.register(Client)
admin.site.register(Sede,SedeAdmin)