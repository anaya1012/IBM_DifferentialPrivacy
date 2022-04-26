import React, { useEffect } from 'react'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFileDownloader from "./hooks/useFileDownlaoder";
import { variables } from './Variables';
import './Researchers.css';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa"
import * as BiIcons from "react-icons/bi"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import { useState } from 'react';
import axios from 'axios';

const files1= [{filename: 'sample_submission.csv', description: 'Sample dataset'}]

const FileDownloader = () => {

  const [downloadFile, downloaderComponentUI] = useFileDownloader();
  const [upVotes, incrementVotes] = useState(0);
  const download = (file) => downloadFile(file);
  const [files,setFiles] = useState([]);
  // useEffect(()=>{
  //   const getFiles=async () => {await axios.get(variables.API_URL+'fetch')
  // .then(resp=>{
    
  //   //console.log(resp.data.value[0])
    
  //   resp.data.value.map((data,index)=>{
  //     files.push(data)
  //     setFiles([...files])})
  //     console.log(typeof(files))
  //   console.log("Files:: ",files)
  // })
  // }
  // getFiles()
  // })

  const handleSearch = (search) =>{
    console.log(search)
    console.log(files)
    var ans=[]
    files.map((files,idx)=>{
      console.log(files['filename'])
      console.log(files)
      var filename = files['filename'].toLowerCase()
       if(filename.includes(search))
       {
         console.log()
         ans.push(files)
       }
    })
    console.log(ans)
    setFiles(ans)
    console.log("Final files",files)
  
  }
        // if(search.length==0)
        // {
        //     this.setState({ideas:this.state.allIdeas})
        // }
        // else
        // {
        //     this.setState({ideas: res.data})
        //     console.log(this.state.ideas)
        // }
  


  const handleSearchChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
        // const {name, value} = e.target;
        // this.setState({[name]:value});
        //setTimeout(() =>{this.handleSearch(e.target.value) },3000)
        handleSearch(e.target.value)
  }
  useEffect(() => {
    var data;
    axios.get(variables.API_URL+'fetch')
    .then(resp=>{
      setFiles(resp.data.value)
      //console.log(files)
      //console.log(resp.data.value)
    }  )})
  
  
  return (
    <>
      

      <div className="row">
        <div className="col text-center">
          <br></br>
          <h2>Genomic datasets</h2>
          <br></br>
          <div className="searchBox">
                <span className="magnify"><AiIcons.AiOutlineSearch />  
                <input type="text" name="searchPhrase" placeholder= "Search" onChange={handleSearchChange}/> 
                </span>
               
          </div> 
          <div className="row">
            {/* {console.log(files1)}
           {console.log((files))}
           {console.log((files[0]))}
           {console.log((Object.values(files)))}
           {console.log(typeof(files))} */}
           {/* {getData()} */}
            {
            
            files.map((file, idx) => (
              
              <div className="col" key={idx}>
                {/* {console.log("Hello",files)} */}
                <Card style={{width: '20rem', borderRadius:10, boxShadow: "0 5px 8px 0"}}>
                <Card.Img variant="top" src="https://media.istockphoto.com/photos/glowing-and-shining-dna-strands-double-helix-closeup-medical-biology-picture-id1195280829?k=20&m=1195280829&s=612x612&w=0&h=GKzMXhNbb5vjXoCbKFUzMpSjOe8rBcfEEKjcajyUpu8=" style={{height:"200px"}} />
                  <Card.Body>
                    <Card.Title>{file.filename}</Card.Title>
                    <Card.Text>{file.description}</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  <ListGroupItem>Author: Author</ListGroupItem>
                  <ListGroupItem>File desc: File description</ListGroupItem>
                </ListGroup>
                <div className="flex-parent jc-center">
                <Button className="btn_dwd" onClick={() => download(file)}>
                      Download <FaIcons.FaDownload/>
                </Button>
         
                <Button clasName="btn_up" onClick= {() => incrementVotes(upVotes+1)}style={{height: "50px", top: "20px"}}>Upvote<BiIcons.BiUpvote/>: {upVotes} </Button>
          
                </div>
                </Card>
              </div>
            ))} 
          </div>
        </div>
        {downloaderComponentUI}
      </div>
    </>
  );
};

export default FileDownloader;