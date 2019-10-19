import io
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from rest_framework import generics
from .models import Espacio
from .serializers import EspacioSerializer

# TODO: crear vistas para servir los objetos serializados (y demás)

class EspacioListCreate(generics.ListCreateAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer


def get_detalles_usuario(request):
    # TODO: obtener la instancia de Usuario (o Perfil, o como le llamemos) relacionada al usuario autenticado por django y enviar _sólo_ los datos que necesitemos en el frontend
    response = JsonResponse({
        'username': request.user.username
    })

    return response