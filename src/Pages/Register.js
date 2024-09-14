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
        <div> <form onSubmit={handleRegisterSubmit}>
        <div className='mt-3 mb-3'>
          <label className='form=label' htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' className='form-control' onChange={handleRegisterInput} value={Reg.name}/>
          </div>
          <div className='mt-3 mb-3'>
          <label className='form=label' htmlFor='email'>Email:</label>
          <input type='text' id='email' name='email' className='form-control' onChange={handleRegisterInput} value={Reg.email}/>
          </div>
          <div className='mt-3 mb-3'>
          <label className='form=label' htmlFor='password'>Password:</label>
          <input type='text' id='password' name='password' className='form-control' onChange={handleRegisterInput} value={Reg.password}/>
          </div>
          <div className='mt-3 mb-3'>
          <label className='form=label' htmlFor='department'>Role:</label>
          <input type='text' id='department' name='department' className='form-control' onChange={handleRegisterInput} value={Reg.department}/>
          </div>
    
          <button className='btn btn-primary' type='submit'>Submit</button>
          
        </form></div>
        </>
    )
}
export default Register;