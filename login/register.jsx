import React from 'react';
import loginImg from "./loginImg.jpg";
import axios from 'axios'
import { Link } from 'react-router-dom';
import {Navigate} from 'react-router-dom'

export class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {name:"",
        email:"",
        pswd:"",
        register:false,
        
        }
    }
    

    handleSubmit = e => {
        e.preventDefault();

        console.log("Nameee:::",this.state.name)
        console.log("Email:::",this.state.email)
        console.log("pass:::",this.state.pswd)
        const qs=require('qs')
            axios.post('http://127.0.0.1:8000/addUser',qs.stringify({   
                name : this.state.name,
                email : this.state.email,
                password : this.state.pswd,               
                
            })).then(response=>
                console.log(response)
            );
            localStorage.setItem("name", this.state.name);
            this.setState({register: true})
            //alert("Registered successfully!")
            console.log(this.state.register)
            //window.location.href='http://127.0.0.1:8000/upload';

        }
        

    

    handleChange = e=>{
        const {name, value} = e.target;
        this.setState({[name]:value});
    }

    render() {
        if (this.state.register) {
            return <Navigate to={{pathname:"/upload"}} />;}
        return (
        <div className="base-container">
            <form onSubmit={this.handleSubmit}>
            <div className="header">Login</div>
            <div className="content">
            <div className="image">
                <img src={loginImg} />
            </div> 
            <div className="form11">
                <div className="form-group11">
                    <label htmlFor="username" className='label11'>Username<sup>*</sup></label>
                    <input type="text" name="name" className='input11' placeholder="Enter your username" required onChange={this.handleChange}/>
                </div>
               

                <div className="form-group11">
                    <label htmlFor="email" className='label11'>Email<sup>*</sup></label>
                    <input type="email" name="email" className='input11' placeholder="Enter your email" required onChange={this.handleChange}
                     pattern="+@." title="Invalid email"/>
                </div>
           
                <div className="form-group11">
                    <label htmlFor="password" className='label11'>Password<sup>*</sup></label>
                    <input type="password" name="pswd" className='input11' placeholder="Enter your password" required onChange={this.handleChange}
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase
                      and lowercase letter, and at least 8 or more characters" />
                </div>
                
               
            </div>
                
            </div>
                {console.log(this.state.register)}
                
                {/* {this.state.register &&  <Link to="/upload">Submit</Link>} */}
               
                <button type="submit"  className="btn11">Register</button>
                {/* <Link to="/upload" classname="btn11" onClick={this.handleSubmit}></Link> */}
            </form>
        </div>
        );
    }
}