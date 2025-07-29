from django.contrib import admin
from .models import Mantenimiento, OrdenTrabajo, Cotizacion, ReporteServicio
# Register your models here.
class MantenimientoAdmin(admin.ModelAdmin):
    list_display = ('equipo','estado', 'usuario')
    search_fields = ('equipo__nombre', 'estado')

class OrdenTrabajoAdmin(admin.ModelAdmin):
    list_display = ('mantenimiento', 'usuario_asignado', 'estado')
    search_fields = ('mantenimiento__equipo__nombre', 'usuario_asignado__username', 'estado')

class CotizacionAdmin(admin.ModelAdmin):
    list_display = ('estado', 'fecha', 'total')
    search_fields = ('estado',)

class ReporteServicioAdmin(admin.ModelAdmin):
    list_display = ('mantenimiento', 'fecha_emision', 'estado')
    search_fields = ('mantenimiento__equipo__nombre', 'estado')

admin.site.register(Mantenimiento, MantenimientoAdmin)
admin.site.register(OrdenTrabajo, OrdenTrabajoAdmin)
admin.site.register(Cotizacion, CotizacionAdmin)
admin.site.register(ReporteServicio, ReporteServicioAdmin)