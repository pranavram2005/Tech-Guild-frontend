import { useState } from 'react';
import axios from 'axios';

const Createproject = (props) => {
    const initialFormState = { title: "", description: "", requirements: [],deadline:"" };
    const [project, setProject] = useState(initialFormState);
    const [task, setTask] = useState(""); // for the requirement task input
    const [id, setId] = useState(""); // for the requirement id input
    const addReq = () => {
        // Validate and add requirement

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

    return (
        <>
            <div>
                <form onSubmit={handleProjectSubmit}>
                    <div className='mt-3 mb-3'>
                        <label className='form-label' htmlFor='title'>Title:</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            className='form-control'
                            onChange={handleProjectInput}
                            value={project.title}
                        />
                    </div>
                    <div className='mt-3 mb-3'>
                        <label className='form-label' htmlFor='description'>Description:</label>
                        <textarea
                            id='description'
                            name='description'
                            className='form-control'
                            onChange={handleProjectInput}
                            value={project.description}
                        />
                    </div>
                    <div className='mt-3 mb-3'>
                        <label className='form-label' htmlFor='task'>Requirements:</label>
                        <input
                            type='text'
                            id='task'
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className='form-control'
                            placeholder='Task'
                        />
                        <select
                            id='id'
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className='form-control'
                        >
                            <option value=''>Select ID</option>
                            {props.Userdata.map((u) => (
                                <option key={u.uid} value={u.uid}>{u.name}</option>
                            ))}
                        </select>
                       Deadline: <input type='date'
                            id='deadline'
                            name='deadline'
                            className='form-control'
                            onChange={handleProjectInput}
                            value={project.deadline}/>
                        <button
                            type='button'
                            className='btn btn-secondary mt-2'
                            onClick={addReq}
                        >
                            Add Requirement
                        </button>
                        <div>
                            {project.requirements.map((req, index) => (
                                <div key={index}>
                                    {req.id}: {req.task}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
}

export default Createproject;
