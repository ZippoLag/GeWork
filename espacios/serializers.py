from rest_framework import serializers
from .models import Espacio, Prestacion, Cowork, Puesto, Pais, Provincia, Localidad, Contrato, Pago

# TODO: crear serializers para servir los modelos mediante la API REST:

class CoworkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cowork
        fields = '__all__'

class PrestacionSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Prestacion

class EspacioSerializer(serializers.ModelSerializer):
    cowork = CoworkSerializer(read_only=True, many=False)
    prestaciones = PrestacionSerializer(read_only=True, many=True)

    class Meta:
        model = Espacio
        fields = ('id_espacio', 'nombre_espacio', 'ubicacion_espacio', 'es_sala', 'cowork', 'prestaciones')

class PuestoSerializer(serializers.ModelSerializer):
    espacio = EspacioSerializer(read_only=True, many=False)

    class Meta:
        model = Puesto
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

class ContratoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contrato
        fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
    contrato = ContratoSerializer(read_only=True, many=False)

    class Meta:
        model = Pago
        fields = '__all__'