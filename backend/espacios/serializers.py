from rest_framework import serializers
from .models import Espacio

# TODO: crear serializers para servir los modelos mediante la API REST:

class EspacioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Espacio
        fields = '__all__'
