import { useState } from 'react';
import axios from 'axios';
import './styles/project.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Createproject = (props) => {
    const initialFormState = { title: "", description: "", requirements: [],deadline:"" };
    const [project, setProject] = useState(initialFormState);
    const [task, setTask] = useState(""); 
    const [id, setId] = useState(""); 
    const addReq = () => {

        if (task && id ) {
            setProject(prev => ({
                ...prev,
                requirements: [...prev.requirements, { id: Number(id), task }]
            }));
            setTask(""); 
            setId(""); 
        }
    };

    const handleProjectInput = (event) => {
        const { name, value } = event.target;
        setProject(prev => ({ ...prev, [name]: value }));
    };

    const handleProjectSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/project', project);
            props.fetchprojectdata();
            setProject(initialFormState);
            alert("Project submitted successfully");
        } catch (err) {
            alert("Error submitting project: " + err.message);
        }
    };
    const navigate = useNavigate();
    const [signedIn, setSignedIn] = useState(false);
  
    const handleSignIn = () => {
      setSignedIn(true);
      navigate('/'); 
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
                <form onSubmit={handleProjectSubmit}>
                <div className="form-section">
                <h1>Add Project</h1>

                        <input
                            type='text'
                            id='title'
                            name='title'
                            onChange={handleProjectInput}
                            value={project.title}
                            placeholder='Title'
                        />
                        <textarea
                            id='description'
                            name='description'
                            placeholder='Description'
                            onChange={handleProjectInput}
                            value={project.description}
                        />
                       <div className='tasks'><div> <input
                            type='text'
                            id='task'
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder='Task'
                        />
                        <select
                            id='id'
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        >
                            <option value=''>Select email</option>
                            {props.Userdata.map((u) => (
                                <option key={u.uid} value={u.uid}>{u.email}-{u.name}</option>
                            ))}
                        </select>
                        <button
                            type='button'
                            className='btn btn-secondary mt-2'
                            onClick={addReq}
                        >
                            Add Requirement
                        </button></div><div className='reqs'>
                            {project.requirements.map((req, index) => (
                                <div key={index}>
                                    {req.id}: {req.task}
                                </div>
                            ))}
                    </div> </div><input type='date'
                            id='deadline'
                            name='deadline'
                            onChange={handleProjectInput}
                            value={project.deadline}/>
                      
                        
                       
                    <button className='btn btn-primary' type='submit'>Submit</button>
                          </div>
  </form>
        </>
    );
}

export default Createproject;
