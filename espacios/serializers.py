from rest_framework import serializers
from .models import Espacio, Prestacion, Cowork

# TODO: crear serializers para servir los modelos mediante la API REST:

class EspacioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Espacio
        fields = '__all__'

class PrestacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestacion
        fields = '__all__'

class CoworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cowork
        fields = '__all__'