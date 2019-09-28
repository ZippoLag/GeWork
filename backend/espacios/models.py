from itertools import chain
from django.db import models
from django.utils import timezone

# TODO: definir manejo de permisos
# CLM: los niveles dentro de la clase Permiso, deberían estar tipificados?
# SRV: depende de cómo querramos hacerlo, otra alternativa es usar las clases que ya trae Django para manejar permisos y perfiles. De momento asumamos que todos los admins pueden hacer todo y ya y cuando nos juntemos lo revemos. Dejo comentada esa clase de momento

class Cowork(models.Model):
    id_cowork = models.AutoField(primary_key=True)
    nombre_cowork = models.CharField(max_length=50)
    direccion_cowork = models.CharField(max_length=50)
    inicioTM_cowork = models.CharField(max_length=8)
    finTM_cowork = models.CharField(max_length=8)
    inicioTT_cowork = models.CharField(max_length=8)
    finTT_cowork = models.CharField(max_length=8)
    urlGoogleMaps = models.URLField()
    def __str__(self):
        return self.nombre_cowork

class Prestacion(models.Model):
    id_prestacion = models.AutoField(primary_key=True)
    nombre_prestacion = models.CharField(max_length=50)
    desc_prestacion = models.CharField(max_length=200)
    icono_prestacion = models.CharField(max_length=200)
    def __str__(self):
        return self.nombre_prestacion

class Espacio(models.Model):
    id_espacio = models.AutoField(primary_key=True)
    nombre_espacio = models.CharField(max_length=50)
    precioMJ_espacio = models.DecimalField(max_digits=10, decimal_places=3)
    precioJC_espacio = models.DecimalField(max_digits=10, decimal_places=3)
    ubicacion_espacio = models.CharField(max_length=100)
    cowork = models.ForeignKey(Cowork, on_delete=models.CASCADE)
    prestaciones = models.ManyToManyField(Prestacion)
    def __str__(self):
        return self.nombre_espacio

class Puesto(models.Model):
    id_puesto = models.AutoField(primary_key=True)
    ubicacion_puesto = models.CharField(max_length=100)
    disponibilidadTM_puesto = models.BooleanField()
    disponibilidadTT_puesto = models.BooleanField()
    espacio = models.ForeignKey(Espacio, on_delete=models.CASCADE)
    def __str__(self):
        return self.ubicacion_puesto

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    dni_usuario = models.IntegerField(unique=True)
    nombre_usuario = models.CharField(max_length=50)
    apellido_usuario = models.CharField(max_length=50)
    email_usuario = models.EmailField(max_length=70)
    pass_usuario = models.CharField(max_length=30)
    linkedin_usuario = models.URLField()
    alta_usuario = models.DateTimeField(default=timezone.now)
    inactivo_usuario = models.DateTimeField()
    def __str__(self):
        return self.nombre_usuario

"""class Permiso(models.Model):
    id_permiso = models.AutoField(primary_key=True)
    desc_permiso = models.CharField(max_length=50)
    nivel_permiso = models.IntegerField()
    cowork = models.ForeignKey(Cowork, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    def __str__(self):
        return self.desc_permiso"""

class Contrato(models.Model):
    id_contrato = models.AutoField(primary_key=True)
    fecha_contrato = models.DateTimeField(default=timezone.now)
    inicio_contrato = models.DateTimeField()
    fin_contrato = models.DateTimeField()
    importe_contrato = models.DecimalField(max_digits=10, decimal_places=3)
    estrellas_contrato = models.IntegerField()
    resenia_contrato = models.CharField(max_length=250)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    puesto = models.ForeignKey(Puesto, on_delete=models.CASCADE)
    def __str__(self):
        return self.fecha_contrato

class Pago(models.Model):
    id_pago = models.AutoField(primary_key=True)
    fecha_pago = models.DateTimeField(default=timezone.now)
    medio_pago = models.CharField(max_length=100)
    idext_pago = models.CharField(max_length=100)
    importe_pago = models.DecimalField(max_digits=10, decimal_places=3)
    contrato = models.ForeignKey(Contrato, on_delete=models.CASCADE)
    def __str__(self):
        return self.fecha_pago