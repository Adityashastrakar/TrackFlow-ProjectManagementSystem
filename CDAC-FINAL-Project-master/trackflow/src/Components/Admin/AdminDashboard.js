import React, { useEffect, useState } from 'react';
import './dashboard.css';
import {  BsFillGrid3X3GapFill, BsPeopleFill} from 'react-icons/bs';
import { FaUserAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const [value,setValue] = useState(0);
  useEffect(()=>{
    fetch('http://localhost:8080/getDashboardData')
    .then(resp=>resp.json())
    .then(data=>{setValue(data)});
  },[])

  return (
    <main >
      <div className='main-title'>
            <h3 className='text-dark'>DASHBOARD</h3>
      </div>
      <div className='main-cards '>
        <div className='card' style={{backgroundColor:"#7091F5"}}>
            <div className='card-inner'>
                <h3 className='fs-6'>No of Employees</h3>
                <FaUserAlt className='card_icon fs-6'/>
            </div>
            <h1 className='fs-6'>{value.empdata}</h1>
        </div>
        <div className='card' style={{backgroundColor:"#1FAB89"}}>
            <div className='card-inner'>
                <h3 className='fs-6'>No of Projects</h3>
                <BsFillGrid3X3GapFill className='card_icon fs-6'/>
            </div>
            <h1 className='fs-6'>{value.projectdata}</h1>
        </div>
        <div className='card' style={{backgroundColor:"#F30E5C"}}>
            <div className='card-inner'>
                <h3 className='fs-6'>No of Clients</h3>
                <BsPeopleFill className='card_icon fs-6'/>
            </div>
            <h1 className='fs-6'>{value.clientdata}</h1>
        </div>
        {/* <div className='card'>
            <div className='card-inner'>
                <h3 className='fs-6'>ALERTS</h3>
                <BsFillBellFill className='card_icon fs-6'/>
            </div>
            <h1 className='fs-6'>42</h1>
        </div> */}
      </div>
    </main>
    
  );
}

