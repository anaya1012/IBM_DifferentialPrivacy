
from .correlation import get_correlation
from .views import dashboardApi,visualizeattributes
from .form_data import form_input
from django.urls import path

urlpatterns = [
   path('prediction',dashboardApi),
   path('visualize',visualizeattributes),
   path('visualizeheatmap',get_correlation),
   path('predictResults', form_input),
]
