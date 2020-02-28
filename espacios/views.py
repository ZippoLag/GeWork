import io
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic import View, CreateView
from django.contrib.auth.models import User
from .serializers import EspacioSerializer, PrestacionSerializer, CoworkSerializer, PaisSerializer, ProvinciaSerializer, LocalidadSerializer, PuestoSerializer, ContratoSerializer, PagoSerializer, ContratoEvaluacionSerializer, ContratoCreateSerializer, PagoCreateSerializer
from django.shortcuts import get_object_or_404, render, redirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics
from .models import User, PerfilDeUsuario, Pais, Provincia, Localidad, Pago, Prestacion, Cowork, Contrato, Espacio, Puesto
from .serializers import CoworkSerializer, PrestacionSerializer, EspacioSerializer, PuestoSerializer, PaisSerializer, ProvinciaSerializer, LocalidadSerializer, ContratoSerializer, PagoSerializer, ContratoEvaluacionSerializer, ContratoCreateSerializer, PagoCreateSerializer
from rest_framework.generics import CreateAPIView
from datetime import datetime
from django.contrib.auth.models import Group

# TODO: crear vistas para servir los objetos serializados (y demás)

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
def contratosUsuario(request):
    usr = request.user.pk
    contratos = Contrato.objects.filter(usuario_id=usr)
    data = ContratoSerializer(contratos, many=True).data
    return JsonResponse(data, safe=False)

# Devuelve Pago de un Contrato de un Usuario
def contratoUsuario(request, id):
    usr = request.user.pk
    cont = Contrato.objects.filter(usuario_id=usr, pk=id)
    pagos = Pago.objects.filter(contrato=cont[0])
    data = PagoSerializer(pagos, many=True).data
    return JsonResponse(data, safe=False)

# Graba puntuacion y reseña de Contrato
# Donde: id es el contrato en el que se van a actualizar los datos.
# Guardar: datos de puntuacion de Contrato.
def evaluar_contrato(request, id):
    request_data = json.loads(request.body)

    estrellas = request_data.get('estrellas')
    resenia = request_data.get('resenia')

    user = obtener_usuario_loggeado(request)

    contrato = Contrato.objects.get(usuario=user, pk=id)
    contrato.estrellas_contrato = estrellas
    contrato.resenia_contrato = resenia
    contrato.save()

    details= "Evaluacion registrada con éxito"

    return JsonResponse({'exito': True}, safe=False)

# Crea nuevo Contrato
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

# Registro de usuario
# Donde:    num indica si es usuario administrador (1)
# o usuario cliente (2).
# Guardar:  Nuevo registro de usuario.
def registrar_usuario(request, num):
    request_data = json.loads(request.body)

    user_name = request_data.get('username')
    firstname = request_data.get('first_name')
    lastname = request_data.get('last_name')
    email = request_data.get('email')
    password = request_data.get('password')
    password2 = request_data.get('password2')
    dni = request_data.get('dni_usuario')
    linkedin = request_data.get('linkedin_usuario')

    if not (password == password2):
        raise Exception(f"Las claves ingresadas no coinciden.")

    if num == 1:
        group = Group.objects.get(name='Administradores de Coworks')
    else:
        group = Group.objects.get(name='Clientes  de GeWork')

    usuario = User.objects.create(username=user_name, first_name=firstname, last_name=lastname, email=email, password=password)

    usuario.groups.add(group)

    perfildeusuario = PerfilDeUsuario.objects.create(user=usuario, dni_usuario=dni, linkedin_usuario=linkedin)

    details= "Usuario creado con éxito"

    return JsonResponse({'exito': True}, safe=False)

# Actualizacion de datos de Usuario.
def editar_usuario(request):
    request_data = json.loads(request.body)

    nombre = request_data.get('nombre')
    apellido = request_data.get('apellido')
    email = request_data.get('email')
    dni = request_data.get('dni')
    linkedin = request_data.get('linkedin')

    user = obtener_usuario_loggeado(request)

    user.first_name = nombre
    user.last_name = apellido
    user.email = email
    user.save()

    perfil = PerfilDeUsuario.objects.get(user=user)
    perfil.dni_usuario = dni
    perfil.linkedin_usuario = linkedin
    perfil.save()

    details= "Modificacion registrada con exito."

    return JsonResponse({'exito': True}, safe=False)

