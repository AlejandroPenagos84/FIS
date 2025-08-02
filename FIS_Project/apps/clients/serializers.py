from rest_framework import serializers
from .models import Client, Sede


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class SedeSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='cliente.name', read_only=True)

    class Meta:
        model = Sede
        fields = '__all__'
