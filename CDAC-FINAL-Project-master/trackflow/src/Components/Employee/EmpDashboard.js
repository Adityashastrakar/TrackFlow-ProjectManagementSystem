import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { BsFillArchiveFill, BsFillGrid3X3GapFill} from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function EmpDashboard() {

  const [value, setValue] = useState(0);
  const [countTask, setCountTask] = useState(0);
  const [IcountTask, IsetCountTask] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const empInfo = JSON.parse(localStorage.getItem("empinfo"));
      if (empInfo && empInfo.empId) {
        const empId = empInfo.empId;
        fetch(`http://localhost:8080/dasboardDataByEmp/${empId}`)
          .then(resp => resp.json())
          .then(data => {
            setValue(data);
          })
          .catch(error => {
            console.error('Error fetching dashboard data:', error);
          });

        fetch(`https://localhost:7078/GetCompletedTaskCount?EmpId=${empId}`)
          .then(resp => resp.json())
          .then(data => {
            setCountTask(data);
          })
          .catch(error => {
            console.error('Error fetching dashboard data:', error);
          });

        fetch(`https://localhost:7078/GetIncompletedTaskCount?EmpId=${empId}`)
          .then(resp => resp.json())
          .then(data => {
            IsetCountTask(data);
          })
          .catch(error => {
            console.error('Error fetching dashboard data:', error);
          });
      }
    };

    loadData();

    const timeout = setTimeout(loadData, 100); 
    return () => clearTimeout(timeout);
  }, []);


  const [projectInfo, setProjectInfo] = useState([]);
  const [clientInfo, setClientInfo] = useState([]);
    
  useEffect(() => {
    const loadData = () => {
      const empInfo = JSON.parse(localStorage.getItem("empinfo"));
      if (empInfo && empInfo.empId) {
        const empId = empInfo.empId;
        fetch(`http://localhost:8080/getCurrentProject/${empId}`)
          .then(resp => resp.json())
          .then(data => {
            if (data && data.length > 0) {
              setProjectInfo(data);
              const pid = data[0].pid;
              fetch(`http://localhost:8080/getClientOfProject/${pid}`)
                .then(resp => resp.json())
                .then(data => {
                  setClientInfo(data);
                })
                .catch(error => {
                  console.error('Error fetching client data:', error);
                });
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    };

    loadData();

    const timeout = setTimeout(loadData, 1000); 
    return () => clearTimeout(timeout);
  }, []);

  
  const [activeTab, setActiveTab] = useState('tab1');

  // Function to handle tab click
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <main >
      <div className='main-title'>
        <h3 className='text-dark'>DASHBOARD</h3>
      </div>
      <div className='main-cards'>
        <div className='card' style={{backgroundColor:"#FF004D"}}>
            <div className='card-inner'>
                <h3 className='fs-6'>No of Pending Tasks</h3>
                <BsFillGrid3X3GapFill className='card_icon fs-6'/>
            </div>
            <h1 className='fs-6'>{IcountTask}</h1>
        </div>
        <div className='card' style={{backgroundColor:"#7091F5"}}>
            <div className='card-inner'>
                <h3 className='fs-6'>No of Project Assigned</h3>
                <BsFillArchiveFill className='card_icon fs-6'/>
            </div>
            <h1 className='fs-6'>{value.pworkedon}</h1>
        </div>
        <div className='card' style={{backgroundColor:"#1FAB89"}}>
            <div className='card-inner'>
                <h3 className='fs-6'>No of Task Completed</h3>
                <BsFillGrid3X3GapFill className='card_icon fs-6'/>
            </div>
            <h1 className='fs-6'>{countTask}</h1>
        </div>
      </div>
      
      <div className="container mt-5">
      <ul className="nav nav-tabs" id="myTabs">
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'tab1' ? 'active' : ''} fs-6  `} onClick={() => handleTabClick('tab1')} href="#tab1" aria-current="page">
            View Project Info
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'tab2' ? 'active' : ''} fs-6 `} onClick={() => handleTabClick('tab2')} href="#tab2">
            View Client Info
          </a>
        </li>
      </ul>

      <div className="tab-content mt-3 mb-3">
        <div id="tab1" className={`tab-pane fade ${activeTab === 'tab1' ? 'show active' : ''} fs-6 bg-light p-4 rounded`}>
          {projectInfo.length === 0 ? (
              <Skeleton height={100} count={3} />
            ) : ( projectInfo.map((project, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100" style={{ backgroundColor: "white" }}>
              <div className="card-body">
                <p className="card-text"><strong>Title:</strong> {project.title}</p>
                <p className="card-text"><strong>Tech Stack:</strong> {project.techstack}</p>
                <p className="card-text"><strong>Description:</strong> {project.description}</p>
                <p className="card-text"><strong>Deadline:</strong> {project.deadline}</p>
                <p className="card-text"><strong>Client Name:</strong> {project.clientid.clientname}</p>
              </div>
            </div>
          </div>
        )))}
        </div>

        <div id="tab2" className={`tab-pane fade ${activeTab === 'tab2' ? 'show active' : ''} fs-6 bg-light p-4 rounded`}>
        {clientInfo.length === 0 ? (
              <Skeleton height={100} count={3} />
            ) : (clientInfo.map((client, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100" style={{ backgroundColor: "white" }}>
              <div className="card-body" >
                <p className="card-text"><strong>Client Name:</strong> {client.clientname}</p>
                <p className="card-text"><strong>Website:</strong> {client.website}</p>
                <p className="card-text"><strong>Domain:</strong> {client.domain}</p>
                <p className="card-text"><strong>Address:</strong> {client.address}</p>
                <p className="card-text"><strong>Contact:</strong> {client.contact}</p>
              </div>
            </div>
          </div>
        )))}
        </div>
      </div>
    </div>

    </main>
  )
}
