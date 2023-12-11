import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'
import { useNavigate } from 'react-router-dom'

import PrintClearance from './printclearance'
import SubmitClearReq from './studenthome'

import { useSigneeData } from '../SigneeDataContext'
import axios from 'axios'


function Studentdashboard() {
    const { user } = useSigneeData();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [department, setDepartment] = useState('');
    const [course, setCourse] = useState('');
    const [name, setName] = useState('');

    console.log('Username:', username);
    console.log('Email:', email);

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (user?.username) {
            const response = await axios.get('http://localhost:8082/get-user/'+user.username);
            const { username, email, year_level, department, course, name } = response.data;
            setUsername(username);
            setEmail(email);
            setYearLevel(year_level);
            setDepartment(department);
            setCourse(course);
            setName(name);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
    
      fetchData();
    }, [user]);

      useEffect(() => {
        // Check if the user is logged in
        if (!user || !user.username) {
          // Redirect to login page
          navigate('/'); // Adjust the route as needed
        }
      }, [user, navigate]);
  

    const [selectedView, setSelectedView] = useState(null);
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    };

    const handleButtonClick = (view) => {
        setSelectedView(view);
      };

  return (
    <>
    <div style={{ background: 'linear-gradient(to bottom, #87ceeb, #4682b4)'}} className='container-fluid min-vh-100'>
        <div className='row'>
            {toggle && <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
                <div className='bg-white sidebar p-2'>
                    <div className='m-2'>
                          <h2>{username}</h2>
                        {email && <p>{email}</p>}
                        {course && <p><strong>Name: </strong>{name}</p>}
                        {yearLevel && <p><strong>Year Level: </strong>{yearLevel}</p>}
                        {department && <p><strong>Department: </strong>{department}</p>}
                        {course && <p><strong>Course: </strong>{course}</p>}
                    </div>
                    <hr className='text-dark' />
                    <div className='list-group list-group-flush'>
                        <button onClick={() => handleButtonClick('viewClearanceStatus')} className='list-group-item py-2'>
                            <i className='bi bi-bar-chart-fill fs-5 me-3'></i>
                            <span>View Clearance Status</span>
                        </button>
                        <button onClick={() => handleButtonClick('printClearance')} className='list-group-item py-2'>
                            <i className='bi bi-bar-chart-fill fs-5 me-3'></i>
                            <span>Print Clearance</span>
                        </button>
                    </div>
                </div>
            </div>}
            {toggle && <div className='col-4 col-md-2'></div>}
            <div className='col'>
                 {/* Render the selected view based on the state */}
            {selectedView === 'printClearance' && <PrintClearance Toggle={Toggle}/>}
            {selectedView === 'submitClearance' && <SubmitClearReq Toggle={Toggle}/>}
            {!selectedView && <SubmitClearReq Toggle={Toggle} />}
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