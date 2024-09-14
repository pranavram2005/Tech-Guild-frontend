import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProjectTable = ({ Projectdata,fetchprojectdata }) => {
    const location = useLocation();
  const { user } = location.state || {};

    const [effect,SetEffect] = useState(false)
    const handleCheckboxChange = async (projectId, requirementId, currentStatus) => {
        try {
            const newStatus = !currentStatus;

            await axios.put(`http://localhost:5000/project/${projectId}/requirement/${requirementId}`, { status: newStatus });
            fetchprojectdata()
            if (newStatus===true){
                SetEffect(projectId)
            }
            else{
                SetEffect("")
            }
            alert('Status updated successfully!');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status.');
        }
    };
    

    return (
       <div>{Projectdata.map((project) => (
        project.requirements.filter((u)=>(u.id===user.uid)).map((req) => (
            (<div className={`${effect===project._id?`hi`:null}`} key={req._id}>
                {user.email}
                Name:{project.title}<br/>
                Description:{project.description}<br/>
                Task:{req.task}<br/>
                Deadline:{project.deadline}
                    Completion:<input
                        type="checkbox"
                        checked={req.status}
                        onChange={() => handleCheckboxChange(project._id, req._id, req.status)}
                    /><br/>
                
                Status:{req.status ? "completed" : "not completed"}
            </div>)
        ))
    ))}</div>
    );
}

export default ProjectTable;
