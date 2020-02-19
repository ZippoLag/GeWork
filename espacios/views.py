import io
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic import View, CreateView
from rest_framework import generics
from django.contrib.auth.models import User
from .models import Espacio, Prestacion, Cowork, Puesto, Pais, Provincia, Localidad, Contrato, Pago
from .serializers import EspacioSerializer, PrestacionSerializer, CoworkSerializer, PaisSerializer, ProvinciaSerializer, LocalidadSerializer, PuestoSerializer, ContratoSerializer, PagoSerializer, ContratoEvaluacionSerializer, ContratoCreateSerializer, PagoCreateSerializer
from django.shortcuts import get_object_or_404, render, redirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics
from .models import User, PerfilDeUsuario, Pais, Provincia, Localidad, Pago, Prestacion, Cowork, Contrato, Espacio, Puesto
from .serializers import CoworkSerializer, PrestacionSerializer, EspacioSerializer, PuestoSerializer, PaisSerializer, ProvinciaSerializer, LocalidadSerializer, ContratoSerializer, PagoSerializer, ContratoEvaluacionSerializer, ContratoCreateSerializer, PagoCreateSerializer, CoworkCreateSerializer, EspacioCreateSerializer, PuestoCreateSerializer, CoadminSignUpViewSerializer, ClientSignUpViewSerializer
from rest_framework.generics import CreateAPIView
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

# TODO: crear vistas para servir los objetos serializados (y demás)

@login_required
def obtener_usuario_loggeado(request):
    user = request.user
    if (settings.DEBUG and settings.PERMITIR_LOGIN_FALSO) and ((not user) or user.is_anonymous or not user.is_authenticated):
        user = User.objects.get(username='admin')
    return user


