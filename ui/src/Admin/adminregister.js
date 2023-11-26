import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './adminregistervalidation'
import axios from 'axios'

function Adminregister() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    const [errors, setErrors] = useState({})
    const handleChange = (event) => {
        setValues({...values, [event.target.name]:[event.target.value]})
      }
    const handleSubmit =(event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if(
            errors.username === "" && 
            errors.password === ""
        ) {
            axios.post('http://localhost:8082/adminregister', values)
            .then(res => {
                navigate('/AdminLogin');
            })
            .catch(err => console.log(err));
        }
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
        <div style={{backgroundColor: '#87ceeb', fontFamily: 'Poppins, sans-serif'}} className=' p-3 rounded w-25'>
            <center><h2>Register</h2></center>
                <form action="" onSubmit={handleSubmit}>     
                <div className='mb-3'>
                    <label htmlFor='username'><strong>Username</strong></label>
                    <input type='username' placeholder='Enter username' name='username'
                    onChange={handleChange} className='form-control rounded-0'/>
                    {errors.username && <span className='text-danger'>{errors.username}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter password' name='password'
                    onChange={handleChange} className='form-control rounded-0' />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <div className='mb-3'>
                    <button type='submit' style={{backgroundColor: '#1e90ff'}} className='btn btn-success w-100 rounded-0'>Register Account</button>
                </div>
                <div className='mb-3'>
                    <Link to="/AdminLogin" style={{backgroundColor: '#2e8b57', color: 'white'}} className='btn btn-default border w-100 rounded-0 text-decoration-none'>
                        Login
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Adminregister