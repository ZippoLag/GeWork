from .base import *

DEBUG = True

INSTALLED_APPS.append("corsheaders")

MIDDLEWARE.insert(0, "corsheaders.middleware.CorsMiddleware")

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = ("http://localhost:3000", "http://localhost:5000")
CORS_ORIGIN_REGEX_WHITELIST = CORS_ORIGIN_WHITELIST

# Este archivo contiene las settings de desarrollo que "siempre" deberían estar presentes, aquellas que deberían
# permanecer secretas (tanto en dev como en otros ambientes) deberían incluirse en el archivo (ignorado por git)
# local_settings.py importado a continuación:
from .local_settings import *
