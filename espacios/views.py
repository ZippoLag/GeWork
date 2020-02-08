import io
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from rest_framework import generics
from django.contrib.auth.models import User
from .models import Espacio, Prestacion, Cowork, Puesto, Pais, Provincia, Localidad, Contrato, Pago
from .serializers import EspacioSerializer, PrestacionSerializer, CoworkSerializer, PaisSerializer, ProvinciaSerializer, LocalidadSerializer, PuestoSerializer, ContratoSerializer, PagoSerializer, ContratoEvaluacionSerializer, ContratoCreateSerializer, PagoCreateSerializer
from django.shortcuts import get_object_or_404, render
from django.conf import settings
from rest_framework.generics import CreateAPIView
from datetime import datetime

# TODO: crear vistas para servir los objetos serializados (y demás)

# Devuelve lista de Espacios
class EspacioListCreate(generics.ListCreateAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer

# Devuelve detalles de Usuario Logueado
def get_detalles_usuario(request):
    # TODO: obtener la instancia de Usuario (o Perfil, o como le llamemos) relacionada al usuario autenticado por django y enviar _sólo_ los datos que necesitemos en el frontend

    user = request.user
    if settings.DEBUG and ((not request.user) or request.user.is_anonymous or not request.user.is_authenticated):
        user = User()
        user.username = 'N/A'
        user.nombres = 'N/A'
        user.iniciales = 'N/A'
    else:
        user.nombres = f'{user.first_name} {user.last_name}' if user.first_name or user.last_name else user.username
        user.iniciales = ''.join(nombre[:1] for nombre in user.nombres.upper().split(' '))

    response = JsonResponse({
        'username': user.username,
        'iniciales': user.iniciales,
        'nombres': user.nombres
    })

    return response

# Devuelve un Espacio y sus Prestaciones
def espacioDetail(request, id):
    espacio = Espacio.objects.filter(pk=id)
    data = EspacioSerializer(espacio, many=True).data
    return JsonResponse(data, safe=(not settings.DEBUG))

# Devuelve lista de Prestaciones
class PrestacionListCreate(generics.ListCreateAPIView):
    queryset = Prestacion.objects.all()
    serializer_class = PrestacionSerializer

# Devuelve una Prestacion
def prestacionDetail(request, id):
    prestacion = Prestacion.objects.filter(pk=id)
    data = PrestacionSerializer(prestacion, many=True).data
    return JsonResponse(data, safe=(not settings.DEBUG))

# Devuelve lista de Coworks
class CoworkListCreate(generics.ListCreateAPIView):
    queryset = Cowork.objects.all()
    serializer_class = CoworkSerializer

# Devuelve un Cowork
def coworkDetail(request, id):
    cowork = Cowork.objects.filter(pk=id)
    data = CoworkSerializer(cowork, many=True).data
    return JsonResponse(data, safe=(not settings.DEBUG))

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

# Devuelve una Localidad
class LocalidadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Localidad.objects.all()
    serializer_class = LocalidadSerializer


# Devuelve un Puesto y datos del Espacio al que pertenece el mismo, incluyendo Prestaciones y datos del Cowork al que pertenece
def puestoDetail(request, id):
    puesto = Puesto.objects.filter(pk=id)
    data = PuestoSerializer(puesto, many=True).data
    return JsonResponse(data, safe=(not settings.DEBUG))

# Devuelve lista de Contratos de un Usuario
def contratosUsuario(request):
    usr = request.user.pk
    contratos = Contrato.objects.filter(usuario_id=usr)
    data = ContratoSerializer(contratos, many=True).data
    return JsonResponse(data, safe=(not settings.DEBUG))

# Devuelve Pago de un Contrato de un Usuario
def contratoUsuario(request, id):
    usr = request.user.pk
    cont = Contrato.objects.filter(usuario_id=usr, pk=id)
    pagos = Pago.objects.filter(contrato=cont[0])
    data = PagoSerializer(pagos, many=True).data
    return JsonResponse(data, safe=(not settings.DEBUG))

# Graba puntuacion y reseña de Contrato
class ContratoEvaluacion(generics.UpdateAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoEvaluacionSerializer

# Crea nuevo Contrato
class ContratoCreate(CreateAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoCreateSerializer

# Crea nuevo Pago
class PagoCreate(CreateAPIView):
    queryset = Pago.objects.all()
    serializer_class = PagoCreateSerializer

# Devuelve lista de Coworks con Espacios Disponibles
# Donde:    Espacio.es_sala = false
#           Espacio.cowork.localidad = localidad
#           Barrer todos los Contratos de los Coworks
#           de la localidad, fecha y turno ingresados.
#           Considerar que si se seleccionó turno Tarde,
#           por ejemplo, también se deben considerar los
#           Contratos con turno Completo para esa fecha.
# Guardar:  Lista de Puestos sin Contratos.
# Retornar: Datos de Coworks.
def puestos_vacantes(request, id_localidad, anio, mes, dia, turno):
    # TODO: (SRV) por cómo quedaron armados los serializers, estamos enviando data duplicada, podríamos hacer la llamada más eficiente si para las relaciones enviáramos sólo las FK y re-construyéramos los objetos en el frontend (de la misma forma que se reciben los Paises/Provincias/Localidades - ver código en index.js)
    fecha = datetime(anio, mes, dia, 8, 0, 0)
    turno = turno or 'c'
    loc = get_object_or_404(Localidad, pk=id_localidad)

    coworks = Cowork.objects.filter(localidad=loc)
    espacios = Espacio.objects.filter(cowork__in=coworks.all()).filter(es_sala=False)
    puestos = Puesto.objects.filter(espacio__in=espacios.all())

    contratos = Contrato.objects.filter(puesto__in=puestos.all()).filter(turno__in=[turno, 'c']).filter(inicio_contrato=fecha)

    ids_puestos_contratados = list(set([c.puesto.pk for c in contratos]))

    puestos_libres = Puesto.objects.exclude(id_puesto__in=ids_puestos_contratados)

    data = PuestoSerializer(puestos_libres, many=True).data

    return JsonResponse(data, safe=(not settings.DEBUG))

def googlemapsapikey(request):
    return JsonResponse({'googleMapsApiKey':settings.GOOGLE_MAPS_API_KEY}, safe=(not settings.DEBUG))
