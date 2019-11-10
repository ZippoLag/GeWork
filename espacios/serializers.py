from rest_framework import serializers
from .models import Espacio, Prestacion, Cowork, Pais, Provincia, Localidad

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

class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = '__all__'

class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincia
        fields = '__all__'

class LocalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidad
        fields = '__all__'
