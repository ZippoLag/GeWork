from rest_framework import serializers
from .models import User, PerfilDeUsuario, Pais, Provincia, Localidad, Pago, Prestacion, Cowork, Contrato, Espacio, Puesto
#from django.contrib.auth.models import Group

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
        # TODO: ver cómo hacer para que se envíe como número y no haya que hacer un Number.parse en el JS que lo recibe
        model = Espacio
        fields = ('id_espacio', 'nombre_espacio', 'ubicacion_espacio', 'es_sala', 'cowork', 'prestaciones', 'precioMJ_espacio', 'precioJC_espacio')

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
        fields = ('id_pago', 'fecha_pago', 'medio_pago', 'idext_pago', 'importe_pago', 'contrato')

class ContratoEvaluacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contrato
        fields = ('id_contrato', 'estrellas_contrato', 'resenia_contrato')

class ContratoCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contrato
        fields = ('turno', 'inicio_contrato', 'fin_contrato', 'importe_contrato', 'usuario', 'puesto')

class PagoCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pago
        fields = ('fecha_pago', 'medio_pago', 'idext_pago', 'importe_pago', 'contrato')

class CoworkCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cowork
        fields = ('nombre_cowork', 'direccion_cowork', 'inicioTM_cowork', 'finTM_cowork', 'inicioTT_cowork', 'finTT_cowork', 'lat', 'lng', 'localidad', 'estado')

class EspacioCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Espacio
        fields = ('nombre_espacio', 'precioMJ_espacio', 'precioJC_espacio', 'ubicacion_espacio', 'es_sala', 'cowork', 'prestaciones')

class PuestoCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Puesto
        fields = ('ubicacion_puesto', 'espacio', 'capacidad')

class PerfilDeUsuarioSignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = PerfilDeUsuario
        fields = ('dni_usuario', 'linkedin_usuario')
"""
class CoadminSignUpViewSerializer(serializers.ModelSerializer):
    PerfilDeUsuario = PerfilDeUsuarioSignUpSerializer(read_only=False, many=False)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'PerfilDeUsuario')

    def create(self, validated_data):
        PerfilDeUsuario_data = validated_data.pop('PerfilDeUsuario')
        user = User.objects.create(**validated_data)
        PerfilDeUsuario.objects.create(user=user,    **PerfilDeUsuario_data)
        group = Group.objects.get(name='Administradores de Coworks')
        user.groups.add(group)

        return user

class ClientSignUpViewSerializer(serializers.ModelSerializer):
    PerfilDeUsuario = PerfilDeUsuarioSignUpSerializer(read_only=False, many=False)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'PerfilDeUsuario')

    def create(self, validated_data):
        PerfilDeUsuario_data = validated_data.pop('PerfilDeUsuario')
        user = User.objects.create(**validated_data)
        PerfilDeUsuario.objects.create(user=user,    **PerfilDeUsuario_data)
        group = Group.objects.get(name='Clientes  de GeWork')
        user.groups.add(group)

        return user
"""