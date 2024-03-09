import React, { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { confirmAlert } from '../../../node_modules/react-confirm-alert/lib/index.js';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-custom-alert';

export default function ViewProject() {
  let navigate = useNavigate();

  const [projectRecord, setProjectRecord] = useState([]);
  const [teamRecord, setTeamRecord] = useState([]);

  useEffect(() => {
    const lid = JSON.parse(localStorage.getItem("loggedUser")).id;
    fetch(`http://localhost:8080/getProjectByLoginId/${lid}`, {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    })
    .then(resp => resp.json())
    .then(obj => {
      setProjectRecord(obj);
      localStorage.setItem("projectInfo",JSON.stringify(obj));
    });
  }, []);
  
  useEffect(() => {
    if (projectRecord.length > 0) {
      const pId = projectRecord[0].pid;
      fetch(`http://localhost:8080/teamList/${pId}`, {
        method: 'GET',
        headers: {'content-type': 'application/json'},
      })
      .then(resp => resp.json())
      .then(obj => {
        setTeamRecord(obj);
      });
    }
  }, [projectRecord]);
  

  const confirmation = (empId) =>{
    confirmAlert({
        title: 'Confirm to Remove',
        message: 'Are you sure?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {removeEmp(empId)}
            },
            {
                label: 'No',
            }
        ]
    });
  }

  const removeEmp = (empId) => {
    fetch(`http://localhost:8080/removeMember/${empId}`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => {
          if (response.ok) {
            toast.success('Employee inactivated successfully!');
          } else {
              console.error('Failed to inactivate employee');
          }
      })
      .catch(error => {
          console.error('Error inactivating employee:', error);
      });
  }

  const assignTask = (empId)=>{
    navigate(`/PM/PMTasks/${empId}`);
  }

  return (
    <div className="container-fluid ">
      <ToastContainer floatingTime={5000} />
          <div className='row mt-2 '>
            <table className="table table-bordered table-hover" >
              <thead className='table-dark'>
                <tr>
                  <th className="fs-6 fw-medium">PID</th>
                  <th className="fs-6 fw-medium">Title</th>
                  <th className="fs-6 fw-medium">Incharge</th>
                  <th className="fs-6 fw-medium">techstack</th>
                  <th className="fs-6 fw-medium">Description</th>
                  <th className="fs-6 fw-medium">Deadline</th>
                  <th className="fs-6 fw-medium">Comments</th>
                  <th className="fs-6 fw-medium">Assign</th>
                </tr>
              </thead>
              <tbody>
                {projectRecord.map((v) => { 
                  return (<tr key={v.empId}>
                    <td className="fs-6">{v.pid}</td>
                    <td className="fs-6">{v.title}</td>
                    <td className="fs-6">{v.empid.fullName}</td>
                    <td className="fs-6">{v.techstack}</td>
                    <td className="fs-6">{v.description}</td>
                    <td className="fs-6">{v.deadline}</td>
                    <td className="fs-6">{v.comments}</td>
                    <td className="fs-6">
                      <button className="btn btn-info" onClick={()=>navigate('/PM/addTeam')}>Add Memeber</button>
                    </td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
          <div className='row mt-2'>
            <h3 className='text-dark'>TEAM:</h3>
            <table className="table table-bordered table-hover" >
              <thead className='table-dark'>
                <tr>
                  <th className="fs-6 fw-medium fs-6">Employee Name</th>
                  <th className="fs-6 fw-medium fs-6">Designation</th>
                  <th className="fs-6 fw-medium fs-6">Comments</th>
                  <th className="fs-6 fw-medium fs-6">Assigned Date</th>
                  <th className="fs-6 fw-medium fs-6">Assign Task</th>
                  <th className="fs-6 fw-medium fs-6">Remove</th>
                </tr>
              </thead>
              <tbody>
                  {teamRecord.map((v) => {
                  return (
                  
                  <tr key={v.eid.empId}>
                    <td className="fs-6">{v.eid.fullName}</td>
                    <td className="fs-6">{v.eid.desg.designationName}</td>
                    <td className="fs-6">{v.comments}</td>
                    <td className="fs-6">{v.assigneddate}</td>
                    <td className="fs-6">{v.eid.login_id.role.role_id !== 2 && <button className='btn btn-info' onClick={()=>assignTask(v.eid.empId)}>Assign</button>}</td>
                    <td className="fs-6">{v.eid.login_id.role.role_id !== 2 && <button className='btn btn-danger' onClick={()=> confirmation(v.eid.empId)}>Remove</button>}</td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
    </div>
  )
}