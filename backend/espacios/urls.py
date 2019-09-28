from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings


urlpatterns = [
    path("api/espacios/", views.EspacioListCreate.as_view()),
]
