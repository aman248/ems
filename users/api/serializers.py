from rest_framework import serializers
from users.models import Profile

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password',write_only = True})
    class Meta:
        model = Profile
        fields = 