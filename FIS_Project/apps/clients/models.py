from django.db import models

# Create your models here.
class Client(models.Model):
    type= models.CharField(max_length=50, choices=[
        ('Cedula', 'Cedula'),
        ('Cedula Extranjeria', 'Cedula Extranjeria'),
    ], default='Cedula')
    identification = models.CharField(max_length=20, unique=True, blank=True, null=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    

    def __str__(self):
        return self.name

class Sede(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField(blank=True, null=True)
    cliente = models.ForeignKey('Client', on_delete=models.CASCADE, related_name='sedes', null=True, blank=True)

    def __str__(self):
        return self.name