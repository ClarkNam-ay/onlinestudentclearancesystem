import React from 'react'
import { Link } from 'react-router-dom'

function frontpage() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div style={{backgroundColor: '#87ceeb', fontFamily: 'Poppins, sans-serif'}} className='p-3 rounded w-25'>
            <center><h2>Login As</h2></center>
            <div className='mb-3'>
                <Link to="/StudentLogin" style={{backgroundColor: '#2e8b57', color: 'white'}} className='btn btn-default border w-100 rounded-0 text-decoration-none'>
                    Student
                </Link>
            </div>
            <div className='mb-3'>
                <Link to="/SigneeLogin" style={{backgroundColor: '#2e8b57', color: 'white'}} className='btn btn-default border w-100 rounded-0 text-decoration-none'>
                    Signee
                </Link>
            </div>
            <div className='mb-3'>
                <Link to="/AdminLogin" style={{backgroundColor: '#2e8b57', color: 'white'}} className='btn btn-default border w-100 rounded-0 text-decoration-none'>
                    Admin
                </Link>
            </div>
        </div>
    </div>
  )
}

export default frontpage