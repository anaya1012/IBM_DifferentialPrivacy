from .correlation import get_correlation
from .views import dashboardApi,visualizeattributes
from .upload_download import upload_file
from .form_data import form_input
from django.urls import path

urlpatterns = [
   path('prediction',dashboardApi),
   path('visualize',visualizeattributes),
   path('visualizeheatmap',get_correlation),
   path('predictResults', form_input),
   path('upload', upload_file),
]