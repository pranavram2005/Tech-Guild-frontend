import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Register from './Register';
function Login(props) {
  const initialformstate = {email:"",password:""}
  const [nextpage,setNextPage] = useState(null)
  const [User,SetUser] = useState(initialformstate)
  const navigate = useNavigate();
  const handleLogin = (event)=>{
    const {name,value}=event.target
    SetUser({...User,[name]:value})
    }
  const loginSubmit = (event)=>{
    var correctData = props.Userdata.filter((user)=>user.email===User.email)  
    event.preventDefault()
    if (User.email === "admin" && User.password === "admin"){
        navigate('/admin');
    }else if(correctData.length === 0){
        alert("Invalid User")
    }
    else if(correctData[0].password === User.password){
      const matchedUser = correctData[0];
        navigate('/user',{ state: {user: matchedUser }})
    }
  }  
  return (
    <div className="i">
      
      <div><form onSubmit={loginSubmit}>
        <input type='text' onChange={handleLogin} placeholder='Email' name='email' value={User.email}/>
       <input type='password' onChange={handleLogin} placeholder='Password' name='password' value={User.password}/>
        <button type='submit'>Submit</button>
        </form></div>
    </div>
  );
}

export default Login;
