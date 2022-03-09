import React, {useState, useEffect} from 'react'
import { CssBaseline, Grid, makeStyles, TextField, Box } from '@material-ui/core'
import { margin } from '@mui/system';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';

import * as bloodTestOptions from './getBloodTestOptions';

import axios from "axios";



const genderItems = [
    { id: '0', title: 'Male' },
    { id: '1', title: 'Female' },
    { id: '2', title: 'Ambiguous' },
]

const isPresent = [
    {id: '1' , title :'Yes'},
    {id: '0' , title :'No'},

]
const RespRate = [
    {id: '1' , title :'Tachypnea'},
    {id: '0' , title :'Normal'},

]

const HeartRate = [
    {id: '1' , title :'Tachycardia'},
    {id: '0' , title :'Normal'},

]

const Bdefects = [
    {id: '1' , title :'Singular'},
    {id: '0' , title :'Multiple'},

]

const initialFValues ={
    Patient_Age : 0,
    Genes_mother_side :'0', 
    Inherited_father :'0',
    Maternal_gene :'0',
    Paternal_gene :'0',
    Blood_cell_count: 0,
    Mother_age : 0,
    Father_age : 0,
    Respiratory_Rate :'0',
    Heart_Rate :'0',
    gender : '0',
    Birth_asphyxia :'0',
    Autopsy_birth_defect : '0',
    Folic_acid :'0',
    maternal_illness : '0',
    radiation_exposure :'0',
    substance_abuse :'0',
    Assisted_conception :'0',
    anomalies_previous_pregnancies : '0',
    previous_abortion : 0,
    Birth_defects : '0',
    wbc_count :0,
    Blood_test_result : '0',
    Symptom1 : 0,
    Symptom2 : 0,
    Symptom3 : 0,
    Symptom4 : 0,
    Symptom5 : 0

}

var result = ""

