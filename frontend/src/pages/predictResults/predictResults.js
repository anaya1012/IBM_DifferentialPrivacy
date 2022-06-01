import React from 'react'
import FeatureInputForm from './featureInputForm'
import { CssBaseline, Paper, makeStyles } from '@material-ui/core'
import { padding } from '@mui/system'

const useStyle = makeStyles(theme => ({
    pageContent :{
        
        margin: theme.spacing(5),
        padding: theme.spacing(3)

    }
}))


export default function PredictResults() {

    const classes = useStyle();
  return (
    
    <>
    
    <Paper
    style={{ marginLeft: "300px", border: "1px solid black" }}
    className={classes.pageContent}>
        <FeatureInputForm />
    </Paper>
    
   
    </>
        
    
    
  )
}
