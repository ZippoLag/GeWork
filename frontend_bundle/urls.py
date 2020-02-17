from django.urls import path, re_path
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from django.views.generic import TemplateView
from django.conf import settings
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "asset-manifest.json",
        TemplateView.as_view(
            template_name="frontend_bundle/asset-manifest.json",
            content_type="application/manifest+json",
        ),
    ),
    path(
        "sw.js",
        TemplateView.as_view(
            template_name="frontend_bundle/sw.js",
            content_type="application/javascript",
        ),
    ),
    path(
        "index.html",
        login_required(
            TemplateView.as_view(template_name="frontend_bundle/index.html")
        ),
    ),
    re_path(
        r'^favicon.ico$',
        RedirectView.as_view(
            url=staticfiles_storage.url('favicon.ico'),
            permanent=False),
        name='favicon'
    ),
    re_path(
        r'/',
        TemplateView.as_view(template_name="frontend_bundle/index.html"),
    ),
    re_path(
        r'^(?:.*)/?$',
        TemplateView.as_view(template_name="frontend_bundle/index.html"),
    ),
]
