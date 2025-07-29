from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Create your models here.
class User(AbstractUser):
    ROL_CHOICES = [
        ('administrador', 'Administrador'),
        ('ingeniero', 'Ingeniero'),
        ('supervisor_cliente', 'Supervisor Cliente'),
        ('tecnico', 'Técnico'),
    ]
    
    REQUIRED_FIELDS = ["email"]
    
    # Campos del diagrama
    nombre_usuario = models.CharField(max_length=100, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True)
    primer_nombre = models.CharField(max_length=50, blank=True, null=True)
    primer_apellido = models.CharField(max_length=50, blank=True, null=True)
    rol = models.CharField(max_length=30, choices=ROL_CHOICES, default='tecnico')
    
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
        # Si no se especifica nombre_usuario, usar el username
        if not self.nombre_usuario:
            self.nombre_usuario = self.username
        
        # Sincronizar nombres
        if self.primer_nombre and not self.first_name:
            self.first_name = self.primer_nombre
        if self.primer_apellido and not self.last_name:
            self.last_name = self.primer_apellido
            
        return super().save(*args, **kwargs)

    def __str__(self):
        if self.primer_nombre and self.primer_apellido:
            return f"{self.primer_nombre} {self.primer_apellido}"
        return self.username

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"