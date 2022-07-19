from .loginregResearcher import addUserR, validateR
from .correlation import get_correlation
from .views import dashboardApi,visualizeattributes
from .form_data import form_input
from django.urls import path
from .upload_download import upload_file,download_file,fetch_all
from .loginreg import  addUser,validate
urlpatterns = [
   path('prediction',dashboardApi),
   path('visualize',visualizeattributes),
   path('visualizeheatmap',get_correlation),
   path('predictResults', form_input),
   path('upload', upload_file),
   path('download', download_file),
   path('addUser', addUser),
   path('addUserResearch', addUserR),
   path('fetch', fetch_all),
   path('validateLoginResearcher', validateR),
   path('validateLogin', validate)
]