import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect, useRef , useReducer} from 'react';
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-custom-alert';

export default function AddEmployee() {
    const ref = useRef(null)
    let navigate = useNavigate();
    const { register, formState: {errors , isValid}, watch } = useForm({mode: 'all'});
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
        .then(obj => {setAllDesign(obj)})
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

    const [selectedDesignation, setSelectedDesignation] = useState(0);
    const [selectedRole, setSelectedRole] = useState(0);

    const handleDesignationChange = (e) => {
        dispatch({type:'update',fld:'designationID', val: e.target.value})
        setSelectedDesignation(e.target.value); // Update selected role when user selects a role
    };
    const handleRoleChange = (e) => {
        dispatch({type:'update',fld:'role_id', val: e.target.value});
        setSelectedRole(e.target.value); // Update selected role when user selects a role
    };

    const sendData = (e) => {
        e.preventDefault();
        
        if (selectedRole == 0) {
            alert("Role is required!"); // Display error message if role is not selected
            return; // Prevent form submission
        }
        if(selectedDesignation == 0) {
            alert("Designation is required!"); // Display error message if designation is not selected
            return; // Prevent form submission
        }
        
            fetch("http://localhost:8080/userCheck",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    username:user.username
                })
            })
            .then((resp)=>resp.json())
            .then((count)=>{
                if(count === 0){     
                    const reqOptions = {
                        method: 'POST',
                        headers: {'content-type':'application/json'},
                        body: JSON.stringify(user)
                    }
                    fetch("http://localhost:8080/regEmployee",reqOptions)
                    .then(res=>{
                        if(res.ok){
                            return res.json();
                        }else{
                            // throw new Error("Server Error");
                        }
                    } )
                    .then(obj=>{
                        ref.current.complete();
                        // alert("Regestration Successful");
                        toast.success('Regestration Successfully!');
                        // navigate('/ADMIN/userinfo');
                        setTimeout(() => navigate('/ADMIN/userinfo'), 1000);
                    })
                    .catch((error)=>{navigate("/errorPage")});
                }else{
                    setmsg("Username already Exist!");
                    setVisible(false)
                    setTimeout(() => setVisible(true), 2000);
                    const userinput = document.getElementById('username')
                    if(userinput){
                        userinput.focus();
                    }
                }
            }).catch((error)=>{navigate("/errorPage")});
    }

    const today = new Date();
    const minDOB = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()); // Calculate date 18 years ago

    return (
    <div className="container d-flex justify-content-center">
            <LoadingBar color="#f11946" ref={ref} shadow={true} />
            <ToastContainer floatingTime={5000} /> 
            <div className='container d-flex justify-content-center'>
                <div className=" shadow-lg p-4 m-5" style={{"width": '60rem'}}>
                    <div className={`border border-danger  ${isVisible ? 'd-none' : ''} d-flex justify-content-center`}><strong className="text-danger">{msg}</strong></div>
                    <h5 className="d-flex mb-4 text-dark"><b>Add Employee</b></h5>      
                    <form >
                        <div className="form-group ">   
                            <label className='form-label text-muted'><h6>Name</h6></label>
                            <input  type="text" placeholder="e.g. John Week" className="form-control" name='fullname'
                            {...register("name",{required: true})} //for Validation
                            value={user.fullname} onChange={(e)=>{dispatch({type:'update',fld:'fullname', val: e.target.value})}} required />
                            <span className='text-danger fs-6'>{errors.name?.type === "required" && "Name is required!"}</span >
                        </div>
                        <div className="row form-group ">
                            <div className="col-6">   
                                <label className='form-label text-muted'><h6>DOB</h6></label>
                                <input  type="date" placeholder="" className="form-control" name='dob'
                                {...register("dob",{required: true})} //for Validation
                                value={user.dob} onChange={(e)=>{dispatch({type:'update',fld:'dob', val: e.target.value})}} 
                                max={minDOB.toISOString().split('T')[0]} required/> 
                                <span className='text-danger fs-6'>{errors.dob?.type === "required" && "Date of Birth is required!"}</span >
                            </div>
                            
                            <div className="col-6 row mt-2 ">   
                                <label className='text-muted'><h6>Gender</h6></label><br/>
                                <div className='col-6 form-check'>
                                    <label className="text-muted"><h6>Male</h6></label>
                                    <input type="radio" className="form-check-input  form-check-input-sm" name="gender"
                                    {...register("gender",{required: true})} //for Validation
                                    value="M" onChange={(e)=>{dispatch({type:'update',fld:'gender', val: e.target.value})}} />
                                </div>

                                <div className='col-6 form-check'>
                                    <label className='text-muted'><h6>Female</h6></label>
                                    <input type="radio" className="form-check-input form-check-input-lg" name="gender"
                                    {...register("gender",{required: true})} //for Validation
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
                                     {...register("email",{required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i},)} //for Validation
                                    value={user.email} onChange={(e)=>{dispatch({type:'update',fld:'email', val: e.target.value})}} required />
                                    <span className='text-danger fs-6'>{errors.email?.type === "required" && "Email is required!"}{errors.email?.type === "pattern" && "Email is invalid!"}</span >
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Phone No</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="number" placeholder="e.g. 9876543210" className="form-control" 
                                    {...register("phone", {required: true, pattern: /^\d{10,12}$/})} //for Validation
                                    value={user.phNo} onChange={(e)=>{dispatch({type:'update',fld:'phNo', val: e.target.value})}} required/>
                                    <span className='text-danger fs-6'>{errors.phone?.type === "required" && "phone no is required!"}{errors.phone?.type === "pattern" && "Phone no is invalid!"}</span >
                                </div>                                
                            </div>
                        </div>

                        <div className=''>
                            <div className="col-auto ">   
                                <label className='text-muted'><h6>Current Address</h6></label>
                            </div>
                            <div className="col-auto ">   
                                <input  type="textbox" placeholder="Add Address" className="form-control" 
                                {...register("cadr",{required: true})} //for Validation
                                value={user.currentAddress} onChange={(e)=>{dispatch({type:'update',fld:'currentAddress', val: e.target.value})}} required/>
                                <span className='text-danger fs-6'>{errors.cadr?.type === "required" && "Address is required!"}</span>
                            </div>                                
                        </div>

                        <div className=''>
                            <div className="col-auto ">   
                                <label className='text-muted'><h6>Permanent Address</h6></label>
                            </div>
                            <div className="col-auto ">   
                                <input  type="textbox" placeholder="Add Address" className="form-control" 
                                {...register("padr",{required: true})} //for Validation
                                value={user.permanentAddress} onChange={(e)=>{dispatch({type:'update',fld:'permanentAddress', val: e.target.value})}} required/>
                                <span className='text-danger fs-6'>{errors.padr?.type === "required" && "Address is required!"}</span>
                            </div>                                
                        </div>
                        
                        <div className="row form-group ">
                            <div className='col-6'>
                                <div className="col-auto ">   
                                    <label className='text-muted'><h6>Nationality</h6></label>
                                </div>
                                <div className="col-auto ">   
                                    <input  type="text" placeholder="eg. Indian" className="form-control" 
                                    {...register("nation",{required: true})} //for Validation
                                    value={user.nationality} onChange={(e)=>{dispatch({type:'update',fld:'nationality', val: e.target.value})}} required/>
                                    <span className='text-danger fs-6'>{errors.nation?.type === "required" && "Nationality is required!"}</span>
                                </div>                                
                            </div>
                            <div className="col-6">   
                                <label className='text-muted'><h6>HireDate</h6></label>
                                <input  type="date" placeholder="" className="form-control" name='hireDate'
                                {...register("hdate",{required: true})} //for Validation
                                value={user.hireDate} onChange={(e)=>{dispatch({type:'update',fld:'hireDate', val: e.target.value})}}
                                min={new Date().toISOString().split('T')[0]} required/>  
                                <span className='text-danger fs-6'>{errors.hdate?.type === "required" && "feild is required"}</span>
                            </div>
                        </div>
                        <div className='row form-group '>
                            <div className="col-6">   
                                <label htmlFor='designation' className='form-label text-muted'><h6>Select Designation : </h6></label>
                                <select className='form-select' id='designationID' name="designationID" 
                                 onChange={(e)=>handleDesignationChange(e)} >
                                    {/* handleDesignationChange(e) dispatch({type:'update',fld:'designationID', val: e.target.value}) */}
                                    <option key={0} selected value={0}>Select</option>
                                    {
                                        allDesign.map(data => {
                                            return <option key={data.designationID}  value={data.designationID}>{data.designationName}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-6">   
                                <label className='form-label text-muted'><h6>Select Role : </h6></label>
                                <select className='form-select' id='role_id' name="role_id" 
                                    onChange={(e)=>handleRoleChange(e)}  >
                                    <option selected value={0} key={0} >Select</option>
                                    {
                                        allRoles.map(data => {
                                            return <option key={data.role_id} value={data.role_id}>{data.role_name}</option>
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
                            {...register("username",{ required: true, pattern: /^[a-zA-Z][a-zA-Z0-9_]{6,15}$/})} //for Validation
                            value={user.username} onChange={(e)=>{dispatch({type:'update',fld:'username', val: e.target.value})}}  required/>
                            <span className='text-danger fs-6'>{errors.username?.type === "required" && "feild is required"}{errors.username?.type === "pattern" && "First letter must be Alphabet and only underscore is allowed!!"}</span>
                        </div>
                        
                        <div className="form-group ">   
                            <label className='text-muted'><h6>Password</h6></label>
                            <input  type="password" placeholder="***********" className="form-control"
                            {...register("password",{ required: true, pattern: /^[A-Za-z\d@$!%*?&]{8,12}$/})} //for Validation
                            name="password" value={user.password} onChange={(e)=>{dispatch({type:'update',fld:'password', val: e.target.value})}} required/>
                            <span className='text-danger fs-6'>{errors.password?.type === "required" && "You must specify a password"}{errors.password?.type === "pattern" && "Password must be between 8 - 12 words!"}</span >
                        </div>
                        
                        <div className="form-group ">   
                            <label className='text-muted'><h6>Confirm Password</h6></label>
                            <input  type="password" placeholder="***********" className="form-control" 
                            {...register("confirm_password",{ required: true, validate: (val) => { return (watch('password') === val || "Your passwords do no match");},})} required/>
                            <span className='text-danger fs-6'>{errors.confirm_password?.message}</span>
                        </div>
                        
                        <div className="row g-3 align-items-center d-flex justify-content-center ">
                            <div className="col-auto">
                                <button type="button" className="btn btn-secondary w-100 font-weight-bold mt-2" onClick={()=>{navigate("/ADMIN/userinfo")}}>Cancel</button>
                            </div>
                            <div className="col-auto ">
                                <button type="submit" className="btn  w-100 font-weight-bold mt-2" style={{"backgroundColor":"#323452", "color":"whitesmoke"}} disabled={!isValid} onClick={(e)=>{sendData(e)}} >Add Employee</button>
                            </div>
                        </div>
                    </form>   
                    {/* <div className='text-dark'>{JSON.stringify(user)}</div>  */}
                </div> 
            </div>           
        </div>
  )
}