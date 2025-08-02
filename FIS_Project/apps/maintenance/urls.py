from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MantenimientoViewSet, OrdenTrabajoViewSet, CotizacionViewSet, ReporteServicioViewSet

router = DefaultRouter()
router.register(r'mantenimientos', MantenimientoViewSet, basename='mantenimientos')
router.register(r'ordenes-trabajo', OrdenTrabajoViewSet, basename='ordenes-trabajo')
router.register(r'cotizaciones', CotizacionViewSet, basename='cotizaciones')
router.register(r'reportes-servicio', ReporteServicioViewSet, basename='reportes-servicio')

urlpatterns = [
    path('', include(router.urls)),
]
