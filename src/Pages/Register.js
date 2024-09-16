import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Register = (props)=>{
    const initialformstate = {name:"",email:"",password:"",department:""}
  const [Reg,SetReg] = useState(initialformstate)
  const handleRegisterSubmit = async(event)=>{
    event.preventDefault();
    await axios.post('http://localhost:5000/register',Reg);
    props.fetchdata();
    SetReg(initialformstate);
    alert("Reg submitted successfully")
  }
  const handleRegisterInput = (event)=>{
    const {name,value}=event.target
    SetReg({...Reg,[name]:value})
    }
        
    return(
        <>
        <form onSubmit={handleRegisterSubmit}>
        {/* <div>
          <input type='text' id='name' name='name' className='form-control' placeholder='name' onChange={handleRegisterInput} value={Reg.name}/>
          <input type='text' id='email' name='email' className='form-control' placeholder='email' onChange={handleRegisterInput} value={Reg.email}/>
          <input type='text' id='password' name='password' className='form-control' placeholder='password' onChange={handleRegisterInput} value={Reg.password}/>
          <input type='text' id='department' name='department' className='form-control' placeholder='department' onChange={handleRegisterInput} value={Reg.department}/>
          </div>
          <button className='ghost1' type='submit'>Submit</button>
           */}
           <div class="form-floating">
           <input type='text' id='name' name='name' className='input' placeholder='Name' onChange={handleRegisterInput} value={Reg.name}/>
  </div>
  <div class="form-floating">
  <input type='text' id='email' name='email' className='input' placeholder='Email' onChange={handleRegisterInput} value={Reg.email}/>
  </div>
  <div class="form-floating">
  <input type='text' id='password' name='password' className='input' placeholder='Password' onChange={handleRegisterInput} value={Reg.password}/>
  </div>
  <div class="form-floating">
  <input type='text' id='department' name='department' className='input' placeholder='Department' onChange={handleRegisterInput} value={Reg.department}/>
  </div>
  <button className='ghost1' type='submit'>Submit</button>
        </form>
        </>
    )
}
export default Register;