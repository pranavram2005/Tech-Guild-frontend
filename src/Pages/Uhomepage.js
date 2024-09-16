import React, { useEffect, useState } from 'react';
import Login from "./Login"
import Register from "./Register"
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/user.css'
import Video from './Video';
const Uhomepage = ()=>{
    const [Userdata,SetUserdata] = useState([])
  async function fetchdata(){
    const response = await axios.get("http://localhost:5000/register");
    SetUserdata(response.data);
    }
  
  useEffect(()=>{
    fetchdata();
  },[]);
  const [Projectdata,SetProjectdata] = useState([])
  async function fetchprojectdata(){
    const response = await axios.get("http://localhost:5000/project");
    SetProjectdata(response.data);
    }
  
  useEffect(()=>{
    fetchprojectdata();
  },[]);
  const [Signups,SetSignups] = useState(false)

  
    return(
 

    
    

    <div className="auth-container">
<div className={`container ${Signups?("right-panel-active"):null}`} id="container">
	<div class="form-container sign-up-container">
		<div className='register-page'>
			<h1 className='text-center'>Create Account</h1>
			<div class="social-container">
            <Register  fetchdata={fetchdata}/>
            </div>
			</div>
            </div>
	<div class="form-container sign-in-container">
		
			<h1 className='text-center'>Sign in</h1>
			<div class="social-container">
			</div>
			
			<Login Userdata={Userdata}/>
			
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us, please login with your personal info</p>
				<button class="ghost" id="signIn" onClick={()=>SetSignups(false)}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp" onClick={()=>SetSignups(true)}>Sign Up</button>
			</div>
		</div>
	</div>
</div>

    </div>
 
    )
}
export default Uhomepage;