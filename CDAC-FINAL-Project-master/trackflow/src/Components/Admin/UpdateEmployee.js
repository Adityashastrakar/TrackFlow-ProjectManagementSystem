import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect, useRef , useReducer} from 'react';
import { useForm } from "react-hook-form";
import {  useNavigate, useParams } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-custom-alert';

export default function UpdateEmployee() {
    const ref = useRef(null)
    let navigate = useNavigate();
    const { register, formState: {errors , isValid} } = useForm({mode: 'all'});
    const [isVisible, setVisible] = useState(true);
    const [msg,setmsg]=useState("");
 
    const [allRoles, setAllRoles] = useState([]);
    const [allDesign , setAllDesign] = useState([]);
    
    const access = JSON.parse(localStorage.getItem("loggedUser")).accessToken;
    
    useEffect(()=> {
        fetch("http://localhost:8080/getAllDesign",{
            method: 'GET',
            headers: {Authorization: `Bearer ${access}`}
        })
        .then(resp => resp.json())
        .then(obj => {setAllDesign(obj);})
        .catch((error)=>{navigate("/errorPage")});
    },[]);

    useEffect(()=> {
        fetch("http://localhost:8080/getAllRoles",{
            method: 'GET',
            headers: {Authorization: `Bearer ${access}`}
        })
        .then(resp => resp.json())
        .then(obj => setAllRoles(obj))
        .catch((error)=>{navigate("/errorPage")});
    },[]);

    const {empId} = useParams();

    const init ={
        fullname: "",
        dob: "",
        gender: "",
        nationality: "",
        email: "",
        phNo: "",
        currentAddress:"",
        permanentAddress:"",
        basicSal:0,
        incentives:0,
        hireDate:"",
        username:"",
        password:"",
        designationID:0,
        role_id:0
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
        fetch(`http://localhost:8080/getOneEmp/${empId}`, {
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
            dispatch({ type: 'update', fld: 'dob', val: data.dob });
            dispatch({ type: 'update', fld: 'gender', val: data.gender });
            dispatch({ type: 'update', fld: 'nationality', val: data.nationality });
            dispatch({ type: 'update', fld: 'email', val: data.email });
            dispatch({ type: 'update', fld: 'phNo', val: data.phNo });
            dispatch({ type: 'update', fld: 'currentAddress', val: data.currentAddress });
            dispatch({ type: 'update', fld: 'permanentAddress', val: data.permanentAddress });
            dispatch({ type: 'update', fld: 'basicSal', val: data.basicSal });
            dispatch({ type: 'update', fld: 'incentives', val: data.incentives });
            dispatch({ type: 'update', fld: 'hireDate', val: data.hireDate });
            dispatch({ type: 'update', fld: 'username', val: data.login_id.uid });
            dispatch({ type: 'update', fld: 'password', val: data.login_id.pwd });
            dispatch({ type: 'update', fld: 'designationID', val: data.desg.designationID });
            dispatch({ type: 'update', fld: 'role_id', val: data.login_id.role.role_id });
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
                empid:empId,
                basicSal:user.basicSal,
                incentives:user.incentives,
                designationID:user.designationID,
                role_id:user.role_id
            })
        }
        fetch("http://localhost:8080/updateall",reqOptions)
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Server Error");
            }
        } )
        .then(obj=>{
            ref.current.complete();
            toast.success('Updated Successfully!');
            setTimeout(() => navigate('/ADMIN/userinfo'), 1000);
            // navigate('/ADMIN/userinfo');
            // alert("Data Updated Successfully");
        })
        .catch((error)=>{navigate("/errorPage")});
    }

    return (
    <div className="container d-flex justify-content-center">
            <LoadingBar color="#f11946" ref={ref} shadow={true} /> 
            <ToastContainer floatingTime={5000} />
            <div className='container d-flex justify-content-center'>
                <div className=" shadow-lg p-4 m-5" style={{"width": '40rem'}}>
                    <div className={`border border-danger  ${isVisible ? 'd-none' : ''} d-flex justify-content-center`}><strong className="text-danger">{msg}</strong></div>
                    <h5 className="d-flex mb-4 text-dark"><b>Update Employee Details</b></h5>      
                    <form onSubmit={(e) => sendData(e)}>
                        <div className="form-group ">   
                            <label className='form-label text-muted'><h6>Name</h6></label>
                            <input  type="text" placeholder="e.g. John Week" className="form-control" name='fullname'
                            value={user.fullname} onChange={(e)=>{dispatch({type:'update',fld:'fullname', val: e.target.value})}} disabled />
                        </div>
                        <div className="row form-group ">
                            <div className="col-6">   
                                <label className='form-label text-muted'><h6>DOB</h6></label>
                                <input  type="date" placeholder="" className="form-control" name='dob'
                                value={user.dob} onChange={(e)=>{dispatch({type:'update',fld:'dob', val: e.target.value})}} disabled/> 
                            </div>
                            
                            <div className="col-6 row mt-2 ">   
                                <label className='text-muted'><h6>Gender</h6></label><br/>
                                <div className='col-6 form-check'>
                                    <label className="text-muted"><h6>Male</h6></label>
                                    <input type="radio" className="form-check-input  form-check-input-sm" name="gender" 
                                    disabled={user.gender === "M" ? true : false} {...register("gender",{required: true})} //for Validation
                                    value="M" onChange={(e)=>{dispatch({type:'update',fld:'gender', val: e.target.value})}}  />
                                </div>

                                <div className='col-6 form-check'>
                                    <label className='text-muted'><h6>Female</h6></label>
                                    <input type="radio" className="form-check-input form-check-input-lg" name="gender"
                                    disabled={user.gender === "F" ? true : false} {...register("gender",{required: true})} //for Validation
                                    value="F" onChange={(e)=>{dispatch({type:'update',fld:'gender', val: e.target.value})}} />           
                                </div>
                                <span className='text-danger fs-6'>{errors.gender?.type === "required" && "Please select!"}</span>
                            </div>
                        </div>

                        <div className="row form-group ">
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Email</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="email" placeholder="e.g. jw@gmail.com" className="form-control" 
                                    value={user.email} onChange={(e)=>{dispatch({type:'update',fld:'email', val: e.target.value})}} disabled />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Phone No</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="number" placeholder="e.g. 9876543210" className="form-control" 
                                    value={user.phNo} onChange={(e)=>{dispatch({type:'update',fld:'phNo', val: e.target.value})}} disabled/>
                                </div>                                
                            </div>
                        </div>

                        <div className=''>
                            <div className="col-auto ">   
                                <label className='text-muted'><h6>Current Address</h6></label>
                            </div>
                            <div className="col-auto ">   
                                <input  type="textbox" placeholder="Add Address" className="form-control" 
                                value={user.currentAddress} onChange={(e)=>{dispatch({type:'update',fld:'currentAddress', val: e.target.value})}} disabled/>
                            </div>                                
                        </div>

                        <div className=''>
                            <div className="col-auto ">   
                                <label className='text-muted'><h6>Permanent Address</h6></label>
                            </div>
                            <div className="col-auto ">   
                                <input  type="textbox" placeholder="Add Address" className="form-control" 
                                value={user.permanentAddress} onChange={(e)=>{dispatch({type:'update',fld:'permanentAddress', val: e.target.value})}} disabled/>
                            </div>                                
                        </div>
                        
                        <div className="row form-group ">
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Nationality</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="text" placeholder="eg. Indian" className="form-control" 
                                    value={user.nationality} onChange={(e)=>{dispatch({type:'update',fld:'nationality', val: e.target.value})}} disabled/>
                                </div>                                
                            </div>
                            <div className="col-6">   
                                <label className='text-muted'><h6>HireDate</h6></label>
                                <input  type="date" placeholder="" className="form-control" name='hireDate'
                                {...register("hdate",{required: true})} //for Validation
                                value={user.hireDate} onChange={(e)=>{dispatch({type:'update',fld:'hireDate', val: e.target.value})}} disabled/>  
                                <span className='text-danger fs-6'>{errors.hdate?.type === "required" && "feild is required"}</span>
                            </div>
                        </div>
                        <div className='row form-group '>
                            <div className="col-6">   
                                <label htmlFor='designation' className='form-label text-muted'><h6>Select Designation : </h6></label>
                                <select className='form-select' id='designationID' name="designationID" 
                                 onChange={(e)=>{dispatch({type:'update',fld:'designationID', val: e.target.value})}} required >
                                        <option value="">Select</option>
                                    {
                                        allDesign.map(data => {
                                            return <option key={data.designationID}  selected={user.designationID === data.designationID? true: false} value={data.designationID}>{data.designationName}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-6">   
                                <label className='form-label text-muted'><h6>Select Role : </h6></label>
                                <select className='form-select' id='role_id' name="role_id" 
                                     onChange={(e)=>{dispatch({type:'update',fld:'role_id', val: e.target.value})}} required >
                                         <option value="" >Select</option>
                                    {
                                        allRoles.map(data => {
                                            return <option key={data.role_id} value={data.role_id} selected={user.role_id === data.role_id? true: false} >{data.role_name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className='row form-group '>
                            <div className="col-6">   
                                <label className='text-muted'><h6>Basic Salary</h6></label>
                                <input  type="number" placeholder="e.g. johnweek" className="form-control" name= 'basicSal'
                                {...register("sal",{required: true})} //for Validation
                                value={user.basicSal} onChange={(e)=>{dispatch({type:'update',fld:'basicSal', val: e.target.value})}} required/>
                                <span className='text-danger fs-6'>{errors.sal?.type === "required" && "feild is required"}</span>
                            </div>
                                        
                            <div className="col-6">   
                                <label className='text-muted'><h6>Incentives</h6></label>
                                <input  type="number" placeholder="e.g. johnweek" className="form-control"  name='incentives'
                                {...register("inc",{required: true})} //for Validation
                                value={user.incentives} onChange={(e)=>{dispatch({type:'update',fld:'incentives', val: e.target.value})}} required/>
                                <span className='text-danger fs-6'>{errors.inc?.type === "required" && "feild is required"}</span>
                            </div>
                        </div>

                        <div className="form-group ">   
                            <label className='text-muted'><h6>username</h6></label>
                            <input  type="text" placeholder="e.g. johnweek" className="form-control"  id='username'
                            value={user.username} onChange={(e)=>{dispatch({type:'update',fld:'username', val: e.target.value})}}  disabled/>
                        </div>
                        
                        <div className="form-group ">   
                            <label className='text-muted'><h6>Password</h6></label>
                            <input  type="password" placeholder="***********" className="form-control"
                            name="password" value={user.password} onChange={(e)=>{dispatch({type:'update',fld:'password', val: e.target.value})}} disabled  />
                        </div>
                        
                        <div className="row g-3 align-items-center d-flex justify-content-center ">
                            <div className="col-auto">
                                <button type="button" className="btn btn-secondary w-100 font-weight-bold mt-2" onClick={()=>{navigate("/ADMIN/userinfo")}}>Cancel</button>
                            </div>
                            <div className="col-auto ">
                                <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{"backgroundColor":"#323452", "color":"whitesmoke"}} >Update</button>
                            </div>
                        </div>
                    </form>   
            {/* <div className='text-dark'>{JSON.stringify(user)}</div>             */}
                </div> 
            </div>
        </div>
  )
}