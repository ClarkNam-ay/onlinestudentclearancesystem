import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './studentregistervalidation'
import axios from 'axios'

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
  return (
    <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
        <div style={{backgroundColor: '#87ceeb', fontFamily: 'Poppins, sans-serif'}} className=' p-3 rounded w-40'>
            <center><h2>Register</h2></center>
                <form action="" onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='name'><strong>Fullname</strong></label>
                                <input type='text' placeholder='Reneille Clark Nam-ay' name='name'
                                onChange={handleChange} className='form-control rounded-0' />
                                {errors.name && <span className='text-danger'>{errors.name}</span>}
                            </div>
                        </div>
                         <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='year_level'><strong>Year Level</strong></label>
                                <input type='number' placeholder='3' name='year_level'
                                onChange={handleChange} className='form-control rounded-0' />
                               {errors.year_level && <span className='text-danger'>{errors.year_level}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='course'><strong>Course</strong></label>
                                <input type='text' placeholder='BSCS' name='course'
                                onChange={handleChange} className='form-control rounded-0' />
                                {errors.course && <span className='text-danger'>{errors.course}</span>}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='department'><strong>Department</strong></label>
                                <input type='text' placeholder='CTAS' name='department'
                                onChange={handleChange} className='form-control rounded-0' />
                                {errors.department && <span className='text-danger'>{errors.department}</span>}
                            </div>
                        </div>
                    </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Example@gmail.com' name='email'
                    onChange={handleChange} className='form-control rounded-0' />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='username'><strong>Username</strong></label>
                    <input type='username' placeholder='Enter username' name='username'
                    onChange={handleChange} className='form-control rounded-0' />
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
                    <Link to="/StudentLogin" style={{backgroundColor: '#2e8b57', color: 'white'}} className='btn btn-default border w-100 rounded-0 text-decoration-none'>
                        Login
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Studentregister