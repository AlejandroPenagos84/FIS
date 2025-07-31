from django.db import models

# Create your models here.
class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    sede = models.ForeignKey('Sede', on_delete=models.CASCADE, related_name='clients', null=True, blank=True)

    def __str__(self):
        return self.name

class Sede(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField(blank=True, null=True)

    def areas_servicio(self):
        from apps.equipment.models import AreaServicio
        return AreaServicio.objects.filter(sede=self)
        
    def __str__(self):
        return self.name