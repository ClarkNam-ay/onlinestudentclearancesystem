import React from 'react'
import { Link } from 'react-router-dom'
import './frontpage.css'

function frontpage() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{ background: 'linear-gradient(to bottom, #87ceeb, #4682b4)'}}>
        <div style={{backgroundColor: 'white', fontFamily: 'Poppins, sans-serif'}} className='p-3 rounded w-25 wrapper'>
            <center><h2>Login As</h2></center>
            <div style={{ marginBottom: '30px' }}></div>
            <div className='mb-3'>
                <Link to="/StudentLogin" style={{backgroundColor: '#1e90ff', color: 'white'}} className='btn btn-default border w-100  text-decoration-none'>
                    Student
                </Link>
            </div>
            
            <div className='mb-3'>
                <Link to="/SigneeLogin" style={{backgroundColor: '#1e90ff', color: 'white'}} className='btn btn-default border w-100  text-decoration-none'>
                    Signee
                </Link>
            </div>
            
            <div className='mb-3'>
                <Link to="/AdminLogin" style={{backgroundColor: '#1e90ff', color: 'white'}} className='btn btn-default border w-100  text-decoration-none'>
                    Admin
                </Link>
            </div>
        </div>
    </div>
  )
}

export default frontpage