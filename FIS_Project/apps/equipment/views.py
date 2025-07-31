from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, Count

from .models import AreaServicio, TipoEquipo, Equipo
from .serializers import AreaServicioSerializer, TipoEquipoSerializer, EquipoSerializer
from apps.users.permissions import IsAdministradorOrIngeniero, IsIngeniero

# Create your views here.

class AreaServicioViewSet(ModelViewSet):
    """
    ViewSet para gestionar áreas de servicio
    """
    queryset = AreaServicio.objects.all()
    serializer_class = AreaServicioSerializer
    permission_classes = [IsAdministradorOrIngeniero]
    
    def get_queryset(self):
        return AreaServicio.objects.select_related('sede').prefetch_related('equipos')


class TipoEquipoViewSet(ModelViewSet):
    """
    ViewSet para gestionar tipos de equipo
    """
    queryset = TipoEquipo.objects.all()
    serializer_class = TipoEquipoSerializer
    permission_classes = [IsAdministradorOrIngeniero]


class EquipoViewSet(ModelViewSet):
    """
    ViewSet para gestionar equipos
    """
    queryset = Equipo.objects.all()
    serializer_class = EquipoSerializer
    permission_classes = [IsAdministradorOrIngeniero]
    
    def get_queryset(self):
        queryset = Equipo.objects.select_related(
            'tipo_equipo', 'area_servicio', 'cliente'
        ).prefetch_related('mantenimientos')
        
        # Filtros
        estado = self.request.query_params.get('estado', None)
        cliente = self.request.query_params.get('cliente', None)
        tipo_equipo = self.request.query_params.get('tipo_equipo', None)
        search = self.request.query_params.get('search', None)
        
        if estado:
            queryset = queryset.filter(estado=estado)
        if cliente:
            queryset = queryset.filter(cliente__id=cliente)
        if tipo_equipo:
            queryset = queryset.filter(tipo_equipo__id=tipo_equipo)
        if search:
            queryset = queryset.filter(
                Q(numero_serie__icontains=search) |
                Q(marca__icontains=search) |
                Q(modelo__icontains=search)
            )
            
        return queryset
    
    @action(detail=True, methods=['post'])
    def marcar_mantenimiento(self, request, pk=None):
        """Marcar equipo como en mantenimiento"""
        equipo = self.get_object()
        equipo.marcar_mantenimiento()
        return Response({'status': 'Equipo marcado como en mantenimiento'})
    
    @action(detail=True, methods=['post'])
    def marcar_activo(self, request, pk=None):
        """Marcar equipo como activo"""
        equipo = self.get_object()
        equipo.marcar_activo()
        return Response({'status': 'Equipo marcado como activo'})
    
    @action(detail=True, methods=['post'])
    def marcar_fuera_servicio(self, request, pk=None):
        """Marcar equipo como fuera de servicio"""
        equipo = self.get_object()
        equipo.marcar_fuera_servicio()
        return Response({'status': 'Equipo marcado como fuera de servicio'})
    
    @action(detail=False, methods=['get'])
    def estadisticas(self, request):
        """Obtener estadísticas de equipos"""
        stats = Equipo.objects.aggregate(
            total=Count('id'),
            activos=Count('id', filter=Q(estado='activo')),
            en_mantenimiento=Count('id', filter=Q(estado='mantenimiento')),
            fuera_servicio=Count('id', filter=Q(estado='fuera_servicio'))
        )
        return Response(stats)
