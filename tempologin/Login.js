import React, { Component } from 'react'
import {Link} from 'react-router-dom';
// import './Login.css';
export default class Login extends Component {
 
    constructor(props){
        super(props);
		this.chartRef=React.createRef();
        this.state={
            Regclick:false,
			
        }
    }
    handleClick=()=>{
        this.setState({Regclick:true})
        console.log(this.state.Regclick)
    }
    render() {

    return (
        <>
<div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" class="btn solid" />
            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <Link to="#" className="social-icon">
                <i class="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i class="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i class="fab fa-google"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </form>
          <form action="#" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>

            <button class="btn" value="Sign up" onClick={this.handleClick}/>
            {console.log(this.state.Regclick)}
            <p class="social-text">Or Sign up with social platforms</p>
            <div class="social-media">
            <Link to="#" className="social-icon">
                <i class="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i class="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i class="fab fa-google"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button class="btn transparent" id="sign-up-btn" onClick={this.handleClick}>
              Sign up
            </button>
          </div>
          <img src="log.svg" class="image" alt="" />
        </div>
        <div className={this.state.Regclick ? 'sign-up-mode' : ''}>

        </div>

        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button class="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
     {/* <script src="LoginSelector.js">
     const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
</script> */}
     </>
        )
  }
}
