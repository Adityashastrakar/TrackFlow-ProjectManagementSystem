import React, { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css'; // import css file from root.
import { MdArrowBackIosNew } from "react-icons/md";

export default function ProjectHistory() {
    let navigate = useNavigate();
    const [originalRecords, setOriginalRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5); // Default value
    
    useEffect(() => {
        fetch("http://localhost:8080/projecthistory", {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        })
        .then(resp => resp.json())
        .then(obj => {

          setOriginalRecords(obj);
          setFilteredRecords(obj);
        });
    }, []); 

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
        return row.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setFilteredRecords(newData);
      setCurrentPage(1); // Reset to the first page when filtering
    };

    const handleRecordsPerPageChange = (e) => {
      setRecordsPerPage(parseInt(e.target.value));
      setCurrentPage(1); // Reset to the first page when changing records per page
    };

    return (
        <div className="container-fluid">
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
          <table className="table table-borderedA table-hover mt-3" >
            <thead className='table-dark'>
              <tr>
                <th className="fs-6 fw-medium">PID</th>
                <th className="fs-6 fw-medium">Title</th>
                <th className="fs-6 fw-medium">Developer</th>
                <th className="fs-6 fw-medium">techstack</th>
                <th className="fs-6 fw-medium">Description</th>
                <th className="fs-6 fw-medium">Deadline</th>
                <th className="fs-6 fw-medium">Comments</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((v) => {
                return (<tr key={v.empId}>
                  <td className="fs-6">{v.pid}</td>
                  <td className="fs-6">{v.title}</td>
                  <td className="fs-6">{v.empid.fullName}</td>
                  <td className="fs-6">{v.techstack}</td>
                  <td className="fs-6">{v.description}</td>
                  <td className="fs-6">{v.deadline}</td>
                  <td className="fs-6">{v.comments}</td>
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
        <button className='btn btn-outline-dark d-flex align-items-center fs-6' onClick={()=>{navigate('/ADMIN/ShowProject')}}><MdArrowBackIosNew /> Back</button>
      </div>
    )
}
