import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect, useRef , useReducer} from 'react';
import { useForm } from "react-hook-form";
import {  useNavigate, useParams } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function UpdateEmpPersInfo() {
    const ref = useRef(null)
    let navigate = useNavigate();
    const { register, formState: {errors , isValid} } = useForm({mode: 'all'});
    const [isVisible, setVisible] = useState(true);
    const [msg,setmsg]=useState("");

    const empInfo= JSON.parse(localStorage.getItem("empinfo")).empId;

    const {empId} = useParams();
    const init ={
        empid:empInfo,
        fullname: "",
        nationality: "",
        email: "",
        currentAddress:"",
        permanentAddress:"",
        phNo: ""
    }
    
    const reducer = (state,action) => {
    switch(action.type){
        case 'update':
            return {...state,[action.fld]:action.val}
        case 'reset':
            return init;
        }
    }

    const [user ,dispatch] =useReducer(reducer,init);    

    useEffect(() => {
        fetch(`http://localhost:8080/getOneEmp/${empInfo}`, {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        })
        .then(resp => {
            if(resp.ok){
                return resp.json();
            }else{
                throw new Error("Server Error");
            }
        })
        .then(data =>{
            dispatch({ type: 'update', fld: 'fullname', val: data.fullName });
            dispatch({ type: 'update', fld: 'nationality', val: data.nationality });
            dispatch({ type: 'update', fld: 'email', val: data.email });
            dispatch({ type: 'update', fld: 'currentAddress', val: data.currentAddress });
            dispatch({ type: 'update', fld: 'permanentAddress', val: data.permanentAddress });
            dispatch({ type: 'update', fld: 'phNo', val: data.phNo });
        })
        .catch(error => {
          console.error('Error fetching employee data:', error);
          navigate("/errorPage");
        });
      }, [empId]);

    const sendData = (e) => {
        e.preventDefault();
        const reqOptions = {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                empid:empInfo,
                fullname: user.fullname,
                nationality: user.nationality,
                email: user.email,
                currentAddress:user.currentAddress,
                permanentAddress:user.permanentAddress,
                phNo: user.phNo
            })
        }
        fetch("http://localhost:8080/updatepersonals",reqOptions)
        .then(resp=>{
            if(resp.ok){
                return resp.json();
            }else{
                throw new Error("Server Error");
            }
        } )
        .then(obj=>{
            ref.current.complete();
            alert("Data Updated Successfully");
        })
        .catch((error)=>{navigate("/errorPage")});
    }
    return (
    <div className="container d-flex justify-content-center">
            <LoadingBar color="#f11946" ref={ref} shadow={true} /> 
            <div className='container d-flex justify-content-center'>
                <div className=" shadow-lg p-4 m-5" style={{"width": '40rem'}}>
                    <div className={`border border-danger  ${isVisible ? 'd-none' : ''} d-flex justify-content-center`}><strong className="text-danger">{msg}</strong></div>
                    <h5 className="d-flex mb-4 text-dark"><b>Update User Profile</b></h5>      
                    <form onSubmit={(e) => sendData(e)}>
                        <div className="form-group ">   
                            <label className='form-label text-muted'><h6>Name</h6></label>
                            <input  type="text" placeholder="e.g. John Week" className="form-control" name='fullname'
                            value={user.fullname} onChange={(e)=>{dispatch({type:'update',fld:'fullname', val: e.target.value})}}
                            />
                        </div>
                       
                        <div className="row form-group ">
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Email</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="email" placeholder="e.g. jw@gmail.com" className="form-control" 
                                    value={user.email} onChange={(e)=>{dispatch({type:'update',fld:'email', val: e.target.value})}}  />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Phone No</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="number" placeholder="e.g. 9876543210" className="form-control" 
                                    value={user.phNo} onChange={(e)=>{dispatch({type:'update',fld:'phNo', val: e.target.value})}} />
                                </div>                                
                            </div>
                        </div>

                        <div className=''>
                            <div className="col-auto ">   
                                <label className='text-muted'><h6>Current Address</h6></label>
                            </div>
                            <div className="col-auto ">   
                                <input  type="textbox" placeholder="Add Address" className="form-control" 
                                value={user.currentAddress} onChange={(e)=>{dispatch({type:'update',fld:'currentAddress', val: e.target.value})}} />
                            </div>                                
                        </div>

                        <div className=''>
                            <div className="col-auto ">   
                                <label className='text-muted'><h6>Permanent Address</h6></label>
                            </div>
                            <div className="col-auto ">   
                                <input  type="textbox" placeholder="Add Address" className="form-control" 
                                value={user.permanentAddress} onChange={(e)=>{dispatch({type:'update',fld:'permanentAddress', val: e.target.value})}} />
                            </div>                                
                        </div>
                        
                        <div className="row form-group ">
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Nationality</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="text" placeholder="eg. Indian" className="form-control" 
                                    value={user.nationality} onChange={(e)=>{dispatch({type:'update',fld:'nationality', val: e.target.value})}} />
                                </div>                                
                            </div>
                        </div>                          
                        
                        <div className="row g-3 align-items-center d-flex justify-content-center ">
                            <div className="col-auto">
                                <button type="button" className="btn btn-secondary w-100 font-weight-bold mt-2" onClick={()=>{navigate("/EMP/EmpHome")}}>Cancel</button>
                            </div>
                            <div className="col-auto ">
                                <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{"backgroundColor":"#323452", "color":"whitesmoke"}} >Update</button>
                            </div>
                        </div>
                    </form>   
                </div> 
            </div>
        </div>
  )
}