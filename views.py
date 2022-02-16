from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from diffprivlib.models import GaussianNB as GNB
# Create your views here.

@csrf_exempt
def dashboardApi(request):
    if request.method == 'GET':
        y,y_dp=plot_predictions()
        x_axis = list(range(0,100))
        return JsonResponse({'x':x_axis,'y':y})
def plot_predictions():
    GENETICS_DATASET = pd.read_csv(r"D:\anaya\IBM_Group8_DifferentialPrivacy\train.csv")
    dataset = GENETICS_DATASET.copy()
    # Drop unwanted fields
    dataset.drop(["Test 1","Test 2","Test 3","Test 4","Test 5","Status","Parental consent","Place of birth","Follow-up",
                           "Patient Id", "Patient First Name", "Family Name","Father's name",
              "Location of Institute", "Institute Name"], axis = 1, inplace = True)
    dataset["Birth asphyxia"] = dataset["Birth asphyxia"].replace("No record",np.NaN)
    dataset["Birth asphyxia"] = dataset["Birth asphyxia"].replace("Not available",np.NaN)

    dataset["Autopsy shows birth defect (if applicable)"] = dataset["Autopsy shows birth defect (if applicable)"].replace("None",np.NaN)
    dataset["Autopsy shows birth defect (if applicable)"] = dataset["Autopsy shows birth defect (if applicable)"].replace("Not applicable",np.NaN)

    dataset["H/O radiation exposure (x-ray)"] = dataset["H/O radiation exposure (x-ray)"].replace("Not applicable",np.NaN)
    dataset["H/O radiation exposure (x-ray)"] = dataset["H/O radiation exposure (x-ray)"].replace("-",np.NaN)

    dataset["H/O substance abuse"] = dataset["H/O substance abuse"].replace("Not applicable",np.NaN)
    dataset["H/O substance abuse"] = dataset["H/O substance abuse"].replace("-",np.NaN)

    dataset["Inherited from father"].fillna(dataset["Inherited from father"].mode()[0], inplace=True)
    dataset["Maternal gene"].fillna(dataset["Maternal gene"].mode()[0], inplace=True)
    dataset["Respiratory Rate (breaths/min)"].fillna(dataset["Respiratory Rate (breaths/min)"].mode()[0], inplace=True)
    dataset["Heart Rate (rates/min"].fillna(dataset["Heart Rate (rates/min"].mode()[0], inplace=True)
    dataset["Gender"].fillna(dataset["Gender"].mode()[0], inplace=True)
    dataset["Folic acid details (peri-conceptional)"].fillna(dataset["Folic acid details (peri-conceptional)"].mode()[0], inplace=True)
    dataset["H/O serious maternal illness"].fillna(dataset["H/O serious maternal illness"].mode()[0], inplace=True)
    dataset["Assisted conception IVF/ART"].fillna(dataset["Assisted conception IVF/ART"].mode()[0], inplace=True)
    dataset["History of anomalies in previous pregnancies"].fillna(dataset["History of anomalies in previous pregnancies"].mode()[0], inplace=True)
    dataset["Birth defects"].fillna(dataset["Birth defects"].mode()[0], inplace=True)
    dataset["Blood test result"].fillna(dataset["Blood test result"].mode()[0], inplace=True)

    dataset["Patient Age"].fillna(dataset.groupby(["Disorder Subclass"])["Patient Age"].transform("mean"),inplace=True)
    dataset["Mother's age"].fillna(dataset.groupby(["Disorder Subclass"])["Mother's age"].transform("mean"),inplace=True)
    dataset["Father's age"].fillna(dataset.groupby(["Disorder Subclass"])["Father's age"].transform("mean"),inplace=True)
    dataset["No. of previous abortion"].fillna(dataset.groupby(["Disorder Subclass"])["No. of previous abortion"].transform("mean"),inplace=True)
    dataset["White Blood cell count (thousand per microliter)"].fillna(dataset.groupby(["Disorder Subclass"])["White Blood cell count (thousand per microliter)"].transform("mean"),inplace=True)

    dataset["Symptom 1"].fillna(dataset["Symptom 1"].mode()[0], inplace=True)
    dataset["Symptom 2"].fillna(dataset["Symptom 2"].mode()[0], inplace=True)
    dataset["Symptom 3"].fillna(dataset["Symptom 3"].mode()[0], inplace=True)
    dataset["Symptom 4"].fillna(dataset["Symptom 4"].mode()[0], inplace=True)
    dataset["Symptom 5"].fillna(dataset["Symptom 5"].mode()[0], inplace=True)

    dataset["Birth asphyxia"].fillna(dataset["Birth asphyxia"].mode()[0], inplace=True)
    dataset["Autopsy shows birth defect (if applicable)"].fillna(dataset["Autopsy shows birth defect (if applicable)"].mode()[0], inplace=True)
    dataset["H/O radiation exposure (x-ray)"].fillna(dataset["H/O radiation exposure (x-ray)"].mode()[0], inplace=True)
    dataset["H/O substance abuse"].fillna(dataset["H/O substance abuse"].mode()[0], inplace=True)

    dataset.dropna(inplace=True,axis=0)


    label_encoder = preprocessing.LabelEncoder()
    dataset["Genes in mother's side"]= label_encoder.fit_transform(dataset["Genes in mother's side"])
    dataset["Inherited from father"]= label_encoder.fit_transform(dataset["Inherited from father"])
    dataset["Maternal gene"]= label_encoder.fit_transform(dataset["Inherited from father"])
    dataset["Paternal gene"]= label_encoder.fit_transform(dataset["Inherited from father"])
    dataset['Respiratory Rate (breaths/min)']= label_encoder.fit_transform(dataset['Respiratory Rate (breaths/min)'])
    dataset['Heart Rate (rates/min']= label_encoder.fit_transform(dataset['Heart Rate (rates/min'])
    dataset['Folic acid details (peri-conceptional)']= label_encoder.fit_transform(dataset['Folic acid details (peri-conceptional)'])
    dataset['H/O serious maternal illness']= label_encoder.fit_transform(dataset['H/O serious maternal illness'])
    dataset['Assisted conception IVF/ART']= label_encoder.fit_transform(dataset['Assisted conception IVF/ART'])
    dataset['History of anomalies in previous pregnancies']= label_encoder.fit_transform(dataset['History of anomalies in previous pregnancies'])
    dataset['Birth defects']= label_encoder.fit_transform(dataset['Birth defects'])
    dataset['Blood test result']= label_encoder.fit_transform(dataset['Blood test result'])

    dataset['Birth asphyxia']= label_encoder.fit_transform(dataset['Birth asphyxia'])
    dataset['Autopsy shows birth defect (if applicable)']= label_encoder.fit_transform(dataset['Autopsy shows birth defect (if applicable)'])
    dataset['H/O radiation exposure (x-ray)']= label_encoder.fit_transform(dataset['H/O radiation exposure (x-ray)'])
    dataset['H/O substance abuse']= label_encoder.fit_transform(dataset['H/O substance abuse'])
    dataset["Genetic Disorder"]= label_encoder.fit_transform(dataset["Genetic Disorder"])
    dataset["Disorder Subclass"]= label_encoder.fit_transform(dataset["Disorder Subclass"])
    dataset["Gender"]= label_encoder.fit_transform(dataset["Gender"])
    
    x=dataset.iloc[:,:-2]
    y = dataset[['Genetic Disorder']]
    #x["sum of Mother's and fathers age avg"]=(x["Mother's age"]+x["Father's age"]) / 2
    x["total symptom"]=(x["Symptom 1"]+x["Symptom 2"]+x["Symptom 3"]+x["Symptom 4"]+x["Symptom 5"]) / 5
    x = x.apply(pd.to_numeric,downcast="float")
    y = y.apply(pd.to_numeric,downcast="float")

    x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.3,random_state = 1)
    
    clf = GaussianNB()
    clf.fit(x_train, y_train)
    y_pred=clf.predict(x_test)
    print("Test accuracy: %f" % clf.score(x_test, y_test))

   
    # differential privacy
    clf = GNB()
    clf.fit(x_train, y_train)
    y_pred_dp=clf.predict(x_test)
    print("Test accuracy: %f" % clf.score(x_test, y_test))
    print("y peedddddd",y_pred.tolist()[:100])
    return y_pred.tolist()[:100],y_pred_dp.tolist()[:100]
    
