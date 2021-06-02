from django.contrib import admin
from django.urls import path
from .views import make_registration_request

urlpatterns = [
    path('registration/request', make_registration_request),
]