export default function FeatureInputForm () {
   
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Patient_Age' in fieldValues)
            temp.Patient_Age = fieldValues.Patient_Age.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }


    const [predResult, setResult] = useState("");
    const [predResultdp, setResultDP] = useState("");


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        var bodyFormData = new FormData();
        if (validate()){
            //axios.post("http://localhost:8000/predictResults",values).then(()=>{

            bodyFormData.append('Patient_Age', values.Patient_Age);
            console.log("Submit")
            //console.log(values)
            console.log(JSON.stringify(values))
            axios({
                method: "post",
                url: "http://localhost:8000/predictResults",
                data: JSON.stringify(values),
                // headers: {
                //     'Content-Type': 'application/json',
                //   }
              })
                .then(function (response) {
                  //handle success
                  
                  console.log(response);

                  result = response.data.dp
                  console.log(result);
                  setResult(result)
                  result = response.data.wodp
                  setResultDP(result)

                  
                })
                .catch(function (response) {
                  //handle error
                  console.log(response);
                });
            



           // })
            
        }
    }
 
    return (
     
           <>
           <CssBaseline /> 
           
           
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                    <div>
                        <Controls.Input
 
                        label="Patient Age"  
                        name = 'Patient_Age'
                        value={values.Patient_Age}
                        onChange = {handleInputChange}
                        error = {errors.Patient_Age}
                        />
                        
                    </div>
                    

                    <div>
                        <Controls.Input
                        label="Blood cell count"  
                        name = 'Blood_cell_count'
                        value={values.Blood_cell_count}
                        onChange = {handleInputChange}
                        error = {errors.Patient_Age}
                        />
                        
                    </div>

                    <div>
                        <Controls.Input
                        label="Mother's Age"  
                        name = 'Mother_age'
                        value={values.Mother_age}
                        onChange = {handleInputChange}
                        error = {errors.Patient_Age}
                        />
                        
                    </div>
                    <div>
                        <Controls.Input
                        label="Father's Age"  
                        name = 'Father_age'
                        value={values.Father_age}
                        onChange = {handleInputChange}
                        error = {errors.Patient_Age}
                        />
                        
                    </div>

                    <div>
                        <Controls.Input
                        label="Number of previous abortions"  
                        name = 'previous_abortion'
                        value={values.previous_abortion}
                        onChange = {handleInputChange}
                        error = {errors.Patient_Age}
                        />
                        
                    </div>

                    <div>
                        <Controls.Input
                        label="White Blood cells count"  
                        name = 'wbc_count'
                        value={values.wbc_count}
                        onChange = {handleInputChange}
                        error = {errors.Patient_Age}
                        />
                        
                    </div>

                    <div>
                        <Controls.RadioGroup
                            name="Birth_defects"
                            label="Birth Defects"
                            value={values.Birth_defects}
                            onChange={handleInputChange}
                            items={Bdefects}
                        />
                   </div>


                   <Controls.Select
                        name="Blood_test_result"
                        label="Blood Test Results"
                        value={values.Blood_test_result}
                        onChange={handleInputChange}
                        options={bloodTestOptions.getBloodTestOptions()}
                        error={errors.Patient_Age}
                    />

                <div>

                        <Controls.Checkbox
                            name="Symptom1"
                            label="Symptom 1"
                            value={values.Symptom1}
                            onChange={handleInputChange}
                        />

                        <Controls.Checkbox
                            name="Symptom2"
                            label="Symptom 2"
                            value={values.Symptom2}
                            onChange={handleInputChange}
                        />

                        <Controls.Checkbox
                            name="Symptom3"
                            label="Symptom 3"
                            value={values.Symptom3}
                            onChange={handleInputChange}
                        />

                        <Controls.Checkbox
                            name="Symptom4"
                            label="Symptom 4"
                            value={values.Symptom4}
                            onChange={handleInputChange}
                        />

                        <Controls.Checkbox
                            name="Symptom5"
                            label="Symptom 5"
                            value={values.Symptom5}
                            onChange={handleInputChange}
                        />


                </div>
                    


                <div>
                            <Controls.RadioGroup
                                name="gender"
                                label="Gender"
                                value={values.gender}
                                onChange={handleInputChange}
                                items={genderItems}

                            />

                        </div>
                    <div>
                        <Controls.RadioGroup
                            name="Genes_mother_side"
                            label="Genes on mother's side"
                            value={values.Genes_mother_side}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="Inherited_father"
                            label="Gene Inherited from father"
                            value={values.Inherited_father}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>


                    </Grid>
                    


                    <Grid item xs={6}>
                        

                   <div>
                        <Controls.RadioGroup
                            name="Maternal_gene"
                            label="Maternal gene"
                            value={values.Maternal_gene}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="Paternal_gene"
                            label="Paternal gene"
                            value={values.Paternal_gene}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="Respiratory_Rate"
                            label="Respiratory Rate"
                            value={values.Respiratory_Rate}
                            onChange={handleInputChange}
                            items={RespRate}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="Heart_Rate"
                            label="Heart Rate"
                            value={values.Heart_Rate}
                            onChange={handleInputChange}
                            items={HeartRate}
                        />
                   </div>

                    
                   <div>
                        <Controls.RadioGroup
                            name="Birth_asphyxia"
                            label="Birth asphyxia"
                            value={values.Birth_asphyxia}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="Autopsy_birth_defect"
                            label="Autopsy birth defect"
                            value={values.Autopsy_birth_defect}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="Folic_acid"
                            label="Folic acid"
                            value={values.Folic_acid}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="maternal_illness"
                            label="maternal illness"
                            value={values.maternal_illness}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="radiation_exposure"
                            label="radiation exposure"
                            value={values.radiation_exposure}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>
                   <div>
                        <Controls.RadioGroup
                            name="substance_abuse"
                            label="substance abuse"
                            value={values.substance_abuse}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>
                   <div>
                        <Controls.RadioGroup
                            name="Assisted_conception"
                            label="Assisted conception"
                            value={values.Assisted_conception}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   <div>
                        <Controls.RadioGroup
                            name="anomalies_previous_pregnancies"
                            label="anomalies in previous pregnancies"
                            value={values.anomalies_previous_pregnancies}
                            onChange={handleInputChange}
                            items={isPresent}
                        />
                   </div>

                   


                         <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>

                    <Box component="span" sx={{ display: 'block', border: '1px dashed grey' }}><b>Predited Results</b></Box> 
                    <Box component="span" sx={{ display: 'block', border: '1px dashed grey' }}><b>Result without DP : {predResult}</b></Box> 
                    <Box component="span" sx={{ display: 'block', border: '1px dashed grey' }}><b>Result with DP :{predResultdp}</b></Box>
                    </Grid>
                    

                </Grid>


            </Form>
            
        
      
           </>
        
     
  )
}
