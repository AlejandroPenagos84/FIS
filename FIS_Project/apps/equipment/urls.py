from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AreaServicioViewSet, TipoEquipoViewSet, EquipoViewSet

router = DefaultRouter()
router.register(r'areas-servicio', AreaServicioViewSet, basename='areas-servicio')
router.register(r'tipos-equipo', TipoEquipoViewSet, basename='tipos-equipo')
router.register(r'equipos', EquipoViewSet, basename='equipos')

urlpatterns = [
    path('', include(router.urls)),
]
