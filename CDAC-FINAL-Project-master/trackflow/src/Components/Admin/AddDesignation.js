import React, { useRef ,useState, useEffect , useReducer} from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-custom-alert';

export default function AddDesignation() {
    let navigate = useNavigate();

    const init = {
        designation_name: ''
    }

    const reducer = (state,action) => {
        switch(action.type){
            case 'update':
                return {...state,[action.fld]:action.val}
            case 'reset':
                return init;
        }
    }

    const [designation ,dispatch] = useReducer(reducer,init);

    const sendData = (e) => {
        e.preventDefault(); 
    
        fetch('http://localhost:9000/insertdata', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(designation) 
        })
        .then(obj => {
            toast.success('Added Designation Successfully!');
            setTimeout(() => navigate('/ADMIN/adminHome'), 800);
        })
        .catch(error => {
            console.error('Error adding project:', error);
        });
    };

  return ( 
            <div className="container d-flex justify-content-center ">
            <ToastContainer floatingTime={5000} />
            <div className='container d-flex justify-content-center'>
                <div className=" shadow-lg p-4 m-5" style={{"width": '40rem'}}>
                    <h5 className="d-flex mb-4 text-dark"><b>Add New Designation</b></h5>      
                    <form onSubmit={sendData}>
                        <div className="mb-3">   
                            <label className='text-dark'><h6>Designation Name</h6></label>
                            <input  type="text" placeholder="e.g. Full Stack Developer" className="form-control" name='designation_name' 
                            value={designation.designation_name} onChange={(e)=>{dispatch({type:'update',fld:'designation_name', val: e.target.value})}} required />
                        </div>
                        
                        <div className="row g-3 align-items-center d-flex justify-content-center mt-2 mb-3">
                            <div className="col-auto ">
                                <button type="submit"  className='col-auto mb-3 btn mt-2 ms-3' style={{"backgroundColor":"#323452", "color":"whitesmoke"}} >Add Designation</button>
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-secondary col-auto mb-3 mt-2 ms-3" onClick={()=>{navigate("/ADMIN/adminHome")}}>Cancel</button>
                            </div>
                        </div>
                    </form>    
                </div> 
            </div>           
        </div>
  )
}