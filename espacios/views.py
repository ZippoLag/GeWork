import io
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from rest_framework import generics
from .models import Espacio, Prestacion, Cowork, Puesto, Pais, Provincia, Localidad, Contrato
from .serializers import EspacioSerializer, PrestacionSerializer, CoworkSerializer, PaisSerializer, ProvinciaSerializer, LocalidadSerializer, PuestoSerializer, ContratoSerializer
from django.shortcuts import get_object_or_404, render

# TODO: crear vistas para servir los objetos serializados (y demás)

# Devuelve lista de Espacios
class EspacioListCreate(generics.ListCreateAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer

# Devuelve detalles de Usuario Logueado
def get_detalles_usuario(request):
    # TODO: obtener la instancia de Usuario (o Perfil, o como le llamemos) relacionada al usuario autenticado por django y enviar _sólo_ los datos que necesitemos en el frontend
    response = JsonResponse({
        'username': request.user.username
    })

    return response

# Devuelve un Espacio y sus Prestaciones
def espacioDetail(request, id):
    espacio = Espacio.objects.filter(pk=id)
    data = EspacioSerializer(espacio, many=True).data
    return JsonResponse(data, safe=False)

# Devuelve lista de Prestaciones
class PrestacionListCreate(generics.ListCreateAPIView):
    queryset = Prestacion.objects.all()
    serializer_class = PrestacionSerializer

# Devuelve una Prestacion
def prestacionDetail(request, id):
    prestacion = Prestacion.objects.filter(pk=id)
    data = PrestacionSerializer(prestacion, many=True).data
    return JsonResponse(data, safe=False)

# Devuelve lista de Coworks
class CoworkListCreate(generics.ListCreateAPIView):
    queryset = Cowork.objects.all()
    serializer_class = CoworkSerializer

# Devuelve un Cowork
def coworkDetail(request, id):
    cowork = Cowork.objects.filter(pk=id)
    data = CoworkSerializer(cowork, many=True).data
    return JsonResponse(data, safe=False)

# Devuelve lista de Paises
class PaisListCreate(generics.ListCreateAPIView):
    queryset = Pais.objects.all()
    serializer_class = PaisSerializer

# Devuelve lista de Provincias
class ProvinciaListCreate(generics.ListCreateAPIView):
    queryset = Provincia.objects.all()
    serializer_class = ProvinciaSerializer

# Devuelve lista de Localidades
class LocalidadListCreate(generics.ListCreateAPIView):
    queryset = Localidad.objects.all()
    serializer_class = LocalidadSerializer

# Devuelve un Puesto y datos del Espacio al que pertenece el mismo, incluyendo Prestaciones y datos del Cowork al que pertenece
def puestoDetail(request, id):
    puesto = Puesto.objects.filter(pk=id)
    data = PuestoSerializer(puesto, many=True).data
    return JsonResponse(data, safe=False)

# Devuelve lista de Contratos de un Usuario
def contratosUsuario(request):
    usr = request.user.pk
    contratos = Contrato.objects.filter(usuario_id=usr)
    data = ContratoSerializer(contratos, many=True).data
    return JsonResponse(data, safe=False)

