from .base import *

# TODO: debería hacer falta esto en prod?
# SECURE_SSL_REDIRECT = os.environ['SECURE_SSL_REDIRECT']

# Este archivo contiene las settings de producción que "siempre" deberían estar presentes, aquellas que deberían
# permanecer secretas (tanto en dev como en otros ambientes) deberían incluirse en el archivo (ignorado por git)
# local_settings.py importado a continuación:
from .local_settings import *
