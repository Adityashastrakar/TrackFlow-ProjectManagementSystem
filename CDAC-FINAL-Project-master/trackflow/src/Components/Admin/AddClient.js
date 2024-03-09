import React, { useRef ,useState, useEffect , useReducer} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-custom-alert';

export default function AddClient() {
    let navigate = useNavigate();
    const { register, formState: {errors , isValid}, watch } = useForm({mode: 'all'});

    const init = {
        clientname: "",
        website: "",
        domain: "",
        address: "",
        contact: ""
    }

    const reducer = (state,action) => {
        switch(action.type){
            case 'update':
                return {...state,[action.fld]:action.val}
            case 'reset':
                return init;
        }
    }

    const [client ,dispatch] = useReducer(reducer,init);

    const sendData = (e) => {
        e.preventDefault(); 
    
        fetch('http://localhost:9000/insertClient', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(client) 
        })
        .then(obj => {
            toast.success('Added Client Details Successfully!');
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
                    <h5 className="d-flex mb-4 text-dark"><b>Add New Client</b></h5>      
                    <form onSubmit={sendData}>
                        <div className="mb-3">   
                            <label className='text-dark'><h6>Client Name</h6></label>
                            <input  type="text" placeholder="e.g. Client Name" className="form-control"
                            {...register("clientname",{required: true})} //for Validation 
                            value={client.clientname} onChange={(e)=>{dispatch({type:'update',fld:'clientname', val: e.target.value})}} required />
                            <span className='text-danger fs-6'>{errors.clientname?.type === "required" && "Name is required!"}</span>
                        </div>
                        <div className="mb-3">   
                            <label className='text-dark'><h6>Website</h6></label>
                            <input  type="text" placeholder="e.g. www.google.com" className="form-control"
                            {...register("website",{required: true})} //for Validation 
                            value={client.website} onChange={(e)=>{dispatch({type:'update',fld:'website', val: e.target.value})}} required />
                            <span className='text-danger fs-6'>{errors.website?.type === "required" && "feild is required!"}</span>
                        </div>
                        <div className="row form-group ">
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Address</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="text" placeholder="eg. Pune" className="form-control" 
                                    {...register("address",{required: true})} //for Validation
                                    value={client.address} onChange={(e)=>{dispatch({type:'update',fld:'address', val: e.target.value})}} required/>
                                    <span className='text-danger fs-6'>{errors.address?.type === "required" && "Address is required!"}</span>
                                </div>                                
                            </div>
                            <div className="col-6">   
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Domain</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="text" placeholder="eg. IT Services" className="form-control" 
                                    {...register("domain",{required: true})} //for Validation
                                    value={client.domain} onChange={(e)=>{dispatch({type:'update',fld:'domain', val: e.target.value})}} required/>
                                    <span className='text-danger fs-6'>{errors.domain?.type === "required" && "Domain is required!"}</span>
                                </div> 
                            </div>
                        </div>
                        <div className="mb-3">   
                            <label className='text-dark'><h6>Contact</h6></label>
                            <input  type="text" placeholder="eg. 9876543210" className="form-control" 
                                    {...register("contact",{required: true})} //for Validation
                                    value={client.contact} onChange={(e)=>{dispatch({type:'update',fld:'contact', val: e.target.value})}} required/>
                                    <span className='text-danger fs-6'>{errors.contact?.type === "required" && "contact is required!"}</span>
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