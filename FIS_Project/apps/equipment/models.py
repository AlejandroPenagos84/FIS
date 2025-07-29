from django.db import models
from apps.clients.models import Client, Sede

# Create your models here.

class AreaServicio(models.Model):
    name = models.CharField(max_length=100)
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE, related_name='areas_servicio', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Área de Servicio"
        verbose_name_plural = "Áreas de Servicio"


class TipoEquipo(models.Model):
    name = models.CharField(max_length=100)
    especificaciones = models.TextField(blank=True, null=True)
    valor_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Tipo de Equipo"
        verbose_name_plural = "Tipos de Equipo"


class Equipo(models.Model):
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('mantenimiento', 'En Mantenimiento'),
        ('fuera_servicio', 'Fuera de Servicio'),
    ]
    
    numero_serie = models.CharField(max_length=100, unique=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activo')
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    tipo_equipo = models.ForeignKey(TipoEquipo, on_delete=models.CASCADE, related_name='equipos', null=True, blank=True)
    area_servicio = models.ForeignKey(AreaServicio, on_delete=models.CASCADE, related_name='equipos', null=True, blank=True)
    cliente = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='equipos', null=True, blank=True)

    def marcar_mantenimiento(self):
        """Marca el equipo como en mantenimiento"""
        self.estado = 'mantenimiento'
        self.save()

    def marcar_fuera_servicio(self):
        """Marca el equipo como fuera de servicio"""
        self.estado = 'fuera_servicio'
        self.save()

    def marcar_activo(self):
        """Marca el equipo como activo"""
        self.estado = 'activo'
        self.save()

    def historial_mantenimientos(self):
        """Retorna el historial de mantenimientos del equipo"""
        # Esto se implementará cuando creemos la app maintenance
        pass

    def __str__(self):
        return f"{self.marca} {self.modelo} - {self.numero_serie}"

    class Meta:
        verbose_name = "Equipo"
        verbose_name_plural = "Equipos"
        ordering = ['marca', 'modelo']