# Devuelve lista de Espacios
class EspacioListCreate(generics.ListCreateAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer


# Devuelve detalles de Usuario Logueado
@login_required
def get_detalles_usuario(request):
    # TODO: obtener la instancia de Usuario (o Perfil, o como le llamemos) relacionada al usuario autenticado por django y enviar _sólo_ los datos que necesitemos en el frontend

    user = obtener_usuario_loggeado(request)

    user.nombres = f'{user.first_name} {user.last_name}' if user.first_name or user.last_name else user.username
    user.iniciales = ''.join(nombre[:1] for nombre in user.nombres.upper().split(' '))

    response = JsonResponse({
        'username': user.username,
        'iniciales': user.iniciales,
        'nombres': user.nombres,
        'firstName': user.first_name,
        'lastName': user.last_name,
        'email': user.email
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
    queryset = Cowork.objects.filter(estado='h')
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

# Devuelve una Localidad
class LocalidadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Localidad.objects.all()
    serializer_class = LocalidadSerializer


# Devuelve un Puesto y datos del Espacio al que pertenece el mismo, incluyendo Prestaciones y datos del Cowork al que pertenece
def puestoDetail(request, id):
    puesto = Puesto.objects.filter(pk=id)
    data = PuestoSerializer(puesto, many=True).data
    return JsonResponse(data, safe=False)

# Devuelve lista de Contratos de un Usuario
@login_required
def contratosUsuario(request):
    usr = request.user.pk
    contratos = Contrato.objects.filter(usuario_id=usr)
    data = ContratoSerializer(contratos, many=True).data
    return JsonResponse(data, safe=False)

# Devuelve Pago de un Contrato de un Usuario
@login_required
def contratoUsuario(request, id):
    usr = request.user.pk
    cont = Contrato.objects.filter(usuario_id=usr, pk=id)
    pagos = Pago.objects.filter(contrato=cont[0])
    data = PagoSerializer(pagos, many=True).data
    return JsonResponse(data, safe=False)

# Graba puntuacion y reseña de Contrato
class ContratoEvaluacion(LoginRequiredMixin,generics.UpdateAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoEvaluacionSerializer

# Crea nuevo Contrato
@login_required
def crear_contrato(request):
    request_data = json.loads(request.body)

    id_espacio = request_data.get('idEspacio')
    fecha_reserva = datetime.strptime(request_data.get('fechaReserva'), "%d/%m/%Y")
    codigo_turno = request_data.get('codigoTurno')
    medio_de_pago = request_data.get('medioDePago')

    # TODO: la mayor parte de esta lógica de creación de contrato habría que moverla al Contrato en models.py

    espacio = Espacio.objects.get(id_espacio=id_espacio)

    user = obtener_usuario_loggeado(request)

    if codigo_turno not in [turno[0] for turno in Contrato.TURNO_CHOICES]:
        raise Exception(f"'{codigo_turno}' no es un código de turno válido. Debería ser: {Contrato.TURNO_CHOICES}")

    # TODO: permitir seleccionar el puesto (en ConfirmarReserva.js?) en lugar de sólo el espacio?
    puesto=Puesto.get_puestos_libres_por_espacio(fecha_reserva, codigo_turno, espacio)[0]

    importe_contrato=espacio.precioJC_espacio if codigo_turno == 'c' else espacio.precioMJ_espacio

    contrato = Contrato.objects.create(puesto=puesto, usuario=user, importe_contrato=importe_contrato, inicio_contrato=fecha_reserva, fin_contrato=fecha_reserva)

    pago = Pago.objects.create(contrato=contrato, medio_pago=medio_de_pago, importe_pago=importe_contrato)

    # TODO: manejar pago real en endpoint aparte (+simular algo que parezca un pago real?)

    details= "Contrato creado con éxito"

    return JsonResponse({'exito': True}, safe=False)

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
    fecha = datetime(anio, mes, dia)
    turno = turno or 'c'
    localidad = get_object_or_404(Localidad, pk=id_localidad)

    puestos_libres = Puesto.get_puestos_libres_por_localidad(fecha, turno, localidad)

    data = PuestoSerializer(puestos_libres, many=True).data

    return JsonResponse(data, safe=False)


# Devuelve lista de Coworks con Salas Disponibles
# Donde:    Espacio.es_sala = true
#           Espacio.cowork.localidad = localidad
#           Barrer todos los Contratos de los Coworks
#           de la localidad, fecha y turno ingresados.
#           Considerar que si se seleccionó turno Tarde,
#           por ejemplo, también se deben considerar los
#           Contratos con turno Completo para esa fecha.
# Guardar:  Lista de Puestos sin Contratos.
# Retornar: Datos de Coworks.
def salas_vacantes(request, id_localidad, anio, mes, dia, turno):
    # TODO: (SRV) por cómo quedaron armados los serializers, estamos enviando data duplicada, podríamos hacer la llamada más eficiente si para las relaciones enviáramos sólo las FK y re-construyéramos los objetos en el frontend (de la misma forma que se reciben los Paises/Provincias/Localidades - ver código en index.js)
    fecha = datetime(anio, mes, dia)
    turno = turno or 'c'
    loc = get_object_or_404(Localidad, pk=id_localidad)

    coworks = Cowork.objects.filter(localidad=loc).filter(estado='h')
    espacios = Espacio.objects.filter(cowork__in=coworks.all()).filter(es_sala=True)
    puestos = Puesto.objects.filter(espacio__in=espacios.all())

    contratos = Contrato.objects.filter(puesto__in=puestos.all()).filter(turno__in=[turno, 'c']).filter(inicio_contrato=fecha)

    ids_puestos_contratados = list(set([c.puesto.pk for c in contratos]))

    puestos_libres = Puesto.objects.exclude(id_puesto__in=ids_puestos_contratados).filter(espacio__in=espacios.all())

    data = PuestoSerializer(puestos_libres, many=True).data

    return JsonResponse(data, safe=(not settings.DEBUG))

# Devuelve google maps api key
def googlemapsapikey(request):
    return JsonResponse({'googleMapsApiKey':settings.GOOGLE_MAPS_API_KEY}, safe=False)

# Crea nuevo Cowork
class CoworkCreate(CreateAPIView):
    queryset = Cowork.objects.all()
    serializer_class = CoworkCreateSerializer

# Crea nuevo Espacio
class EspacioCreate(CreateAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioCreateSerializer

# Crea nuevo Puesto
class PuestoCreate(CreateAPIView):
    queryset = Puesto.objects.all()
    serializer_class = PuestoCreateSerializer

# Registro de usuario Administrador de Cowork
class CoadminSignUpView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CoadminSignUpViewSerializer

# Registro de usuario Cliente de Gework
class ClientSignUpView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = ClientSignUpViewSerializer
