import React, { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { ToastContainer, toast } from 'react-custom-alert';

export default function AddTeam() {
    let navigate = useNavigate();

    const [onBenchEmp, setOnBenchEmp] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/getBenchEmployees', {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        })
        .then(resp => resp.json())
        .then(obj => {setOnBenchEmp(obj);});
    }, []);

    const [comments, setComments] = useState("");
    const pId = JSON.parse(localStorage.getItem("projectInfo"))
    
    const AddTeamMemeber = (empID) =>{
        fetch('http://localhost:8080/createTeam',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                empid:empID, 
                pid: pId[0].pid,
                comments: comments
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
            // alert("Team Member Added!");
            toast.success('Team Member Added!');
        })
        .catch((error)=>{navigate("/errorPage")});
    }

    return (
        <div className="container-fluid ">
            <ToastContainer floatingTime={800} />
            <table className="table table-bordered table-hover mt-2" >
                <thead className='table-dark'>
                <tr>
                    <th className="fs-6 fw-medium">EMPID</th>
                    <th className="fs-6 fw-medium">NAME</th>
                    <th className="fs-6 fw-medium">Designation</th>
                    <th className="fs-6 fw-medium">Comment</th>
                    <th className="fs-6 fw-medium">Assign</th>
                </tr>
                </thead>
                <tbody>
                {onBenchEmp.map((v) => {
                    return (<tr key={v.empId}>
                    <td className="fs-6">{v.empId}</td>
                    <td className="fs-6">{v.fullName}</td>
                    <td className="fs-6">{v.desg.designationName}</td>
                    <td className="fs-6">
                        <textarea placeholder="e.g. Your role is employee...." rows="1" className="form-control" name='comments'
                        onChange={(e)=>{setComments(e.target.value);}}/>
                    </td>
                    <td className="fs-6">
                        <button className="btn btn-info" onClick={()=>AddTeamMemeber(v.empId)}>assign</button>
                    </td>
                    </tr>);
                })}
                </tbody>
                </table>
                <button className='btn btn-outline-dark d-flex align-items-center fs-6' onClick={()=>{navigate('/PM/PMProjects')}}><MdArrowBackIosNew /> Back</button>
        </div>
  )
}