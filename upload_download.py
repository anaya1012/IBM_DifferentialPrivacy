import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse, HttpResponse
import pandas as pd
import numpy as np
import pymongo
import csv
import io
import codecs
@csrf_exempt 
def upload_file(request):
    file='**'
    print(request.FILES)
    #if request.method == 'POST':
        #if 'file' in request.file():
    file = request.POST
    print(file)
    print("Posted!!")
   
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Test"]
    
    
    collection_name=file['filename']
    mydb.create_collection(collection_name)
    mycol = mydb[collection_name]

    csv_file = request.FILES['file']
    #print(type(csv_file))

    file = csv_file.read().decode('utf-8')
    reader = csv.DictReader(io.StringIO(file))
    data = [line for line in reader]
    #print("data:: ", dict(data))
    mycol.insert_many(data)
       # data = {k: v[0] if len(v) == 1 else v for k, v in data.lists()}
    return HttpResponse("Done")