from django.shortcuts import render
from django.http import HttpResponse
import matplotlib.pyplot as plt
import numpy as np
from sklearn import datasets
from sklearn.model_selection import train_test_split
from diffprivlib.models import GaussianNB
import pandas as pd
from diffprivlib import tools as dp
import io
import urllib, base64
# Create your views here.



def home(request):
    return render(request, 'home.html')

def predictValue(request):
    
    dataset = datasets.load_iris()
    X_train, X_test, y_train, y_test = train_test_split(dataset.data, dataset.target, test_size=0.2)
    clf = GaussianNB()
    clf.fit(X_train, y_train)
    clf.predict(X_test)
    epsilons = np.logspace(-2, 2, 50)
    bounds = ([4.3, 2.0, 1.1, 0.1], [7.9, 4.4, 6.9, 2.5])
    accuracy = list()

    for epslon in epsilons:
        clf = GaussianNB(bounds=bounds, epsilon=epslon)
        clf.fit(X_train, y_train)
        
        accuracy.append(clf.score(X_test, y_test))
   
    plt.semilogx(epsilons, accuracy)
    plt.title("Differentially private Naive Bayes accuracy")
    plt.xlabel("epsilon")
    plt.ylabel("Accuracy")
    
    fig = plt.gcf()
    buf = io.BytesIO()
    fig.savefig(buf,format='png')
    buf.seek(0)
    string = base64.b64encode(buf.read())
    uri = urllib.parse.quote(string)
    plt.close()
    return render(request, 'predictions.html',{'a':clf.score(X_test, y_test)*100,'b':uri})
def plotHist(request):
    dataset=pd.read_csv(r"D:\anaya\IBM_Group8_DifferentialPrivacy\train.csv")
    #print(dataset['Blood cell count (mcL)'])
    dp_hist, dp_bins = dp.histogram(dataset['Blood cell count (mcL)'])
    dp_hist = dp_hist / dp_hist.sum()
    plt.bar(dp_bins[:-1], dp_hist)
    #plt.hist(dp_hist,bins=dp_bins)
    #print(dp_hist)
    plt.title("Variations in blood cell count")
    plt.xlabel("Blood cell count")
    fig = plt.gcf()
    buf = io.BytesIO()
    fig.savefig(buf,format='png')
    buf.seek(0)
    string = base64.b64encode(buf.read())
    uri = urllib.parse.quote(string)
    plt.close()
    return render(request, 'datavisualization.html',{'a':uri})

    