from django.contrib import admin

# Register your models here.
from .models import Client, Sede

class SedeAdmin(admin.ModelAdmin):
    list_display = ('id','name')
    search_fields = ('name',)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone')
    search_fields = ('name', 'email')

admin.site.register(Client, ClientAdmin)
admin.site.register(Sede,SedeAdmin)