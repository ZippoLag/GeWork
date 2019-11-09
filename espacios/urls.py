from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings


urlpatterns = [
    # Devuelve lista de Espacios
    path('api/espacios/',
         views.EspacioListCreate.as_view()),
    # Devuelve lista de Espacios de un Cowork, Prestaciones y Puestos de cada Espacio.
    path('api/espacios/<int:id>/espacios',
    views.load_espacios),
    # Devuelve detalles de Usuario Logueado
    path('api/get_detalles_usuario',
         login_required(views.get_detalles_usuario),
         name='get_detalles_usuario'),
    # Devuelve un Espacio
    path('api/espacios/<int:id>/', views.EspacioDetail),
    # Devuelve lista de Prestaciones
    path('api/prestaciones/', views.PrestacionListCreate.as_view()),
    # Devuelve una Prestacion
    path('api/prestaciones/<int:id>/', views.PrestacionDetail),
    # Devuelve lista de Coworks
    path('api/coworks/', views.CoworkListCreate.as_view()),
    # Devuelve un Cowork
    path('api/coworks/<int:id>/', views.CoworkDetail),
]
