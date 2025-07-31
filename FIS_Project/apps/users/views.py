from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
# from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.contrib.auth import get_user_model

from .serializers import UsersSerializerModel
from .permissions import IsAdministradorOrIngeniero

User = get_user_model()

# Create your views here.
class UsersViewSet(ModelViewSet):
    serializer_class = UsersSerializerModel
    permission_classes = [IsAdministradorOrIngeniero]  # Ya incluye IsAuthenticated
    
    def get_queryset(self):
        return User.objects.all()
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(self.get_serializer(user).data, status=201) 