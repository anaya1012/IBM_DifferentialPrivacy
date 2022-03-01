
from .views import dashboardApi,visualizeattributes
from django.urls import path

urlpatterns = [
   path('prediction',dashboardApi),
   path('visualize',visualizeattributes),
]
