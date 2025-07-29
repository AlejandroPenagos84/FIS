from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from apps.equipment.models import Equipo

User = get_user_model()

# Create your models here.

class Mantenimiento(models.Model):
    TIPO_CHOICES = [
        ('preventivo', 'Preventivo'),
        ('correctivo', 'Correctivo'),
        ('predictivo', 'Predictivo'),
    ]
    
    ESTADO_CHOICES = [
        ('programado', 'Programado'),
        ('en_proceso', 'En Proceso'),
        ('completado', 'Completado'),
        ('cancelado', 'Cancelado'),
    ]
    
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='programado')
    fecha_programada = models.DateTimeField()
    fecha_inicio = models.DateTimeField(null=True, blank=True)
    fecha_fin = models.DateTimeField(null=True, blank=True)
    descripcion = models.TextField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE, related_name='mantenimientos', null=True, blank=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mantenimientos_asignados', null=True, blank=True)

    def iniciar(self):
        """Inicia el mantenimiento"""
        self.estado = 'en_proceso'
        self.fecha_inicio = timezone.now()
        self.save()

    def finalizar(self):
        """Finaliza el mantenimiento"""
        self.estado = 'completado'
        self.fecha_fin = timezone.now()
        self.save()

    def cancelar(self):
        """Cancela el mantenimiento"""
        self.estado = 'cancelado'
        self.save()

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.equipo} - {self.fecha_programada.strftime('%d/%m/%Y')}"

    class Meta:
        verbose_name = "Mantenimiento"
        verbose_name_plural = "Mantenimientos"
        ordering = ['-fecha_programada']


class OrdenTrabajo(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('asignada', 'Asignada'),
        ('en_proceso', 'En Proceso'),
        ('completada', 'Completada'),
        ('cancelada', 'Cancelada'),
    ]
    
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_asignacion = models.DateTimeField(null=True, blank=True)
    fecha_completado = models.DateTimeField(null=True, blank=True)
    descripcion_trabajo = models.TextField()
    materiales_utilizados = models.TextField(blank=True, null=True)
    tiempo_estimado = models.DurationField(null=True, blank=True)
    tiempo_real = models.DurationField(null=True, blank=True)
    mantenimiento = models.OneToOneField(Mantenimiento, on_delete=models.CASCADE, related_name='orden_trabajo', null=True, blank=True)
    usuario_asignado = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='ordenes_asignadas')

    def asignar(self, usuario):
        """Asigna la orden de trabajo a un usuario"""
        self.usuario_asignado = usuario
        self.estado = 'asignada'
        self.fecha_asignacion = timezone.now()
        self.save()

    def iniciar(self):
        """Inicia la orden de trabajo"""
        self.estado = 'en_proceso'
        self.save()

    def completar(self):
        """Completa la orden de trabajo"""
        self.estado = 'completada'
        self.fecha_completado = timezone.now()
        self.save()

    def cancelar(self):
        """Cancela la orden de trabajo"""
        self.estado = 'cancelada'
        self.save()

    def __str__(self):
        return f"OT-{self.id} - {self.mantenimiento.equipo} - {self.get_estado_display()}"

    class Meta:
        verbose_name = "Orden de Trabajo"
        verbose_name_plural = "Órdenes de Trabajo"
        ordering = ['-fecha_creacion']


class Cotizacion(models.Model):
    ESTADO_CHOICES = [
        ('borrador', 'Borrador'),
        ('enviada', 'Enviada'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
    ]
    
    numero_cotizacion = models.CharField(max_length=50, unique=True)
    fecha = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateField()
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='borrador')
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    impuestos = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    observaciones = models.TextField(blank=True, null=True)
    mantenimiento = models.OneToOneField(Mantenimiento, on_delete=models.CASCADE, related_name='cotizacion', null=True, blank=True)

    def calcular_total(self):
        """Calcula el total de la cotización"""
        self.total = self.subtotal + self.impuestos
        self.save()

    def aprobar(self):
        """Aprueba la cotización"""
        self.estado = 'aprobada'
        self.save()

    def rechazar(self):
        """Rechaza la cotización"""
        self.estado = 'rechazada'
        self.save()

    def __str__(self):
        return f"Cotización {self.numero_cotizacion} - {self.mantenimiento.equipo}"

    class Meta:
        verbose_name = "Cotización"
        verbose_name_plural = "Cotizaciones"
        ordering = ['-fecha']


class ReporteServicio(models.Model):
    ESTADO_CHOICES = [
        ('borrador', 'Borrador'),
        ('enviado', 'Enviado'),
        ('aprobado', 'Aprobado'),
        ('revision', 'En Revisión'),
    ]
    
    numero_reporte = models.CharField(max_length=50, unique=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='borrador')
    contenido = models.TextField()
    resumen_trabajo = models.TextField()
    recomendaciones = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_envio = models.DateTimeField(null=True, blank=True)
    fecha_aprobacion = models.DateTimeField(null=True, blank=True)
    mantenimiento = models.OneToOneField(Mantenimiento, on_delete=models.CASCADE, related_name='reporte_servicio', null=True, blank=True)
    creado_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reportes_creados', null=True, blank=True)

    def enviar(self):
        """Envía el reporte"""
        self.estado = 'enviado'
        self.fecha_envio = timezone.now()
        self.save()

    def aprobar(self):
        """Aprueba el reporte"""
        self.estado = 'aprobado'
        self.fecha_aprobacion = timezone.now()
        self.save()

    def revisar(self):
        """Pone el reporte en revisión"""
        self.estado = 'revision'
        self.save()

    def __str__(self):
        return f"Reporte {self.numero_reporte} - {self.mantenimiento.equipo}"

    class Meta:
        verbose_name = "Reporte de Servicio"
        verbose_name_plural = "Reportes de Servicio"
        ordering = ['-fecha_creacion']
