from django.db import models


# Create your models here.

class Patient(models.Model):
    
    Patient_Age  = models.CharField(max_length=100, null=False, blank=False)
    
    
    def __str__(self):
        return self.Patient_Age