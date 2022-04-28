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
        
        axios.get('http://127.0.0.1:8000/validateLogin',{
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
          
            
          
        return <div className="base-container11" >
            <form onSubmit={this.login} className="form-signin">
            <div className="header11">Login</div>
            <div className="content11">
             <div className="image11">
                 <img src={loginImg}  /> 
            </div> 
            <div className="form11">
                <div className="form-group11">
                    <label htmlFor="username" className='label11'>Email ID:</label>
                    <input type="text" name="username" className='input11' placeholder="Enter your registered email" onChange={this.handleChange}/>
                </div>
                <div className="form-group11">
                    <label htmlFor="password" className='label11'>Password</label>
                    <input type="password" name="password" className='input11' placeholder="Enter your password" onChange={this.handleChange}/>
                </div>
            </div>
            </div>
            {/* <div className="footer"> */}
                <button type="submit" value="Login" className="btn11">Login</button>
            {/* </div> */}
            </form>
          
        </div>
    }
}