from rest_framework import serializers
from .models import Patient

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient 
        fields = ('Patient_Age')