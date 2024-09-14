import { Link } from 'react-router-dom';
import axios from 'axios';

const Admin = (props) => {
  const DeleteRow = async(id) =>{
    await axios.delete('http://localhost:5000/project/'+id);
    props.fetchprojectdata();
    alert("Data deleted successfully")
  }
    return (
        <>
            <h2>Admin</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {props.Userdata.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.department}</td>
                            <td>
                                <input type="checkbox" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Link to="/createproject">Create a Project</Link>
            </div>
            <div>
                {props.Projectdata.map((p) => (
                    <div key={p._id}>
                        <strong>Title:</strong> {p.title}<br />
                        <strong>Description:</strong> {p.description}<br />
                        <strong>Deadline:</strong> {new Date(p.deadline).toLocaleDateString()}<br />
                        <strong>Requirements:</strong>
                        <ul>
                            {p.requirements.length > 0 ? (
                                p.requirements.map((r) => {
                                    // Find the user associated with the requirement
                                    const user = props.Userdata.find((u) => u.uid === r.id);

                                    return (
                                        <li>
                                            <div>{user ? user.name : 'User not found'}</div>
                                            <div>{r.task}</div>
                                            <div>{r.status ? 'Completed' : 'Not Completed'}</div>
                                        </li>
                                    );
                                })
                            ) : (
                                <li>No requirements</li>
                            )}
                        </ul>
                        <button onClick={()=>DeleteRow(p._id)}>DELETE</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Admin;
