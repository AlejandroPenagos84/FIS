from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, SedeViewSet

router = DefaultRouter()
router.register(r'clients', ClientViewSet, basename='clients')
router.register(r'sedes', SedeViewSet, basename='sedes')

urlpatterns = [
    path('', include(router.urls)),
]
