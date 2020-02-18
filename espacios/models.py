from itertools import chain
from django.db import models
from django.utils import timezone
from django.contrib import admin
from django.conf import settings
from django.contrib.auth.models import User

# CLM: creada clase para auditoria.
class MyModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=255, blank=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True)
    modified_by = models.CharField(max_length=255, blank=True, editable=False)
    class Meta:
        abstract = True

# DONE CLM: enlazar a la clase User interna de django (los campos comentados deberían obtenerse de instancias de ésa, hay diversos tutoriales sobre cómo hacer esto, la mayoría recomiendan nombrar a la clase custom "Profile", pero llamarle "Usuario" o "Perfil" en español sería igual de válido)

class PerfilDeUsuario(MyModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id_usuario = models.AutoField(primary_key=True)
    dni_usuario = models.IntegerField(unique=True, blank=True, default='')
    linkedin_usuario = models.URLField(blank=True, default='')

    def __str__(self):
        return self.user.username

    @classmethod
    def get_perfil(cls, usuario):
        return cls.objects.get_or_create(user=usuario)


admin.site.register(PerfilDeUsuario)

# TODO: definir manejo de permisos
# CLM: los niveles dentro de la clase Permiso, deberían estar tipificados?
# SRV: depende de cómo querramos hacerlo, otra alternativa es usar las clases que ya trae Django para manejar permisos y perfiles. De momento asumamos que todos los admins pueden hacer todo y ya y cuando nos juntemos lo revemos. Dejo comentada esa clase de momento

# TODO: mover registers a admin.py a medida que hagan falta formularios personalizados para las diversas clases en el admin (por ejemplo, para definir campos y entidades readonly)

class Pais(MyModel):
    id_pais = models.AutoField(primary_key=True)
    nombre_pais = models.CharField(max_length=50)
    siglas = models.CharField(max_length=3)
    def __str__(self):
        return self.nombre_pais

admin.site.register(Pais)

class Provincia(MyModel):
    id_provincia = models.AutoField(primary_key=True)
    nombre_provincia = models.CharField(max_length=50)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre_provincia

admin.site.register(Provincia)

class Localidad(MyModel):
    id_localidad = models.AutoField(primary_key=True)
    nombre_localidad = models.CharField(max_length=50)
    codpos = models.IntegerField(blank=False, unique=True)
    provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre_localidad

admin.site.register(Localidad)

class Cowork(MyModel):
        # CLM: Usuario que ofrece puesto o sala lo hace quedando el mismo en 'p' y Usuario admin lo tiene que cambiar a 'h' para que se habilite.
    ESTADO_CHOICES = (
        ('h', 'Habilitado'),
        ('i', 'Inhabilitado'),
        ('p', 'Pendiente de Aprobacion'),
    )

    id_cowork = models.AutoField(primary_key=True)
    nombre_cowork = models.CharField(max_length=50)
    direccion_cowork = models.CharField(max_length=50)
    inicioTM_cowork = models.CharField(max_length=8)
    finTM_cowork = models.CharField(max_length=8)
    inicioTT_cowork = models.CharField(max_length=8)
    finTT_cowork = models.CharField(max_length=8)
    lat = models.FloatField(help_text="Obtener mediante maps.google.com")
    lng = models.FloatField(help_text="Obtener mediante maps.google.com")
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE)
    estado = models.CharField(max_length=1, choices=ESTADO_CHOICES, blank=True, default='p', help_text='Estado de Cowork')

    def __str__(self):
        return self.nombre_cowork

admin.site.register(Cowork)

class Prestacion(MyModel):
    id_prestacion = models.AutoField(primary_key=True)
    nombre_prestacion = models.CharField(max_length=50)
    desc_prestacion = models.CharField(max_length=200)
    icono_prestacion = models.CharField(max_length=200, help_text="Usar caracter Unicode. Por ejemplo buscar en: https://emojis.wiki/")

    def __str__(self):
        return self.nombre_prestacion

admin.site.register(Prestacion)

