import React,{useState, useEffect } from 'react'
import './Sidebar.css';
import {BsGrid1X2Fill, BsFillGrid3X3GapFill, BsFillArchiveFill } from 'react-icons/bs';
import { FaTasks } from "react-icons/fa";

import { FaUserTie } from "react-icons/fa";
import {  Link, Outlet, useNavigate } from "react-router-dom";
import { confirmAlert } from '../../../node_modules/react-confirm-alert/lib/index.js';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-custom-alert';

export default function PmSidebar() {
    let navigate = useNavigate();
    const [empName, setEmpName] = useState("");

    useEffect(() => {
        const lid = JSON.parse(localStorage.getItem("loggedUser")).id;
        fetch(`http://localhost:8080/getProjectByLoginId/${lid}`, {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        })
        .then(resp => resp.json())
        .then(obj => {
          localStorage.setItem("projectInfo",JSON.stringify(obj));
        });
    }, []);

    useEffect(()=>{
        const loginId = JSON.parse(localStorage.getItem("loggedUser")).id;
        fetch(`http://localhost:8080/getEmployee/${loginId}`)
        .then(resp=>resp.json())
        .then(empinfo => {
          localStorage.setItem("empinfo",JSON.stringify(empinfo));
          setEmpName(empinfo.fullName);
        })
    },[]);
        
    const HandleLogOut=()=>{
        toast.success('Logged Out!');
        localStorage.clear();
        setTimeout(() => navigate("/"), 800);
    };

    const confirmation = () =>{
        confirmAlert({
            title: 'Confirm to logout',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {HandleLogOut()}
                },
                {
                    label: 'No',
                }
            ]
        });
    }

  return (
    <div className="container-fluid p-0">
        <ToastContainer floatingTime={5000} />
        <nav className="navbar fixed-top navbar-expand-lg" style={{backgroundColor:"#323452", height: "40px" }}>
            <div className="container-fluid">
                <a className="text-decoration-none text-white fs-6">TRACKFLOW</a>
                <ul className="text-white fs-6 list-unstyled">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle mt-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaUserTie className='fs-5' />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {/* <li className='ms-3'>Rushabh</li> */}
                            <li className='ms-3 text-secondary'>{empName}</li>
                            <li><a className="dropdown-item" onClick={()=>navigate('UpdatePersInfo')}>Profile</a></li>
                            <li><a className="dropdown-item" onClick={confirmation} >Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="row">
            <div className="col-md-6 position-fixed sticky-top " style={{  top: "40px", bottom: "0", backgroundColor: "#f7f8f9", width: "200px"  }}>
                <ul className="list-unstyled m-0">
                    <li className='sidebar px-4 py-3 fs-6'>
                        <Link className='text-decoration-none text-secondary fs-6' to={'PMHome'}>
                            <BsGrid1X2Fill className='icon fs-6'/> Dashboard
                        </Link>
                    </li>
                    
                    <li className='sidebar px-4 py-3 fs-5'>
                        <Link className='text-decoration-none text-secondary fs-6' to={'PMProjects'}>
                            <BsFillArchiveFill className='icon fs-6'/> Projects
                        </Link>
                    </li>

                    <li className='sidebar px-4 py-3 fs-5'>
                        <Link className='text-decoration-none text-secondary fs-6' to={'showPMTask'}>
                            <FaTasks className='icon fs-6'/> Tasks
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='col-md-9 offset-md-2 position-absolute' style={{top: "40px"}}>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
