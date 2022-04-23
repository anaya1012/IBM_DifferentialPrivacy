import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse, HttpResponse
import pandas as pd
import numpy as np


@csrf_exempt 
def upload_file(request):
    file='**'
    print(request.FILES)
    #if request.method == 'POST':
        #if 'file' in request.file():
    file = request.POST
    print(file)
    print("Posted!!")
    
       # data = {k: v[0] if len(v) == 1 else v for k, v in data.lists()}
    return HttpResponse("Done")