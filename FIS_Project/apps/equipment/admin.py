from django.contrib import admin
from .models import AreaServicio, TipoEquipo, Equipo

class AreaServicioAdmin(admin.ModelAdmin):
    list_display = ('name', 'sede')
    search_fields = ('name',)

class TipoEquipoAdmin(admin.ModelAdmin):
    list_display = ('name', 'valor_unitario')
    search_fields = ('name',)

class EquipoAdmin(admin.ModelAdmin):
    list_display = ('numero_serie', 'estado', 'marca', 'modelo', 'tipo_equipo', 'area_servicio', 'cliente')
    search_fields = ('numero_serie', 'marca', 'modelo')
    list_filter = ('estado', 'tipo_equipo', 'area_servicio')

admin.site.register(AreaServicio, AreaServicioAdmin)
admin.site.register(TipoEquipo, TipoEquipoAdmin)
admin.site.register(Equipo, EquipoAdmin)
