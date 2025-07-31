from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Create your models here.
class User(AbstractUser):
    ROL_CHOICES = [
        ('Administrador', 'Administrador'),
        ('Ingeniero', 'Ingeniero'),
        ('Supervisor_Cliente', 'Supervisor Cliente'),
    ]
    
    REQUIRED_FIELDS = ["email","phone","rol"]
    
    # Campos del diagrama
    identification = models.CharField(max_length=20, unique=True, blank=True, null=True)
    username = models.CharField(max_length=100, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=30, choices=ROL_CHOICES, default='tecnico')
    phone = models.CharField(max_length=15, blank=True, null=True)
    # Mantener compatibilidad con campos de Django
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)

    objects = UserManager()

    def es_administrador(self):
        """Verifica si el usuario es administrador"""
        return self.rol == 'administrador'

    def es_ingeniero(self):
        """Verifica si el usuario es ingeniero"""
        return self.rol == 'ingeniero'

    def es_supervisor_cliente(self):
        """Verifica si el usuario es supervisor de cliente"""
        return self.rol == 'supervisor_cliente'

    def es_tecnico(self):
        """Verifica si el usuario es técnico"""
        return self.rol == 'tecnico'

    def save(self, *args, **kwargs):
        # Si no se especifica username, usar el username
        if not self.username:
            self.username = self.username
        
        # Sincronizar nombres
        if not self.first_name:
            self.first_name = self.first_name
        if not self.last_name:
            self.last_name = self.last_name

        return super().save(*args, **kwargs)

    def __str__(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"