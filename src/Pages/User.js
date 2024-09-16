import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Doctable from './Doctable';
import Chat from './Message';
import './styles/navbar.css';
import './styles/home.css'
import { useNavigate } from 'react-router-dom';
import Video from './Video';

const ProjectTable = ({ Projectdata, fetchprojectdata, Userdata }) => {
    const location = useLocation();
    const { user } = location.state || {};
    const [effect, setEffect] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    const [Page,SetPage]=useState(2)
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Effect State:', effect);
    }, [effect]);

    const handleCheckboxChange = async (projectId, requirementId, currentStatus) => {
        try {
            const newStatus = !currentStatus;

            await axios.put(`http://localhost:5000/project/${projectId}/requirement/${requirementId}`, { status: newStatus });
            fetchprojectdata();
            setEffect(requirementId);  // Set the effect state to trigger rerender
            
            alert('Status updated successfully!');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status.');
        }
    };

    const handleSignIn = () => {
        setSignedIn(true);
        navigate('/'); // Navigate to home page after sign-in
    };

    return (
        <><div className='uhome'>
            <header>
                <nav>
                    <div className="nav-left">
                        <div className="logo">Logo</div>
                        <button onClick={()=>SetPage(1)}>Projects</button>
                        <button onClick={()=>SetPage(2)}>Collaborative Editing</button>
                        <button onClick={()=>SetPage(3)}>Chats</button>
                        <button onClick={()=>SetPage(4)}>Video Conference</button>
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
            
                <div className={`${Page===1?('p1'):('no')}`}><h1 className='text-center mt-3'>Project Management</h1>
            <div className='project-list'>
                {Projectdata.map((project) => (
                    project.requirements.filter((req) => req.id === user.uid).map((req) => (
                        <div className={`project-card ${req.status===true ? 'completed' : 'working'}`} key={req._id}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p><strong>Task:</strong> {req.task}</p>
                            <p>
                            <strong>Deadline:</strong> {project.deadline}</p>
                            <p>
                                <strong>Completion:</strong>
                                <button className={req.status===true ? 'done' : 'nodone'}
                                    type="checkbox"
                                    onClick={() => handleCheckboxChange(project._id, req._id, req.status)}
                                >{req.status ? "click to undo" : "click to complete"}</button></p>
                            <p>
                           <strong>Status:</strong>  {req.status ? "completed" : "not completed"}</p>
                        </div>
                    ))
                ))}</div>
            </div>

            <div className={`${Page===2?('p1'):('no')}`}>
            <h1 className='text-center mt-3'>Collaborative Editting</h1>
                <Doctable Userdata={Userdata} userID={user._id} /></div>
            

            <div className={`${Page===3?('p1'):('no')}`}>
                <Chat Userdata={Userdata} userID={user._id} /></div>
            <div className={`${Page===4?('p1'):('no')}`}><Video/></div>
            <div className='boxes'></div>
       </div> </>
    );
};

export default ProjectTable;
