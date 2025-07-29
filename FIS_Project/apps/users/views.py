from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.contrib.auth import get_user_model

from .serializers import UsersSerializerModel

User = get_user_model()

# Create your views here.
class UsersViewSet(ModelViewSet):
    serializer_class = UsersSerializerModel
    
    def get_queryset(self):
        return User.objects.all()