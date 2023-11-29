import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './adminloginvalidation'
import axios from 'axios'
import '../Student/Password.css'
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'

function AdminLogin() {
  const [values, setValues] = useState({
    username:'',
    password:''
})
const navigate = useNavigate();
const [errors, setErrors] = useState({})
const handleInput = (event) => {
  setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
}
const handleSubmit =(event) => {
    event.preventDefault();
    const err = Validation(values);
        setErrors(err);
        if(errors.username === "" && errors.password === "") {
            axios.post('http://localhost:8082/AdminLogin', values)
            .then(res => {
                if(res.data === "Success") {
                    navigate('/admindashboard');
                } else {
                    alert("No Record Existed");
                }
            })
            .catch(err => console.log(err));
        }
}

const [type, setType]=useState('password');
    const [icon, setIcon]=useState(eyeOff);

    const handleToggle=()=>{
        if(type==='password'){
            setIcon(eye);
            setType('text'); 
        }
        else{
            setIcon(eyeOff);
            setType('password');
        }
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{ background: 'linear-gradient(to bottom, #87ceeb, #4682b4)'}}>
        <div style={{backgroundColor: 'white', fontFamily: 'Poppins, sans-serif'}} className='p-3 rounded w-25 wrapper'>
        <Link to="/" style={{backgroundColor: '#1e90ff', color: 'white'}} className='btn btn-primary position-absolute start-0 top-0 m-3'>
          Go to Frontpage
        </Link>
        <center><h2 className='login-header'>Admin Login</h2></center>
        <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='username'><strong>Username</strong></label>
                    <div className='input-container'>
                    <input type='username' placeholder='' name='username'
                    onChange={handleInput} className='form-control rounded-0'/>
                    </div>
                    {errors.username && <span className='text-danger'>{errors.username}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <div className='input-container'>
                    <input type={type} placeholder='' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    <span onClick={handleToggle} className='icon'><Icon icon={icon} size={18}/></span>
                    </div>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <div style={{ marginBottom: '50px' }}></div>
                <center><button type='submit' className='btn btn-success w-50 rounded-0' style={{backgroundColor: '#1e90ff'}}>Login</button></center>
                <div style={{ marginBottom: '20px' }}></div>
                <center><p>Don't have an account?&nbsp;
                <Link to="/adminregister" style={{ textDecoration: 'none' }}>
                    Create Account
                </Link>
                </p></center>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin