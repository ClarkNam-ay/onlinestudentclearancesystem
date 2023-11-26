import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'
import './style.css'
import Studenthome from './studenthome'

function Studentdashboard() {
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }
  return (
    <>
    <div style={{backgroundColor: '#87ceeb'}} className='container-fluid min-vh-100'>
        <div className='row'>
            {toggle && <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
                <div className='bg-white sidebar p-2'>
                    <div className='m-2'>
                        <i className='bi bi-mortarboard-fill  me-3 fs-4'></i>
                        <span className='brand-name fs-4'>Student</span>
                    </div>
                    <hr className='text-dark' />
                    <div className='list-group list-group-flush'>
                        <Link to='' className='list-group-item py-2'>
                            <i className='bi bi-send-fill fs-5 me-3'></i>
                            <span>Submit Clearance Request</span>
                        </Link>
                        <Link to='/viewclearancestatus' className='list-group-item py-2'>
                            <i className='bi bi-bar-chart-fill fs-5 me-3'></i>
                            <span>View Clearance Status</span>
                        </Link>
                    </div>
                </div>
            </div>}
            {toggle && <div className='col-4 col-md-2'></div>}
            <div className='col'>
                <Studenthome Toggle={Toggle}/>
            </div>
        </div>
    </div>
    <footer className="text-center py-3" style={{ backgroundColor: 'lightseagreen', color: 'white' }}>
    <p className="mb-0">&copy; Copyright 2023 Reneille Clark Nam-ay and Eloisa Ann Velasco. All Rights Reserved.</p>
  </footer>
  </>
  )
}

export default Studentdashboard