class Espacio(MyModel):
    id_espacio = models.AutoField(primary_key=True)
    nombre_espacio = models.CharField(max_length=50)
    precioMJ_espacio = models.DecimalField(max_digits=10, decimal_places=3)
    precioJC_espacio = models.DecimalField(max_digits=10, decimal_places=3)
    ubicacion_espacio = models.CharField(max_length=100)
    cowork = models.ForeignKey(Cowork, on_delete=models.CASCADE)
    prestaciones = models.ManyToManyField(Prestacion)
    es_sala = models.BooleanField()
    def __str__(self):
        return self.nombre_espacio

admin.site.register(Espacio)

class Puesto(MyModel):
    id_puesto = models.AutoField(primary_key=True)
    ubicacion_puesto = models.CharField(max_length=100)
    """
    CLM: No se puede guardar acá porque la disponibilidad depende de la fecha.
    disponibilidadTM_puesto = models.BooleanField()
    disponibilidadTT_puesto = models.BooleanField()
    """
    espacio = models.ForeignKey(Espacio, on_delete=models.CASCADE)
    capacidad = models.IntegerField(blank=False)

    def __str__(self):
        return self.ubicacion_puesto

    @classmethod
    def get_puestos_libres_por_localidad(cls, fecha, turno, localidad):
        coworks = Cowork.objects.filter(localidad=localidad, estado='h')
        espacios = Espacio.objects.filter(cowork__in=coworks.all(), es_sala=False)
        puestos = Puesto.objects.filter(espacio__in=espacios.all())

        contratos = Contrato.objects.filter(puesto__in=puestos.all(), turno__in=[turno, 'c'], inicio_contrato=fecha)

        if turno is 'c':
            contratos = Contrato.objects.filter(puesto__in=puestos.all(), turno__in=['m','t','c'], inicio_contrato=fecha)

        ids_puestos_contratados = list(set([c.puesto.pk for c in contratos]))
        puestos_libres = Puesto.objects.exclude(id_puesto__in=ids_puestos_contratados).filter(espacio__in=espacios.all())

        return puestos_libres

    @classmethod
    def get_puestos_libres_por_espacio(cls, fecha, turno, espacio):
        # TODO: verificar lógica (idem get_puestos_libres_por_localidad)
        puestos = Puesto.objects.filter(espacio=espacio)

        contratos = Contrato.objects.filter(puesto__in=puestos.all(), turno__in=[turno, 'c'], inicio_contrato=fecha)

        ids_puestos_contratados = list(set([c.puesto.pk for c in contratos]))
        puestos_libres = Puesto.objects.exclude(id_puesto__in=ids_puestos_contratados).filter(espacio=espacio)

        return puestos_libres


admin.site.register(Puesto)

"""class Permiso(models.Model):
    id_permiso = models.AutoField(primary_key=True)
    desc_permiso = models.CharField(max_length=50)
    nivel_permiso = models.IntegerField()
    cowork = models.ForeignKey(Cowork, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    def __str__(self):
        return self.desc_permiso"""

class Contrato(MyModel):
    TURNO_CHOICES = (
        ('m', 'Mañana'),
        ('t', 'Tarde'),
        ('c', 'Completo'),
    )

    id_contrato = models.AutoField(primary_key=True)
    fecha_contrato = models.DateTimeField(default=timezone.now)
    turno = models.CharField(max_length=1, choices=TURNO_CHOICES, blank=True, default='c', help_text='Turno del Contrato')
    inicio_contrato = models.DateField()
    fin_contrato = models.DateField()
    importe_contrato = models.DecimalField(max_digits=10, decimal_places=3)
    estrellas_contrato = models.IntegerField(blank=True, null=True)
    resenia_contrato = models.CharField(max_length=250, blank=True)
    usuario = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    puesto = models.ForeignKey(Puesto, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.inicio_contrato} - {self.puesto.espacio.cowork}"

admin.site.register(Contrato)

class Pago(MyModel):
    id_pago = models.AutoField(primary_key=True)
    fecha_pago = models.DateTimeField(default=timezone.now)
    medio_pago = models.CharField(max_length=100)
    idext_pago = models.CharField(max_length=100, blank=True, default='')  # TODO: que es esto?
    importe_pago = models.DecimalField(max_digits=10, decimal_places=3)
    contrato = models.ForeignKey(Contrato, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.contrato} - ${self.importe_pago}"

admin.site.register(Pago)
