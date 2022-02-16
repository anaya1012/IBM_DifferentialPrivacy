
from backend.views import dashboardApi
from django.urls import path

urlpatterns = [
    path('prediction',dashboardApi),
]