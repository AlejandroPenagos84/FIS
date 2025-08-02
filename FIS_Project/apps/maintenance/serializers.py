from rest_framework import serializers
from .models import Mantenimiento, OrdenTrabajo, Cotizacion, ReporteServicio


class MantenimientoSerializer(serializers.ModelSerializer):
    # equipo_info = serializers.SerializerMethodField()
    # usuario_name = serializers.CharField(source='usuario.username', read_only=True)
    # tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    # estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    class Meta:
        model = Mantenimiento
        fields = '__all__'
        
    def get_equipo_info(self, obj):
        if obj.equipo:
            return {
                'id': obj.equipo.id,
                'numero_serie': obj.equipo.numero_serie,
                'marca': obj.equipo.marca,
                'modelo': obj.equipo.modelo
            }
        return None


class OrdenTrabajoSerializer(serializers.ModelSerializer):
    mantenimiento_info = serializers.SerializerMethodField()
    # usuario_asignado_name = serializers.CharField(source='usuario_asignado.username', read_only=True)
    # estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    class Meta:
        model = OrdenTrabajo
        fields = '__all__'
        
    def get_mantenimiento_info(self, obj):
        if obj.mantenimiento:
            return {
                'id': obj.mantenimiento.id,
                'tipo': obj.mantenimiento.get_tipo_display(),
                'equipo': str(obj.mantenimiento.equipo) if obj.mantenimiento.equipo else None
            }
        return None


class CotizacionSerializer(serializers.ModelSerializer):
    mantenimiento_info = serializers.SerializerMethodField()
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    class Meta:
        model = Cotizacion
        fields = '__all__'
        
    def get_mantenimiento_info(self, obj):
        if obj.mantenimiento:
            return {
                'id': obj.mantenimiento.id,
                'tipo': obj.mantenimiento.get_tipo_display(),
                'equipo': str(obj.mantenimiento.equipo) if obj.mantenimiento.equipo else None
            }
        return None


class ReporteServicioSerializer(serializers.ModelSerializer):
    mantenimiento_info = serializers.SerializerMethodField()
    fecha_creacion = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    creado_por_name = serializers.CharField(source='creado_por.username', read_only=True)
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    class Meta:
        model = ReporteServicio
        fields = '__all__'
        
    def get_mantenimiento_info(self, obj):
        if obj.mantenimiento:
            return {
                'id': obj.mantenimiento.id,
                'tipo': obj.mantenimiento.get_tipo_display(),
                'equipo': str(obj.mantenimiento.equipo) if obj.mantenimiento.equipo else None
            }
        return None
