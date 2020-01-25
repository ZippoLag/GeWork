from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings

def require_login_if_not_debug(view):
    return view if settings.DEBUG else login_required(view)

urlpatterns = [
    # Devuelve lista de Espacios
    path('api/espacios/', views.EspacioListCreate.as_view()),
    # Devuelve detalles de Usuario Logueado
    path('api/get_detalles_usuario/',
        require_login_if_not_debug(views.get_detalles_usuario),
        name='get_detalles_usuario/'),
    # Devuelve un Espacio y sus Prestaciones
    path('api/espacio/<int:id>/', views.espacioDetail),
    # Devuelve lista de Prestaciones
    path('api/prestaciones/', views.PrestacionListCreate.as_view()),
    # Devuelve una Prestacion
    path('api/prestacion/<int:id>/', views.prestacionDetail),
    # Devuelve lista de Coworks
    path('api/coworks/', views.CoworkListCreate.as_view()),
    # Devuelve un Cowork, Espacios de ese Cowork, Prestaciones y Puestos de cada Espacio
    path('api/cowork/<int:id>/', views.coworkDetail),
    # Devuelve lista de Paises
    path('api/paises/', views.PaisListCreate.as_view()),
    # Devuelve lista de Provincias
    path('api/provincias/', views.ProvinciaListCreate.as_view()),
    # Devuelve lista de Localidades
    path('api/localidades/', views.LocalidadListCreate.as_view()),
    # Devuelve una Localidad
    path('api/localidad/<int:pk>/', views.LocalidadDetail.as_view()),
    # Devuelve un Puesto y datos del Espacio al que pertenece el mismo, incluyendo Prestaciones y datos del Cowork al que pertenece
    path('api/puesto/<int:id>/', views.puestoDetail),
    # Devuelve lista de Contratos de un Usuario
    path('api/contratos/', require_login_if_not_debug(views.contratosUsuario)),
    # Devuelve Pago de un Contrato de un Usuario
    path('api/contrato/<int:id>/', require_login_if_not_debug(views.contratoUsuario)),
    # Graba puntuacion y reseña de Contrato
    path('api/contratoevaluacion/<int:pk>/', require_login_if_not_debug(views.ContratoEvaluacion.as_view())),
    # Crea nuevo Contrato
    path('api/contratocreate/', require_login_if_not_debug(views.ContratoCreate.as_view())),
    # Crea nuevo Pago
    path('api/pagocreate/', require_login_if_not_debug(views.PagoCreate.as_view())),
    # Devuelve lista de puestos sin Contrato
    path('api/puestos_vacantes/<int:id_localidad>/<int:anio>/<int:mes>/<int:dia>/<slug:turno>/', views.puestos_vacantes),
    # Devuelve lista de salas sin Contrato
    path('api/salas_vacantes/<int:id_localidad>/<int:anio>/<int:mes>/<int:dia>/<slug:turno>/', views.salas_vacantes),
    # Devuelve la API Key de Google Maps TODO: cambiar por una cookie seteada en middleware
    path('api/googlemapsapikey/', views.googlemapsapikey),
]
