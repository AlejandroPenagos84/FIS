from rest_framework import serializers
from .models import User

class UsersSerializerModel(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password"]
    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        return user