# Alta de Cowork
def registrar_cowork(request):
    request_data = json.loads(request.body)

    nombre = request_data.get('nombre')
    direccion = request_data.get('direccion')
    itm = request_data.get('itm')
    ftm = request_data.get('ftm')
    itt = request_data.get('itt')
    ftt = request_data.get('ftt')
    lat = request_data.get('lat')
    lng = request_data.get('lng')
    loc = request_data.get('loc')
    estado = 'p'

    cowork = Cowork.objects.create(nombre_cowork=nombre, direccion_cowork=direccion, inicioTM_cowork=itm, finTM_cowork=ftm, inicioTT_cowork=itt, finTT_cowork=ftt, lat=lat, lng=lng, localidad=loc, estado=estado)

    details= "Cowork creado con éxito"

    return JsonResponse({'exito': True}, safe=False)

# Modificacion de Cowork
def editar_cowork(request, id):
    request_data = json.loads(request.body)

    nombre = request_data.get('nombre')
    direccion = request_data.get('direccion')
    itm = request_data.get('itm')
    ftm = request_data.get('ftm')
    itt = request_data.get('itt')
    ftt = request_data.get('ftt')
    lat = request_data.get('lat')
    lng = request_data.get('lng')
    loc = request_data.get('loc')

    cowork = Cowork.objects.get(pk=id)
    cowork.nombre_cowork = nombre
    cowork.direccion_cowork = direccion
    cowork.inicioTM_cowork = itm
    cowork.finTM_cowork = ftm
    cowork.inicioTT_cowork = itt
    cowork.finTT_cowork = ftt
    cowork.lat = lat
    cowork.lng = lng
    cowork.localidad = loc
    cowork.save()

    details= "Modificacion registrada con éxito"

    return JsonResponse({'exito': True}, safe=False)

# Alta de Espacio
def registrar_espacio(request):
    request_data = json.loads(request.body)

    prestaciones = []

    nombre = request_data.get('nombre')
    precioMJ = request_data.get('preciomj')
    precioJC = request_data.get('preciojc')
    ubicacion = request_data.get('ubicacion')
    id_cowork = request_data.get('id_cowork')
    ids_prestaciones = request_data.get('prestaciones')
    es_sala = request_data.get('es_sala')

    cowork = Cowork.objects.get(id_cowork=id_cowork)

    for p in ids_prestaciones:
        prestacion = Prestacion.objects.get(id_prestacion=p)
        prestaciones.append(prestacion)

    espacio = Espacio.objects.create(nombre_espacio=nombre, precioMJ_espacio=precioMJ, precioJC_espacio=precioJC, ubicacion_espacio=ubicacion, cowork=cowork, es_sala=es_sala)

    espacio.prestaciones.set(prestaciones)

    details= "Espacio creado con éxito"

    return JsonResponse({'exito': True}, safe=False)

# Modificacion de Espacio
def editar_espacio(request, id):
    request_data = json.loads(request.body)

    prestaciones = []

    nombre = request_data.get('nombre')
    precioMJ = request_data.get('preciomj')
    precioJC = request_data.get('preciojc')
    ubicacion = request_data.get('ubicacion')
    id_cowork = request_data.get('id_cowork')
    ids_prestaciones = request_data.get('prestaciones')
    es_sala = request_data.get('es_sala')

    cowork = Cowork.objects.get(id_cowork=id_cowork)

    for p in ids_prestaciones:
        prestacion = Prestacion.objects.get(id_prestacion=p)
        prestaciones.append(prestacion)

    espacio = Espacio.objects.get(pk=id)
    espacio.nombre_espacio = nombre
    espacio.precioMJ_espacio = precioMJ
    espacio.precioJC_espacio = precioJC
    espacio.ubicacion_espacio = ubicacion
    espacio.cowork = cowork
    espacio.prestaciones.set(prestaciones)
    espacio.es_sala = es_sala
    espacio.save()

    details= "Modificacion registrada con éxito"

    return JsonResponse({'exito': True}, safe=False)

# Alta de Puesto
def registrar_puesto(request):
    request_data = json.loads(request.body)

    ubicacion = request_data.get('ubicacion')
    id_espacio = request_data.get('id_espacio')
    capacidad = request_data.get('capacidad')

    espacio = Espacio.objects.get(id_espacio=id_espacio)

    puesto = Puesto.objects.create(ubicacion_puesto=ubicacion, espacio=espacio, capacidad=capacidad)

    details= "Puesto creado con éxito"

    return JsonResponse({'exito': True}, safe=False)

# Modificacion de Puesto
def editar_puesto(request, id):
    request_data = json.loads(request.body)

    ubicacion = request_data.get('ubicacion')
    id_espacio = request_data.get('id_espacio')
    capacidad = request_data.get('capacidad')

    espacio = Espacio.objects.get(id_espacio=id_espacio)

    puesto = Puesto.objects.get(pk=id)
    puesto.ubicacion_puesto = ubicacion
    puesto.espacio = espacio
    puesto.capacidad = capacidad
    puesto.save()

    details= "Modificacion registrada con éxito"

    return JsonResponse({'exito': True}, safe=False)