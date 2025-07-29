from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, Count
from django.utils import timezone

from .models import Mantenimiento, OrdenTrabajo, Cotizacion, ReporteServicio
from .serializers import MantenimientoSerializer, OrdenTrabajoSerializer, CotizacionSerializer, ReporteServicioSerializer
from apps.users.permissions import IsAdministradorOrIngeniero, IsIngeniero

# Create your views here.

class MantenimientoViewSet(ModelViewSet):
    """
    ViewSet para gestionar mantenimientos
    """
    queryset = Mantenimiento.objects.all()
    serializer_class = MantenimientoSerializer
    permission_classes = [IsAdministradorOrIngeniero]
    
    def get_queryset(self):
        queryset = Mantenimiento.objects.select_related('equipo', 'usuario')
        
        # Filtros
        estado = self.request.query_params.get('estado', None)
        tipo = self.request.query_params.get('tipo', None)
        equipo = self.request.query_params.get('equipo', None)
        
        if estado:
            queryset = queryset.filter(estado=estado)
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        if equipo:
            queryset = queryset.filter(equipo__id=equipo)
            
        return queryset
    
    @action(detail=True, methods=['post'])
    def iniciar(self, request, pk=None):
        """Iniciar mantenimiento"""
        mantenimiento = self.get_object()
        mantenimiento.iniciar()
        return Response({'status': 'Mantenimiento iniciado'})
    
    @action(detail=True, methods=['post'])
    def finalizar(self, request, pk=None):
        """Finalizar mantenimiento"""
        mantenimiento = self.get_object()
        mantenimiento.finalizar()
        return Response({'status': 'Mantenimiento finalizado'})
    
    @action(detail=True, methods=['post'])
    def cancelar(self, request, pk=None):
        """Cancelar mantenimiento"""
        mantenimiento = self.get_object()
        mantenimiento.cancelar()
        return Response({'status': 'Mantenimiento cancelado'})


class OrdenTrabajoViewSet(ModelViewSet):
    """
    ViewSet para gestionar órdenes de trabajo
    """
    queryset = OrdenTrabajo.objects.all()
    serializer_class = OrdenTrabajoSerializer
    permission_classes = [IsAdministradorOrIngeniero]
    
    @action(detail=True, methods=['post'])
    def asignar(self, request, pk=None):
        """Asignar orden de trabajo a un usuario"""
        orden = self.get_object()
        usuario_id = request.data.get('usuario_id')
        
        if not usuario_id:
            return Response({'error': 'usuario_id requerido'}, status=status.HTTP_400_BAD_REQUEST)
        
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        try:
            usuario = User.objects.get(id=usuario_id)
            orden.asignar(usuario)
            return Response({'status': 'Orden asignada correctamente'})
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


class CotizacionViewSet(ModelViewSet):
    """
    ViewSet para gestionar cotizaciones
    """
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionSerializer
    permission_classes = [IsAdministradorOrIngeniero]
    
    @action(detail=True, methods=['post'])
    def aprobar(self, request, pk=None):
        """Aprobar cotización"""
        cotizacion = self.get_object()
        cotizacion.aprobar()
        return Response({'status': 'Cotización aprobada'})
    
    @action(detail=True, methods=['post'])
    def rechazar(self, request, pk=None):
        """Rechazar cotización"""
        cotizacion = self.get_object()
        cotizacion.rechazar()
        return Response({'status': 'Cotización rechazada'})


class ReporteServicioViewSet(ModelViewSet):
    """
    ViewSet para gestionar reportes de servicio
    """
    queryset = ReporteServicio.objects.all()
    serializer_class = ReporteServicioSerializer
    permission_classes = [IsAdministradorOrIngeniero]
    
    @action(detail=True, methods=['post'])
    def enviar(self, request, pk=None):
        """Enviar reporte"""
        reporte = self.get_object()
        reporte.enviar()
        return Response({'status': 'Reporte enviado'})
    
    @action(detail=True, methods=['post'])
    def aprobar(self, request, pk=None):
        """Aprobar reporte"""
        reporte = self.get_object()
        reporte.aprobar()
        return Response({'status': 'Reporte aprobado'})
