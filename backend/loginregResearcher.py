from django.http import JsonResponse
from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from numpy import record
import pymongo
@csrf_exempt
def  addUserR(request):
    print("hi",request.POST)
    username=request.POST['name']
    email=request.POST['email']
    password=request.POST['password']
    #print("Nameeeeeeeee",username)
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Test"]
    mycol = mydb["loginResearch"]
    
    mydict=request.POST.dict()
    mycol.insert_one(mydict)
    print("Record added !!")
    return HttpResponse("Successful")

@csrf_exempt
def  validateR(request):
    print(request.GET)
    emailpara=request.GET['email']
    passpara=request.GET['password']
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Test"]
    mycol = mydb["loginResearch"]
    recordfound=list(mycol.find({'email':emailpara,'password':passpara}))
    namepara=recordfound[0]['name']
    if(recordfound):
        return JsonResponse({'valid':1,'name':namepara})
    return JsonResponse({'valid':1,'name':"Not found"})