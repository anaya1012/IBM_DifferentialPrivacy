import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse, HttpResponse
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from diffprivlib.models import GaussianNB as GNB
from .views import preprocess, labelencode




def get_correlation(request):
    if request.method == 'GET':
        dataset = labelencode(preprocess())
        x=dataset.iloc[:,:-2]
        y = dataset[['Genetic Disorder']]
        #x["sum of Mother's and fathers age avg"]=(x["Mother's age"]+x["Father's age"]) / 2
        # x["total symptom"]=(x["Symptom 1"]+x["Symptom 2"]+x["Symptom 3"]+x["Symptom 4"]+x["Symptom 5"]) / 5
        # x = x.apply(pd.to_numeric,downcast="float")
        # y = y.apply(pd.to_numeric,downcast="float")
        
        result = dataset.corr()
        result = result.values.tolist()
        for i in range(0,len(result)):
            result[i]=[abs(elem) for elem in result[i]]
        #print("hellooooo",(result))
        return JsonResponse({'res':result})