from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings


urlpatterns = [
    path('api/espacios/',
         views.EspacioListCreate.as_view()),
    path('api/get_detalles_usuario',
         login_required(views.get_detalles_usuario),
         name='get_detalles_usuario'),
]
