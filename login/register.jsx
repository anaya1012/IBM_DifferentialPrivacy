import React from 'react';
import loginImg from "./loginImg.jpg";
import axios from 'axios'

export class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {name:"",
        email:"",
        pswd:"",
        country:"",
        
        }
    }
    

    handleSubmit = e => {
        e.preventDefault();

        
            
            axios.post('http://localhost:8080/addUser',{   
                "name" : this.state.name,
                "email" : this.state.email,
                "password" : this.state.pswd,
                "country":this.state.country,
                "ideasSubmitted":[]
            });
        
            alert("Registered successfully!")
            window.location.reload(false);

        }
        

    

    handleChange = e=>{
        const {name, value} = e.target;
        this.setState({[name]:value});
    }

    render() {
        return (
        <div className="base-container">
            <form onSubmit ={this.handleSubmit}>
            <div className="header">Login</div>
            <div className="content">
            <div className="image">
                <img src={loginImg} />
            </div> 
            <div className="form">
                <div className="form-group">
                    <label htmlFor="username">Username<sup>*</sup></label>
                    <input type="text" name="name" placeholder="Enter your username" required onChange={this.handleChange}/>
                </div>
               

                <div className="form-group">
                    <label htmlFor="email">Email<sup>*</sup></label>
                    <input type="email" name="email"  placeholder="Enter your email" required onChange={this.handleChange}
                     pattern=".+@db\.com" title="Invalid email"/>
                </div>
           
                <div className="form-group">
                    <label htmlFor="password">Password<sup>*</sup></label>
                    <input type="password" name="pswd" placeholder="Enter your password" required onChange={this.handleChange}
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase
                      and lowercase letter, and at least 8 or more characters" />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country"  placeholder="Enter your country"  onChange={this.handleChange}/>
                </div>
                
            </div>
                
            </div>
            
            
                <button type="submit"  className="btn">Register</button>
                
            </form>
        </div>
        );
    }
}