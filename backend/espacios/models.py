from itertools import chain
from django.db import models
from django.utils import timezone

# TODO: crear modelos de datos

class Espacio(models.Model):
    id_espacio = models.AutoField(primary_key=True)
