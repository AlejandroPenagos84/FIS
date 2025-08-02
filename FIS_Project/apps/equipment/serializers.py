from rest_framework import serializers
from .models import AreaServicio, TipoEquipo, Equipo


class AreaServicioSerializer(serializers.ModelSerializer):
    sede_name = serializers.CharField(source='sede.name', read_only=True)
    equipos_count = serializers.SerializerMethodField()
    
    class Meta:
        model = AreaServicio
        fields = '__all__'
        
    def get_equipos_count(self, obj):
        return obj.equipos.count()


class TipoEquipoSerializer(serializers.ModelSerializer):
    equipos_count = serializers.SerializerMethodField()
    
    class Meta:
        model = TipoEquipo
        fields = '__all__'
        
    def get_equipos_count(self, obj):
        return obj.equipos.count()


class EquipoSerializer(serializers.ModelSerializer):
    tipo_equipo_name = serializers.CharField(source='tipo_equipo.name', read_only=True)
    area_servicio_name = serializers.CharField(source='area_servicio.name', read_only=True)
    cliente_name = serializers.CharField(source='cliente.name', read_only=True)
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    class Meta:
        model = Equipo
        fields = '__all__'
