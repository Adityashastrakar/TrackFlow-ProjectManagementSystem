import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-custom-alert';

export default function TaskList() {

  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5); // Default value

  useEffect(() => {    
    const empinfo = JSON.parse(localStorage.getItem("empinfo"));
    const empId = empinfo.empId;  
      fetch(`https://localhost:7078/getactivetasksbyempid?EmpId=${empId}`, {
        method: 'GET',
        headers: {'content-type': 'application/json'},
      })
      .then(resp => resp.json())
      .then(obj => {
        const tasksWithProgress = obj.map(task => ({ ...task, progressValue: task.progress / 20 }));
        setOriginalRecords(tasksWithProgress);
        setFilteredRecords(tasksWithProgress);  
    });

  },[]);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredRecords.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilter = (e) => {
    const newData = originalRecords.filter(row => {
      return row.tname.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredRecords(newData);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing records per page
  };

  const [progressValue, setProgressValue] = useState(0);

  // const getRangeValue = (e,id) => {
  //   const newProgressValue = e.target.value;
  //   setProgressValue(newProgressValue); 
  // }

  const getRangeValue = (e, id) => {
    const newProgressValue = e.target.value;
    setProgressValue(newProgressValue);
  
    // Update the progress immediately in the originalRecords state
    const updatedRecords = filteredRecords.map(record => {
      if (record.tid === id) {
        return { ...record, progressValue: newProgressValue, progress: newProgressValue * 20  };
      }
      return record;
    });
    setFilteredRecords(updatedRecords);
  };
  

  const updateProgress = (taskId, newProgressValue) => {
    fetch(`https://localhost:7078/UpdateTaskStatus?taskId=${taskId}&progress=${newProgressValue}`, {
      method: 'POST',
      headers: {'content-type': 'application/json'}
    })
      .then(data => {
        toast.success('Updated Successfully!!');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  return (
    <div className="container-fluid">
      <ToastContainer floatingTime={5000} />
    <div className="row">
      <div className="col-md-2 d-flex align-items-center">
        <span className='text-black fs-6 me-2'>Show</span>
        <select className='form-select form-select-sm' value={recordsPerPage} onChange={handleRecordsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <span className='text-black fs-6 ms-2'>entries</span>
      </div>
      <div className='col-7'></div>
      <div className="col-3 mt-2">
        <input className="form-control" type="text" placeholder="Search" onChange={handleFilter} />
      </div>
    </div>
    
    <table className="mt-2 table table-bordered " >
      <thead className='table-dark'>
        <tr>
          <th className="fs-6 fw-medium">Task Name</th>
          <th className="fs-6 fw-medium">Description</th>
          <th className="fs-6 fw-medium">Deadline</th>
          <th className="fs-6 fw-medium">Progress</th>
          <th className="fs-6 fw-medium">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentRecords.map((v) => {
           return (<tr key={v.tid}>
            <td className="fs-6">{v.tname}</td>
            <td className="fs-6">{v.description}</td>
            <td className="fs-6">{v.deadline.split('T')[0]}</td>
            <td className="col-2 fs-6 ">
              <input type="range" className="form-range" min="0" max="5" id="customRange2" value={v.progress/20} onChange={(e)=>{getRangeValue(e,v.tid)}}/>
            </td>
            <td className="col-2 fs-6 ">
              <button className='btn btn-info' onClick={() => updateProgress(v.tid, v.progress)} >Update</button>
            </td>
          </tr>);
        })}
      </tbody>
    </table>
    <div className='row '>
      <div className='col-3'>
        <span className='text-black fs-6'>Showing {firstIndex + 1} to {Math.min(lastIndex, filteredRecords.length)} of {filteredRecords.length} records</span>
      </div>
      <div className='col-6'></div>
      <div className='col-3 d-flex justify-content-end'>
        <ul className="pagination">
            <li className="page-item"><a  className="page-link" onClick={prePage}>Prev</a></li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <a  className="page-link" onClick={() => changePage(index + 1)}>{index + 1}</a>
              </li>
            ))}
            <li className="page-item"><a  className="page-link" onClick={nextPage}>Next</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}