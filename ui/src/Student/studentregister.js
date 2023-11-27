import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './studentregistervalidation'
import axios from 'axios'
import './Password.css'
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'

function Studentregister() {
    const [values, setValues] = useState({
        name: '',
        year_level: '',
        course: '',
        department: '',
        email: '',
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
            errors.name === "" &&
            errors.year_level === "" && 
            errors.course === "" && 
            errors.department === "" && 
            errors.email === "" && 
            errors.username === "" && 
            errors.password === ""
        ) {
            axios.post('http://localhost:8082/studentregister', values)
            .then(res => {
                navigate('/StudentLogin');
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
    <div className='d-flex justify-content-center align-items-center bg-white vh-100' style={{ background: 'linear-gradient(to bottom, #87ceeb, #4682b4)'}}>
        <div style={{backgroundColor: 'white', fontFamily: 'Poppins, sans-serif', boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)' }} className=' p-3 rounded w-40'>
            <center><h2 style={{ marginBottom: '50px' }}>Register</h2></center>
                <form action="" onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='name'><strong>Name</strong></label>
                                <div className='input-container'>
                                <input type='text' placeholder='' name='name'
                                onChange={handleChange} className='form-control rounded-0' />
                                </div>
                                {errors.name && <span className='text-danger'>{errors.name}</span>}
                            </div>
                        </div>
                         <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='year_level'><strong>Year Level</strong></label>
                                <div className='input-container'>
                                <input type='number' placeholder='' name='year_level'
                                onChange={handleChange} className='form-control rounded-0' />
                                </div>
                               {errors.year_level && <span className='text-danger'>{errors.year_level}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='course'><strong>Course</strong></label>
                                <div className='input-container'>
                                <input type='text' placeholder='' name='course'
                                onChange={handleChange} className='form-control rounded-0' />
                                </div>
                                {errors.course && <span className='text-danger'>{errors.course}</span>}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='department'><strong>Department</strong></label>
                                <div className='input-container'>
                                <input type='text' placeholder='' name='department'
                                onChange={handleChange} className='form-control rounded-0' />
                                </div>
                                {errors.department && <span className='text-danger'>{errors.department}</span>}
                            </div>
                        </div>
                    </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <div className='input-container'>
                    <input type='email' placeholder='example@gmail.com' name='email'
                    onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='username'><strong>Username</strong></label>
                            <div className='input-container'>
                            <input type='username' placeholder='' name='username'
                            onChange={handleChange} className='form-control rounded-0' />
                            </div>
                            {errors.username && <span className='text-danger'>{errors.username}</span>}
                        </div>
                    </div>
                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='password'><strong>Password</strong></label>
                            <div className='input-container'>
                            <input type={type} placeholder='' name='password'
                            onChange={handleChange} className='form-control rounded-0' />
                            <span onClick={handleToggle} className='icon'><Icon icon={icon} size={18}/></span>
                            </div>
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: '40px' }}></div>
                <div className='mb-3 text-center'>
                    <button type='submit' style={{backgroundColor: '#1e90ff'}} className='btn btn-success w-50 rounded-0'>Register Account</button>
                </div>
                <div style={{ marginBottom: '20px' }}></div>
                <center><p>Already have an account?&nbsp;
                    <Link to="/StudentLogin" style={{ textDecoration: 'none' }}>
                        Login
                    </Link>
                    </p></center>
            </form>
        </div>
    </div>
  )
}

export default Studentregister