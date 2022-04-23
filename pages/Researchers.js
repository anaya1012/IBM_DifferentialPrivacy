import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFileDownloader from "./hooks/useFileDownloader";

import './Researchers.css';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa"
import * as BiIcons from "react-icons/bi"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import { useState } from 'react';

const files = [
  {
    name: "Halloween",
    description:"This is an image of a pumpkin in Halloween",
    author:"Aditi",
    thumb:
      "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=427&q=80 427w",
    file:
      "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?rnd=" +
      Math.random(),
    filename: "photo-1.jpg",
  },
  {
    name: "Tree",
    description:"This is an image of a tree at night",
    author: "Vallari",

    thumb:
      "https://images.unsplash.com/photo-1604164388977-1b6250ef26f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80 401w",
    file:
      "https://images.unsplash.com/photo-1604164388977-1b6250ef26f3?rnd=" +
      Math.random(),
    filename: "photo-2.jpg",
  },
  {
    name: "Book",
    description:"This is an image of a book placed on a study table",
    author: "irawati",
    thumb:
      "https://images.unsplash.com/photo-1604264849633-67b1ea2ce0a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
    file:
      "https://images.unsplash.com/photo-1604264849633-67b1ea2ce0a4?rnd=" +
      Math.random(),
    filename: "photo-3.jpg",
  },
];


const FileDownloader = () => {

  const [downloadFile, downloaderComponentUI] = useFileDownloader();
  const [upVotes, incrementVotes] = useState(0);
  const download = (file) => downloadFile(file);

  return (
    <>
      

      <div className="row">
        <div className="col text-center">
          <br></br>
          <h2>Genomic datasets</h2>
          <br></br>
          <div className="searchBox">
                <span className="magnify"><AiIcons.AiOutlineSearch />  
                <input type="text" name="searchPhrase" placeholder= "Search" /> 
                </span>
               
          </div> 
          <div className="row">
            {files.map((file, idx) => (
              <div className="col" key={idx}>
                <Card style={{width: '20rem', borderRadius:10, boxShadow: "0 5px 8px 0"}}>
                <Card.Img variant="top" src={file.thumb} style={{height:"200px"}} />
                  <Card.Body>
                    <Card.Title>{file.name}</Card.Title>
                    <Card.Text>{file.description}</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  <ListGroupItem>Author: {file.author}</ListGroupItem>
                  <ListGroupItem>File desc: {file.description}</ListGroupItem>
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