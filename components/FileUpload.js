
import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    //console.log("On chnage");
    //console.log(e.target.files[0])
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setUploadPercentage(0)
    setDescription('');
    setMessage('');
    console.log(file);
  };

  const reset = e => {
    setFile('');
    setFilename('Choose File');
    setUploadPercentage(0)
    setDescription('');
    setMessage('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    //console.log("submittt",file)
    const formData = new FormData();
    if(file == '')
    {
      setMessage("Please select file!")
    }
    else
    {
      //console.log("file",file)
      formData.append('file', file);
      formData.append('description', description);
      formData.append('filename', filename);
      formData.forEach(v=>console.log(v))

    try {
      const res = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
    
      //setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

     
        setMessage('File Uploaded');
      
        
     
      //console.log("Done!")
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      // setUploadPercentage(0)
    }
    }
    
  };

  return (
    <Fragment>
     
      {message != '' ? <Message msg={message} openState={true} /> : null}
      <form onSubmit={onSubmit}>
        <div className='form-group' style={{marginTop: "40px", marginBottom: "15px"}}>
          <input
            type='file'
            className='form-control'
            id='customFile'
            accept='.csv'
            onChange={onChange}
          />
          {/* <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label> */}
        </div>

        <div className="form-group" style={{marginBottom : "40px"}}>
             <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Description"
              name="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        <Progress percentage={uploadPercentage} />

        <input style={{marginRight: "50px"}}
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
        <input 
          type='button'
          value='Reset'
          onClick={reset}
          className='btn btn-primary btn-block mt-4'
        />
      </form>
       {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            
          </div>
        </div>
      ) : null} 


    </Fragment>
  );
};

export default FileUpload;