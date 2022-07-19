import React, { useEffect,useRef } from 'react'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import useFileDownloader from "./hooks/useFileDownlaoder";
import { variables } from './Variables';
import './Researchers.css';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa"
import * as BiIcons from "react-icons/bi"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import { useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv'

const imageSelect =[ "https://media.istockphoto.com/photos/glowing-and-shining-dna-strands-double-helix-closeup-medical-biology-picture-id1195280829?k=20&m=1195280829&s=612x612&w=0&h=GKzMXhNbb5vjXoCbKFUzMpSjOe8rBcfEEKjcajyUpu8=",
"https://www.ashg.org/wp-content/uploads/2021/01/DiscoverGenetics-6things.png",
"https://www.york.ac.uk/media/study/courses/undergraduate/biology/Genetics-bsc-banner.jpg",
"https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2014/7/Genetics-620x480.jpg",
"https://cdn4.vectorstock.com/i/1000x1000/65/43/dna-helix-genetics-and-science-vector-18716543.jpg"
  
]
const FileDownloader = () => {
  const [linkRef,setlinkRef]=useState(React.createRef());
  //const [downloadFile, downloaderComponentUI] = useFileDownloader();
  const [transactionData, setTransactionData] = useState([])
  const csvLink = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
  const [downloadFilename, setDownloadFilename] = useState('file.csv');
  const [upVotes, incrementVotes] = useState(0);
  //const download = (file) => downloadFile(file);
  const [files,setFiles] = useState([]);
  const [tempFiles, setTempFiles] = useState([]);
  const [hasLiked, like] = useState(false)
const handleLike =(tags) => (event) =>{
  console.log(tags)
  console.log(tags.likes)
  incrementVotes(tags.likes+1)
    if(!hasLiked)
    {
      incrementVotes(upVotes+1)
    }
    else{
      incrementVotes(upVotes-1)
    }
    like(!hasLiked)
   
    // axios.post(variables.API_URL+'like',{tags.filename,tags.l}).then({
      
    // })
  }

  const handleSearch = (search) =>{
    
    var ans=[]
    
    setFiles(tempFiles)
    
    tempFiles.map((files,idx)=>{
     
      var filename = files['filename'].toLowerCase()
       if(filename.includes(search))
       {
        
         ans.push(files)
       }
  
    })
   
    setFiles(ans)
    
  
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
   
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
      setTempFiles(resp.data.value)
      //console.log(files)
      //console.log(resp.data.value)
    }  )},[]
    )
  
    const getFileToDownload = async (fileToFetch) =>{
      console.log(fileToFetch)
      await axios.post(variables.API_URL+'download', fileToFetch)
    //   .then(res => {
    //     return res.blob();
    // }).then(blob => {
    //     const href = window.URL.createObjectURL(blob);
    //     const a = linkRef;
    //     a.download = 'Lebenslauf.pdf';
    //     a.href = href;
    //     a.click();
    //     a.href = '';
    // }).catch(err => console.error(err));
      .then((r) => {
        setTransactionData(r.data.csvlist)
        console.log(r.data.csvlist)
        setDownloadFilename(fileToFetch)
      }
      )
      .catch((e) => console.log(e))

      csvLink.current.link.click()
      // }
  }
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
            
            {
            
            files.map((file, idx) => (
              
              <div className="col" key={idx}>
                {/* {console.log("Hello",files)} */}
                <Card style={{width: '20rem', borderRadius:10, boxShadow: "0 5px 8px 0"}}>
                <Card.Img variant="top" src ={ imageSelect[Math.floor(Math.random() * (5))] } style={{height:"200px"}} />
                  <Card.Body>
                    <Card.Title>{file.filename}</Card.Title>
                    <Card.Text>{file.description}</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  <ListGroupItem>Author: {file.author}</ListGroupItem>
                  
                </ListGroup>
                <div className="flex-parent jc-center">
                <Button className="btn_dwd" onClick={() => getFileToDownload(file.filename)}>
                      Download <FaIcons.FaDownload/>
                </Button>
                <CSVLink
         data={transactionData}
         filename= {downloadFilename}
         className='hidden'
         ref={csvLink}
         target='_blank'
      />
                <Button className={hasLiked?"buttonTrue":"buttonFalse"} onClick= {handleLike(file)} style={{height: "50px", top: "20px"}}>
                  Likes {hasLiked?<AiIcons.AiFillLike/>:<AiIcons.AiOutlineLike/>} : {upVotes} 
                  </Button>
          
                </div>
                </Card>
              </div>
            ))} 
          </div>
        </div>
        
      </div>
    </>
  );
};

export default FileDownloader;