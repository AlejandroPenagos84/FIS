from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from .models import Client, Sede
from .serializers import ClientSerializer, SedeSerializer
from apps.equipment.serializers import AreaServicioSerializer
from apps.users.permissions import IsAdministradorOrIngeniero, IsAdministrador

# Create your views here.

class ClientViewSet(ModelViewSet):
    """
    ViewSet para gestionar clientes
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAdministradorOrIngeniero]
    
    @action(detail=True, methods=['get'])
    def sedes(self, request, pk=None):
        """
        Obtiene las sedes de un cliente específico
        """
        client = self.get_object()
        # print(f"Obteniendo sedes para el cliente: {client.name}")
        sedes = client.sedes.all()
        serializer = SedeSerializer(sedes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'])
    def areas_servicio(self, request, pk=None):
        """
        Obtiene todas las áreas de servicio de todas las sedes de un cliente específico
        Estructura: [{"sede": {...}, "areas_servicio": [...]}]
        """
        client = self.get_object()
        result = []
        
        for sede in client.sedes.all():
            areas_servicio = sede.areas_servicio.all()
            sede_data = {
                'sede': SedeSerializer(sede).data,
                'areas_servicio': AreaServicioSerializer(areas_servicio, many=True).data
            }
            result.append(sede_data)
        
        return Response(result, status=status.HTTP_200_OK)
            


class SedeViewSet(ModelViewSet):
    """
    ViewSet para gestionar sedes
    """
    queryset = Sede.objects.all()
    serializer_class = SedeSerializer
    permission_classes = [IsAdministradorOrIngeniero]
    
    # def get_queryset(self):
    #     queryset = Sede.objects.prefetch_related('cliente')
    #     search = self.request.query_params.get('search', None)
        
    #     if search:
    #         queryset = queryset.filter(name__icontains=search)
    #     return queryset

    @action(detail=True, methods=['get'])
    def areas_servicio(self, request, pk=None):
        """
        Obtiene las áreas de servicio de una sede específica
        """
        sede = self.get_object()
        print(f"Obteniendo áreas de servicio para la sede: {sede.name}")
        areas_servicio = sede.areas_servicio.all()
        serializer = AreaServicioSerializer(areas_servicio, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
