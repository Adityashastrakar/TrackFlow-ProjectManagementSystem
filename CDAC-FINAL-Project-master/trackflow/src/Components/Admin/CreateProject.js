import React, { useRef ,useState, useEffect , useReducer} from 'react'
import { useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import GetAllProject from './GetAllProject';
import { ToastContainer, toast } from 'react-custom-alert';

export default function CreateProject() {
    let navigate = useNavigate();
    const ref = useRef(null);
    const projectRef = useRef(null);

    const openModal = () => {
        projectRef.current.click();
    };

    const [managers, setManagers] = useState([]);
    const [clients, setClinets] = useState([]);

    const init = {
        title: '',
        techstack: '',
        description: '',
        deadline: '',
        comments:'',
        empid:0,
        clientid:0
    }

    const reducer = (state,action) => {
        switch(action.type){
            case 'update':
                return {...state,[action.fld]:action.val}
            case 'reset':
                return init;
        }
    }

    const [project ,dispatch] =useReducer(reducer,init);

    const sendData = (e) => {
        e.preventDefault(); 
    
        fetch('http://localhost:8080/createProject', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(project) 
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add project');
            }
        })
        .then(obj => {
            toast.success('Created Project Successfully!');
            setTimeout(() => navigate('/ADMIN/ShowProject'), 1000);
        })
        .catch(error => {
            console.error('Error adding project:', error);
        });
    };
    

    useEffect(() => {
        fetch('http://localhost:8080/getManagers', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setManagers(data);
        })
        .catch(error => {
            console.error('Error fetching managers:', error);
        });
    }, []);
    

      useEffect(() => {
        fetch('http://localhost:8080/getClients',{
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            setClinets(data);
        })
        .catch(error => {
          console.error('Error fetching managers:', error);
        });
      }, []);

  return ( 
             <div className="container d-flex justify-content-center ">
            <LoadingBar color="#f11946" ref={ref} shadow={true} /> 
            <ToastContainer floatingTime={5000} />
            <div className='container d-flex justify-content-center'>
                <div className=" shadow-lg p-4 m-5" style={{"width": '40rem'}}>
                    <h5 className="d-flex mb-4 text-dark"><b>Add New Project</b></h5>      
                    <form onSubmit={sendData}>
                        <div className="mb-3">   
                            <label className='text-dark'><h6>Project Title</h6></label>
                            <input  type="text" placeholder="e.g. TrackFlow - Task Progress Manager" className="form-control" name='title' 
                            value={project.title} onChange={(e)=>{dispatch({type:'update',fld:'title', val: e.target.value})}} required />
                        </div>
                        <div className="mb-3">   
                        {/* e.target.value */}
                            <label className='text-muted'><h6>Description</h6></label> 
                            <textarea placeholder="e.g. Create a Task Progress Manager system for......" rows="8" className="form-control" name='description' 
                            value={project.description} onChange={(e)=>{dispatch({type:'update',fld:'description', val: e.target.value})}} required/>
                        </div>
                        <div className="mb-3">   
                            <label className='text-muted'><h6>Techstack</h6></label>
                            <input  type="text" placeholder="e.g. MERN Stack, Mysql for db,......." className="form-control" name='techstack' 
                            value={project.techstack} onChange={(e)=>{dispatch({type:'update',fld:'techstack', val: e.target.value})}} required/>
                        </div>


                            <div className="mb-3">   
                                <label className='text-muted'><h6>Comments</h6></label>
                                <textarea placeholder="e.g. Create a Task Progress Manager system for......" rows="8" className="form-control" name='comments' 
                                value={project.comments} onChange={(e)=>{dispatch({type:'update',fld:'comments', val: e.target.value})}} required/>
                            </div>
                            <div className='row form-group '>
                                <div className='text-muted col-6 fs-6'>
                                <label className='text-muted'><h6>Select Manager</h6></label>                                    
                                <select className='form-select' id="empid" name='empid' onChange={(e) => { dispatch({ type: 'update', fld: 'empid', val: e.target.value }) }} required>
                                        <option className='text-muted fs-6' key={1} value="" selected>Select a Manager</option>
                                        {managers.map(manager => (
                                            <option className='text-muted fs-6' key={manager.empId} value={manager.empId}>{manager.fullName}</option>
                                        ))}
                                    </select>   
                                </div>
                                <br/>    
                                <div className='text-muted col-6 fs-6'>
                                <label className='text-muted'><h6>Select Client</h6></label>
                                    <select className='form-select' id="clientid" name='clientid' onChange={(e) => { dispatch({ type: 'update', fld: 'clientid', val: e.target.value }) }} required>
                                        <option className='text-muted fs-6' key={1} value="" selected>Select a Client</option>
                                        {clients.map(client => (
                                            <option className='text-muted fs-6' key={client.clientid} value={client.clientid}>{client.clientname}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-6">   
                                <label className='text-muted'><h6>Deadline</h6></label>
                                <input  type="date" className="form-control" name="deadline" 
                                value={project.deadline} onChange={(e)=>{dispatch({type:'update',fld:'deadline', val: e.target.value})}}
                                min={new Date().toISOString().split('T')[0]} required/>
                            </div>
                        <div className="row g-3 align-items-center d-flex justify-content-center mt-2 mb-3">
                            <div className="col-auto ">
                                <button type="submit"  className='col-auto mb-3 btn mt-2 ms-3' style={{"backgroundColor":"#323452", "color":"whitesmoke"}} >Create Project</button>
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-secondary col-auto mb-3 mt-2 ms-3" onClick={()=>{navigate("/ADMIN/userinfo")}}>Cancel</button>
                            </div>
                        </div>
                            
                        {/* <div className='text-dark'>{JSON.stringify(project)}</div> */}

                    </form>    
                </div> 
            </div>           
        </div>
  )
}