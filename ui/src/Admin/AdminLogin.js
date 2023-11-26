import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './adminloginvalidation'
import axios from 'axios'

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
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div style={{backgroundColor: '#87ceeb', fontFamily: 'Poppins, sans-serif'}} className='p-3 rounded w-25'>
        <Link to="/" className='btn btn-primary position-absolute start-0 top-0 m-3'>
          Go to Frontpage
        </Link>
        <center><h2>Admin Login</h2></center>
        <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='username'><strong>Username</strong></label>
                    <input type='username' placeholder='Enter username' name='username'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.username && <span className='text-danger'>{errors.username}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                <center><p>For the student who don't have account</p></center>
                <Link to="/adminregister" style={{backgroundColor: '#1e90ff', color: 'white'}} className='btn btn-default border w-100 rounded-0 text-decoration-none'>
                    Create Account
                </Link>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin