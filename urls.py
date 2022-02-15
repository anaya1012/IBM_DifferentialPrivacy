
from .views import dashboardApi
from django.urls import path

urlpatterns = [
   path('predict',dashboardApi),
]
