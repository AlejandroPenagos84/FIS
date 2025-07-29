from rest_framework import serializers
from .models import Client, Sede


class ClientSerializer(serializers.ModelSerializer):
    sede_name = serializers.CharField(source='sede.name', read_only=True)
    
    class Meta:
        model = Client
        fields = '__all__'


class SedeSerializer(serializers.ModelSerializer):
    clients_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Sede
        fields = '__all__'
        
    def get_clients_count(self, obj):
        return obj.clients.count()
