from django.urls import path
from .views import make_registration_request, get_user, sync_user_manager_db

urlpatterns = [
    path('registration/request/create', make_registration_request),
    path('users/get/<str:login>', get_user),
]
