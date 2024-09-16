import { Link } from 'react-router-dom';
import axios from 'axios';
import Doctable from './Doctable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/admin.css'
import './styles/home.css'
const Admin = (props) => {
  const DeleteRow = async(id) =>{
    await axios.delete('http://localhost:5000/project/'+id);
    props.fetchprojectdata();
    alert("Data deleted successfully")
  }
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = () => {
    setSignedIn(true);
    navigate('/'); // Navigate to home page after sign-in
};
    return (
        <>
        <header>
                <nav>
                    <div className="nav-left">
                        <div className="logo">Logo</div>
                        <Link to="/admin"><button>Projects</button></Link>
                        <Link to="/createproject"><button>Create Project</button></Link>                        
                    </div>
                    <div className="nav-right">
                        {signedIn ? (
                            <img src="profile-icon.png" alt="Profile Icon" className="profile-icon" />
                        ) : (
                            <button onClick={handleSignIn}>Logout</button>
                        )}
                    </div>
                </nav>
            </header>
            <h1 className='text-center'>ADMIN</h1>
            <h2 className='text-center'>MEMBERS</h2>
            <table className='table members'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {props.Userdata.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.department}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1 className='text-center'>Projects</h1>
            <div className='griod'>
                {props.Projectdata.map((p) => (
                    <div key={p._id} className='project-card'>
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <p><strong>Deadline:</strong> {new Date(p.deadline).toLocaleDateString()}</p>
                        <p><strong>Requirements:</strong></p>
                       <table className='table table-bordered'>
                        <tr><th>Name</th><th>Task</th><th>Status</th></tr>
                            {p.requirements.length > 0 ? (
                                p.requirements.map((r) => {
                                    // Find the user associated with the requirement
                                    const user = props.Userdata.find((u) => u.uid === r.id);

                                    return (
                                        <tr>
                                            <td>{user ? user.name : 'User not found'}</td>
                                            <td>{r.task}</td>
                                            <td>{r.status ? 'Completed' : 'Not Completed'}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>No requirements</tr>
                            )}
                        </table>
                        <button className='del btn bg-danger text-light' onClick={()=>DeleteRow(p._id)}>DELETE</button>
                    </div>
                ))}
            </div>
            <div className='boxes'></div>
        </>
    );
};

export default Admin;
