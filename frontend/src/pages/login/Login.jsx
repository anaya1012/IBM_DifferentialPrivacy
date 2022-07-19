import React from 'react';
import loginImg from './loginImg.jpg'
import {Navigate} from 'react-router-dom'
import axios from 'axios'

//import  * as userService  from '../../service/UserService';

export const UsernameContext = React.createContext('');

export class Login extends React.Component {

    
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            islogged: 0,
            validity:[]
          };
        //   this.userService=new UserService();
          this.login=this.login.bind(this)
    }

    handleChange = e=>{
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]:value});
        console.log(this.state.username)
        // this.userService.setUser(this.state.username);
        //userService.setUser(this.state.username)
    }

    login = event => {
        //console.log(this.state.islogged)
        
        axios.get('http://localhost:8000/validateLogin',{
            params:{"email": this.state.username,
            "password": this.state.password
        }
        }).then((res) => {
            this.setState({islogged:res.data.valid})
            console.log(res.data.valid)
            if(res.data.valid===0)
            {
                console.log(res.data.valid)
                alert("Invalid username or password")
            }
            else
                localStorage.setItem('name',res.data.name);
                
            
        });
        // this.props.onSubmit(this.state.username)
        event.preventDefault();
      };

    render() {
        // <UsernameContext.Provider value={this.state.username}></UsernameContext.Provider>
        if (this.state.islogged===1) {
            return <Navigate to={{pathname:"/upload"}} />;
        }      
          
            
          
        return <div className="base-container" >
            <form onSubmit={this.login} className="form-signin">
            <div className="header">Login</div>
            <div className="content">
             <div className="image">
                 <img src={loginImg} /> 
            </div> 
            <div className="form">
                <div className="form-group">
                    <label htmlFor="username">Email ID:</label>
                    <input type="text" name="username" placeholder="Enter your registered email" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" onChange={this.handleChange}/>
                </div>
            </div>
            </div>
            {/* <div className="footer"> */}
                <button type="submit" value="Login" className="btn">Login</button>
            {/* </div> */}
            </form>
          
        </div>
    }
}