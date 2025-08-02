from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from apps.equipment.models import Equipo

User = get_user_model()

# Create your models here.

class Mantenimiento(models.Model):
    TIPO_CHOICES = [
        ('Preventivo', 'Preventivo'),
        ('Correctivo', 'Correctivo'),
        ('Predictivo', 'Predictivo'),
    ]
    
    ESTADO_CHOICES = [
        ('Registrado', 'Registrado'),
        ('Programado', 'Programado'),
        ('En Ejecucion', 'En Ejecucion'),
        ('Completado', 'Completado'),
        ('Cancelado', 'Cancelado'),
    ]
    
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='Registrado')
    # fecha_programada = models.DateTimeField()
    # fecha_inicio = models.DateTimeField(null=True, blank=True)
    # fecha_fin = models.DateTimeField(null=True, blank=True)
    # descripcion = models.TextField(blank=True, null=True)
    # observaciones = models.TextField(blank=True, null=True)
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE, related_name='mantenimientos', null=True, blank=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mantenimientos_asignados', null=True, blank=True)

    def programar(self):
        """Programa el mantenimiento"""
        self.estado = 'Programado'
        # self.fecha_programada = timezone.now()
        self.save()
    def iniciar(self):
        """Inicia el mantenimiento"""
        self.estado = 'En_Ejecucion'
        # self.fecha_inicio = timezone.now()
        self.save()

    def finalizar(self):
        """Finaliza el mantenimiento"""
        self.estado = 'Completado'
        # self.fecha_fin = timezone.now()
        self.save()

    def cancelar(self):
        """Cancela el mantenimiento"""
        self.estado = 'Cancelado'
        self.save()

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.equipo} "
    # - {self.fecha_programada.strftime('%d/%m/%Y')}

    class Meta:
        verbose_name = "Mantenimiento"
        verbose_name_plural = "Mantenimientos"
        ordering = ['-tipo', '-estado']


class OrdenTrabajo(models.Model):
    ESTADO_CHOICES = [
        ('Generada', 'Generada'),
        ('Asignada', 'Asignada'),
        ('En Curso', 'En Curso'),
        ('Completada', 'Completada'),
        ('Cancelada', 'Cancelada'),
    ]

    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='Generada')
    # fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_asignacion = models.DateTimeField(null=True, blank=True)
    # fecha_completado = models.DateTimeField(null=True, blank=True)
    descripcion_trabajo = models.TextField()
    # materiales_utilizados = models.TextField(blank=True, null=True)
    # tiempo_estimado = models.DurationField(null=True, blank=True)
    # tiempo_real = models.DurationField(null=True, blank=True)
    mantenimiento = models.OneToOneField(Mantenimiento, on_delete=models.CASCADE, related_name='orden_trabajo', null=True, blank=True)
    usuario_asignado = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='ordenes_asignadas')

    def asignar(self, usuario):
        """Asigna la orden de trabajo a un usuario"""
        self.usuario_asignado = usuario
        self.estado = 'Asignada'
        self.fecha_asignacion = timezone.now()
        self.save()

    def iniciar(self):
        """Inicia la orden de trabajo"""
        self.estado = 'En Curso'
        self.save()

    def completar(self):
        """Completa la orden de trabajo"""
        self.estado = 'Completada'
        # self.fecha_completado = timezone.now()
        self.save()

    def cancelar(self):
        """Cancela la orden de trabajo"""
        self.estado = 'Cancelada'
        self.save()

    def __str__(self):
        return f"OT-{self.id} - {self.mantenimiento.equipo} - {self.get_estado_display()}"

    class Meta:
        verbose_name = "Orden de Trabajo"
        verbose_name_plural = "Órdenes de Trabajo"
        ordering = ['-fecha_asignacion']


class Cotizacion(models.Model):
    ESTADO_CHOICES = [
        ('Generada', 'Generada'),
        ('Incompleta', 'Incompleta'),
        ('Completa', 'Completa')
    ]
    
    # numero_cotizacion = models.CharField(max_length=50, unique=True)
    fecha = models.DateTimeField(auto_now_add=True)
    # fecha_vencimiento = models.DateField()
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='borrador')
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    impuestos = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    # observaciones = models.TextField(blank=True, null=True)
    mantenimiento = models.OneToOneField(Mantenimiento, on_delete=models.CASCADE, related_name='cotizacion', null=True, blank=True)

    def calcular_total(self):
        """Calcula el total de la cotización"""
        self.total = self.subtotal + self.impuestos
        self.estado = 'Incompleta'
        self.save()

    def completar(self):
        """Aprueba la cotización"""
        self.estado = 'Completa'
        self.save()

    def __str__(self):
        return f"Cotización  - {self.mantenimiento.equipo}"
        # {self.numero_cotizacion}
    class Meta:
        verbose_name = "Cotización"
        verbose_name_plural = "Cotizaciones"
        ordering = ['-fecha']


class ReporteServicio(models.Model):
    ESTADO_CHOICES = [
        ('No Emitido', 'No Emitido'),
        ('Emitido', 'Emitido'),
        ('Revisado', 'Revisado'),
        ('Aprobado', 'Aprobado'),
        ('No Aprobado', 'No Aprobado')
    ]
    
    # numero_reporte = models.CharField(max_length=50, unique=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='borrador')
    contenido = models.TextField()
    # resumen_trabajo = models.TextField()
    # recomendaciones = models.TextField(blank=True, null=True)
    # fecha_emision = models.DateTimeField(auto_now_add=True)
    fecha_emision = models.DateTimeField(blank=True, null=True)
    # fecha_envio = models.DateTimeField(null=True, blank=True)
    # fecha_aprobacion = models.DateTimeField(null=True, blank=True)
    mantenimiento = models.OneToOneField(Mantenimiento, on_delete=models.CASCADE, related_name='reporte_servicio', null=True, blank=True)
    creado_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reportes_creados', null=True, blank=True)

    def emitir(self):
        """Emite el reporte"""
        self.estado = 'Emitido'
        self.fecha_emision = timezone.now()
        self.save()

    def aprobar(self):
        """Aprueba el reporte"""
        self.estado = 'Aprobado'
        # self.fecha_aprobacion = timezone.now()
        self.save()

    def revisar(self):
        """Revisa el reporte"""
        self.estado = 'Revisado'
        self.fecha_revision = timezone.now()
        self.save()

    def __str__(self):
        if self.mantenimiento and self.mantenimiento.equipo:
            return f"Reporte {self.mantenimiento.equipo} - {self.get_estado_display()}"
        # Si no hay mantenimiento asociado, retornar un mensaje genérico
        if not self.mantenimiento:
            return "Reporte sin mantenimiento asociado"

    class Meta:
        verbose_name = "Reporte de Servicio"
        verbose_name_plural = "Reportes de Servicio"
        ordering = ['-fecha_emision']
