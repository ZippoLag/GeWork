"""
WSGI config for gework project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', os.environ.get(
        "GEWORK_DJANGO_SETTINGS_MODULE",
        "gework.settings.prod",
    ))

print(
    f"La aplicación ha iniciado con settings obtenidas desde '{os.environ.get('DJANGO_SETTINGS_MODULE', '?!')}', si
    debieran ser otras, por favor observá el valor de tus variables de entorno 'GEWORK_DJANGO_SETTINGS_MODULE' y
    'DJANGO_SETTINGS_MODULE'."
)

application = get_wsgi_application()
