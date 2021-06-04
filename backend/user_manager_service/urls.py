from django.contrib import admin
from django.urls import path
from .views import make_registration_request, get_users

urlpatterns = [
    path('registration/request/create', make_registration_request),
    path('registration/request/get', get_users),
]
