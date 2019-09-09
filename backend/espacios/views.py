import io
import json
from django.http import HttpResponse
from django.views.generic import View
from rest_framework import generics
from .models import Espacio
from .serializers import EspacioSerializer

# TODO: crear vistas para servir los objetos serializados (y demás)

class EspacioListCreate(generics.ListCreateAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer
