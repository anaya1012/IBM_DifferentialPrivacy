import React from 'react'
import { CssBaseline, Paper, makeStyles } from '@material-ui/core'
import { padding } from '@mui/system'
import FileUpload from '../components/FileUpload';

const useStyle = makeStyles(theme => ({
    pageContent :{
        
        margin: theme.spacing(5),
        padding: theme.spacing(3)

    }
}))


export default function DataContributerMain() {

    const classes = useStyle();
  return (
    
    <>
    
    

    <Paper
    style={{ marginLeft: "300px", border: "1px solid black" }}
    className={classes.pageContent}>
      <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      <i className='fab fa-react' /> Dataset Upload
    </h4>  </div>
      <FileUpload />
    </Paper>

    

    
    
    
   
    </>
        
    
    
  )
}
