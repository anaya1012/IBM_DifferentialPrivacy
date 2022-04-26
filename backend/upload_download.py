from importlib.metadata import metadata
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
    reqfile='**'
    print(request.FILES)
    #if request.method == 'POST':
        #if 'file' in request.file():
    reqfile = request.POST
    
    print("Posted!!")
   
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Test"]
    
    
    collection_name=reqfile['filename']
    mydb.create_collection(collection_name)
    mycol = mydb[collection_name]

    csv_file = request.FILES['file']
    #print(type(csv_file))

    file = csv_file.read().decode('utf-8')
    reader = csv.DictReader(io.StringIO(file))
    data = [line for line in reader]
    #print("data:: ", dict(data))
    mycol.insert_many(data)
    print(reqfile['description'])
    print(reqfile)
    mydb['metadata'].insert_one({'filename':collection_name,'description':reqfile['description']})
       # data = {k: v[0] if len(v) == 1 else v for k, v in data.lists()}
    return HttpResponse("Done")

@csrf_exempt
def fetch_all(request):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Test"]

    metadata_list=list(mydb['metadata'].find({},{'_id':0}))
    print("List:: ",metadata_list)
    
    return JsonResponse({'value':metadata_list})
@csrf_exempt
def download_file(request):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Test"]
    mycol="test.csv"
    filename = list(request.POST)[0]
    print(filename)
    docdb=list(mydb[filename].find({},{'_id':0}))
    print(docdb)
    df = pd.DataFrame(docdb)
    csvfile=df.to_csv("file.csv", sep=',',index=False)

    return HttpResponse(docdb)