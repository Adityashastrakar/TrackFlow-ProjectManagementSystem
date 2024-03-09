import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, { useReducer, useRef } from 'react';
import {  useNavigate, useParams } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-custom-alert';

export default function CreateTask() {
    const ref = useRef(null) //used for Loading Bar
    let navigate = useNavigate();
    
    const pId = JSON.parse(localStorage.getItem("projectInfo"));
    const assignedDate = new Date();
    const pid = pId[0].pid;



    const {empId} = useParams();
    const init ={
        tname: "",
        description: "",
        assigneddate: assignedDate.toISOString().substring(0,10),
        deadline: "",
        status: true,
        progress: 0,
        empid: empId,
        pid: pid
    }

    const reducer = (state,action) => {
        switch(action.type){
        case 'update':
            return {...state,[action.fld]:action.val}
        case 'reset':
            return init;
        }
    }

    const [tasks ,dispatch] =useReducer(reducer,init);
    
    const insertData = (e)=>{      
        e.preventDefault();
        fetch('https://localhost:7078/AddTasks',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                tname: tasks.tname,
                description: tasks.description,
                assigneddate: assignedDate.toISOString().substring(0,10),
                deadline: tasks.deadline,
                status: true,
                progress: 0,
                empid: empId,
                pid: pid
            })
            
        })
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Server Error");
            }
        })
        .then(obj=>{
            // alert("Task Created Successfully!");
            toast.success('Task Created Successfully!');
            setTimeout(() => navigate('/PM/PMProjects'), 1000);
        })
        .catch((error)=>{navigate("/errorPage")});
    }

    return (
        <div className="container d-flex justify-content-center ">
        <LoadingBar color="#f11946" ref={ref} shadow={true} /> 
        <ToastContainer floatingTime={5000} />
        <div className='container d-flex justify-content-center'>
            <div className="shadow-lg p-4 m-5" style={{"width": '40rem'}}>
                <h5 className="d-flex mb-4 text-dark"><b>Add New Task</b></h5>      
                <form onSubmit={insertData}>
                    <div className="mb-3">   
                        <label className='text-muted'><h6>Task Name</h6></label>
                        <input  type="text" placeholder="e.g. login component" className="form-control" name='tname'
                        value={tasks.tname} onChange={(e)=>{dispatch({type:'update',fld:'tname', val: e.target.value})}} required />
                    </div>
                    <div className="mb-3">   
                        <label className='text-muted'><h6>Description</h6></label>
                        <textarea placeholder="e.g. dot.net web API for backend" rows="8" className="form-control"  name='description'
                        value={tasks.description} onChange={(e)=>{dispatch({type:'update',fld:'description', val: e.target.value})}} required />
                    </div>
                    
                    <div className="mb-3">   
                        <label className='text-muted'><h6>Deadline</h6></label>
                        <input  type="date" className="form-control"  name='deadline'
                        value={tasks.deadline} onChange={(e)=>{dispatch({type:'update',fld:'deadline', val: e.target.value})}}
                        min={new Date().toISOString().split('T')[0]} required/>
                    </div>
                    
                    <div className="row g-3 align-items-center d-flex justify-content-center mb-3">
                        <div className="col-auto">
                            <button type="button" className="btn btn-secondary w-100 font-weight-bold mt-2" onClick={()=>{ navigate("/PM/PMProjects")}}>Cancel</button>
                        </div>
                        <div className="col-auto ">
                            <button type="submit" className="btn  w-100 font-weight-bold mt-2" style={{"backgroundColor":"#323452", "color":"whitesmoke"}} onClick={(e)=>insertData(e)}>Create Task</button>
                        </div>
                    </div>
                </form>    
            </div> 
        </div>           
    </div>
  )
}