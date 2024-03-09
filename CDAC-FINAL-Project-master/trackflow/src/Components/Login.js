import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useReducer, useRef, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useForm } from "react-hook-form";
import logo from '../logo.jpg';
import bg from '../bg.jpg';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

export default function AddEmployee() {
    const ref = useRef(null) //used for Loading Bar
    let navigate = useNavigate();
    const { register, formState: {errors , isValid} } = useForm({mode: 'all'});
    const [isVisible, setVisible] = useState(true);
    const [msg, setMsg] = useState("");
    const [error, setErrors] = useState("");

    const init = {
        username:"",
        password:""
    }

    const reducer = (state,action) => {
        switch(action.type){
            case 'update':
                return {...state,[action.fld]:action.val}
            case 'reset':
                return init;
        }
    }

    const [info, dispatch] = useReducer(reducer,init);

    const sendData = (e) => {
        e.preventDefault();
        const reqOptions = {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(info)
        }
        fetch("http://localhost:8080/login",reqOptions)
        .then(resp => {
            if(resp.ok){
                return resp.text();
            }else{
                throw new Error("Server Side Error");
            }
        })
        .then(text => text.length ? JSON.parse(text) : {})
        .then(obj => {
            setMsg(obj.accessToken);
            
            if(Object.keys(obj).length === 0){
                alert("Wrong usrname/password");
            }else{
                localStorage.setItem("loggedUser", JSON.stringify(obj));
                const role_id = obj.roles[0]; // Assuming roles is an array
                if(role_id === "admin"){
                    ref.current.complete();
                    setTimeout(() => navigate("/ADMIN/adminHome"), 100);
                } else if(role_id === "project_manager"){
                    ref.current.complete();
                    setTimeout(() => navigate("/PM/PMHome"), 100);
                } else if(role_id === "employee"){
                    ref.current.complete();
                    setTimeout(() => navigate("/EMP/EmpHome"), 100);
                }
            }
        })
        .catch((error)=>{
            setErrors("username or password is incorrect");
            setVisible(false);
            setTimeout(() => setVisible(true), 2000);
        });
    }

    return (
        <div className='container-fluid'>
            <LoadingBar color="#f11946" ref={ref} shadow={true} />
            <div className='row vh-100 g-0'>
                <div className='col-lg-6 position-relative d-none d-lg-block'>
                    <div className='bg-holder' style={{backgroundImage:`url(${bg})`}}></div>
                </div>
                <div className='col-lg-6'>
                    <div className='row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0'>
                        <div className='col col-sm-6 col-lg-7 col-xl-6'>
                            <a className='d-flex justify-content-center mb-4'>
                                <img src={logo} alt="react logo" style={{ width: '60px' }}/>
                            </a>
                            <div className='text-center mb-5'>
                                <h3 className='fw-bold'>Log In</h3>
                                <p className='text-secondary fs-6'>TrackFlow - Project Management Tool</p>
                            </div>
                            
                            <div className={`border border-danger  ${isVisible ? 'd-none' : ''} d-flex justify-content-center`}><strong className="text-danger fs-6">{error}</strong></div>
                            
                            <div className='position-relative'>
                                <hr className='text-secondary'/>
                                <div className='divider-content-center'></div>
                            </div>

                            <form>
                                <div className='input-group mb-2'>
                                    <span className='input-group-text'>
                                        <FaUser />
                                    </span>
                                    <input className='form-control form-control-lg fs-6' type="text" id='username' name='username' placeholder="Username"
                                        {...register("username",{ required: true, pattern: /^[a-zA-Z][a-zA-Z0-9_]{6,15}$/})} //for Validation
                                        value={info.username} onChange={(e)=>{dispatch({type:'update',fld:'username', val: e.target.value})}} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='text-danger fs-6'>{errors.username?.type === "required" && "feild is required"}{errors.username?.type === "pattern" && "First letter must be Alphabet and only underscore is allowed!!"}</span>
                                </div>

                                <div className='input-group mb-2'>
                                    <span className='input-group-text'>
                                        <FaLock />
                                    </span>
                                    <input type="password" id='password' name='password' className='form-control form-control-lg fs-6' placeholder='Password' 
                                        {...register("password",{ required: true, pattern: /^[A-Za-z\d@$!%*?&]{8,12}$/})} //for Validation
                                        value={info.password} onChange={(e)=>{dispatch({type:'update',fld:'password', val: e.target.value})}} />
                                </div>
                                <div className='input-group mb-3'>
                                        <span className='text-danger fs-6'>{errors.password?.type === "required" && "You must specify a password"}{errors.password?.type === "pattern" && "Password must be between 8 - 12 words!"}</span >
                                </div>

                                <button type="submit" className='btn btn-lg btn-outline-secondary btn-outline-custom w-100 mb-3' disabled={!isValid} onClick={(e)=> {sendData(e)}}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
