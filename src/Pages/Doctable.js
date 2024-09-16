import { useState,useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Editor from "./Editor"
import './styles/editor.css'
const Doctable = (props)=>{
    const UID = props.userID
    const Members = props.Userdata
    const [active,SetActive] = useState(false)
    const [Title,SetTitle]= useState("")
    const Createdocument = async(event)=>{
    event.preventDefault();
    await axios.post('http://localhost:5000/documents',{title:Title,owner:UID});
    SetTitle("");
    alert("Document Created")
    }
    const [Documenttable,SetDocumenttable] = useState([])
    async function fetchdoc(){
    const response = await axios.get("http://localhost:5000/document_view");
    SetDocumenttable(response.data);
    }
  
  useEffect(()=>{
    fetchdoc();
  },[]); 
  const SetActive1 =(id)=>{
    if (active===id){
        SetActive(null)
    }else{
        SetActive(id)
    }
  }
  
    return(
        <>
        <div className="list">
            <form onSubmit={Createdocument}>
        <label className="text-dark">Create New Document:</label><input type="text" className="search" name="title" value={Title} onChange={(e)=>SetTitle(e.target.value)}/>    
        <button>CREATE</button>
        </form>
        <table className="table table-bordered">
            <tr className="bg-light text-dark"><th>Title</th><th>Owner</th><th>Created At</th><th>Write</th></tr>
            <tbody>
                {Documenttable.map((doc)=>{
                    const yu = Members.find((m)=>(m._id===doc.owner))
                    return(
                    <tr key={doc._id}>
                        <td>{doc.title}</td>
                        <td>{yu.name}</td>
                        <td>{doc.lastModified}</td>
                        <td><button onClick={()=>SetActive1(doc._id)}>WRITE</button>
                        <div className={`document ${active===doc._id?"show":"hide"}`}>
                            <h2 className="text-center">{doc.title}</h2>
                            <Editor documentId={doc._id}/></div></td>
                        </tr>
                        
                        
               ) })}
            </tbody>
        </table>
        
        </div>
        </>
    )
}
export default Doctable;