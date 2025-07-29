from django.contrib import admin
from .models import Mantenimiento, OrdenTrabajo, Cotizacion, ReporteServicio
# Register your models here.
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('equipo', 'fecha_inicio', 'fecha_fin', 'estado')
    search_fields = ('equipo__nombre', 'estado')

class WorkOrderAdmin(admin.ModelAdmin):
    list_display = ('mantenimiento', 'usuario_asignado', 'estado')
    search_fields = ('mantenimiento__equipo__nombre', 'usuario_asignado__username', 'estado')

class QuotationAdmin(admin.ModelAdmin):
    list_display = ('numero_cotizacion', 'estado', 'fecha_vencimiento')
    search_fields = ('numero_cotizacion', 'estado')

class ServiceReportAdmin(admin.ModelAdmin):
    list_display = ('mantenimiento', 'fecha_creacion', 'estado')
    search_fields = ('mantenimiento__equipo__nombre', 'estado')

admin.site.register(Mantenimiento, MaintenanceAdmin)
admin.site.register(OrdenTrabajo, WorkOrderAdmin)
admin.site.register(Cotizacion, QuotationAdmin)
admin.site.register(ReporteServicio, ServiceReportAdmin)