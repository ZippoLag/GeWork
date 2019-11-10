import io
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from rest_framework import generics
from .models import Espacio, Prestacion, Cowork, Puesto, Pais, Provincia, Localidad
from .serializers import EspacioSerializer, PrestacionSerializer, CoworkSerializer, PaisSerializer, ProvinciaSerializer, LocalidadSerializer
from django.shortcuts import get_object_or_404, render

# TODO: crear vistas para servir los objetos serializados (y demás)

# Devuelve lista de Espacios
class EspacioListCreate(generics.ListCreateAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer

# Devuelve lista de Espacios pertenecientes a un Cowork.
# Las Prestaciones de cada Espacio.
# Los Puestos de cada Espacio.
def load_espacios(request, id):
    cowork_id = Cowork.objects.get(pk=id)
    espacios = Espacio.objects.filter(cowork=cowork_id)

    ids_espacios = []
    for espacio in espacios:
        ids_espacios.append(espacio.pk)

    puestos = Puesto.objects.filter(espacio__in=ids_espacios)

    return render(request, 'frontend_bundle/espacios_de_cowork.html', {'espacios': espacios, 'puestos': puestos})

# Devuelve detalles de Usuario Logueado
def get_detalles_usuario(request):
    # TODO: obtener la instancia de Usuario (o Perfil, o como le llamemos) relacionada al usuario autenticado por django y enviar _sólo_ los datos que necesitemos en el frontend
    response = JsonResponse({
        'username': request.user.username
    })

    return response

# Devuelve un Espacio
def EspacioDetail(request, id):
    try:
        espacio = Espacio.objects.get(pk=id)
    except Espacio.DoesNotExist:
        raise Http404("Espacio does not exist")
    return render(request, 'frontend_bundle/detail-espacio.html', { 'espacio': espacio })

# Devuelve lista de Prestaciones
class PrestacionListCreate(generics.ListCreateAPIView):
    queryset = Prestacion.objects.all()
    serializer_class = PrestacionSerializer

# Devuelve una Prestacion
def PrestacionDetail(request, id):
    try:
        prestacion = Prestacion.objects.get(pk=id)
    except Prestacion.DoesNotExist:
        raise Http404("Prestacion does not exist")
    return render(request, 'frontend_bundle/detail-prestacion.html', { 'prestacion': prestacion })

# Devuelve lista de Coworks
class CoworkListCreate(generics.ListCreateAPIView):
    queryset = Cowork.objects.all()
    serializer_class = CoworkSerializer

# Devuelve un Cowork
def CoworkDetail(request, id):
    try:
        cowork = Cowork.objects.get(pk=id)
    except Cowork.DoesNotExist:
        raise Http404("Cowork does not exist")
    return render(request, 'frontend_bundle/detail-cowork.html', { 'cowork': cowork })

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
