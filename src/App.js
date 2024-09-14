import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import User from './Pages/User';
import axios from 'axios';
import Register from './Pages/Register';
import Createproject from './Pages/Createproject';
function App() {
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
  
  return (
    <Router>
      <div className="App">
        <h2>Task Management</h2>
        <Routes>
          <Route path="/admin" element={<Admin Projectdata={Projectdata} Userdata={Userdata} fetchprojectdata={fetchprojectdata}/>} />
          <Route path="/" element={<Login Userdata={Userdata}/>} />
          <Route path="/user" element={<User Projectdata={Projectdata} fetchprojectdata={fetchprojectdata} />} />
          <Route path="/register" element={<Register fetchdata={fetchdata}/>} />
          <Route path="/createproject" element={<Createproject Userdata={Userdata} fetchprojectdata={fetchprojectdata}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
