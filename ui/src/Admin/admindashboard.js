import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../Student/style.css'

import SetSignee from './setsignee'
import StudentAccount from './viewstudentaccount'
import SigneeAccount from './viewsigneeaccount'

import { useSigneeData } from '../SigneeDataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Admindashboard() {
    const { user } = useSigneeData();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    console.log('Username:', username);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.username){
                const response = await axios.get('http://localhost:8082/get-admin-user/'+user.username); 
                const { username } = response.data;
                setUsername(username);
                }
              } catch (error) {
                console.error('Error fetching signee user details:', error);
              }
            };
        
            fetchData();
          }, [user]);

          useEffect(() => {
            // Check if the user is logged in
            if (!user || !user.username) {
              // Redirect to login page
              navigate('/'); 
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
    <div className='container-fluid min-vh-100' style={{ background: 'linear-gradient(to bottom, #87ceeb, #4682b4)'}}>
        <div className='row'>
            {toggle && <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
                <div className='bg-white sidebar p-2'>
                    <div className='m-2'>
                    {username && <h2>{username}</h2>}
                    </div>
                    <hr className='text-dark' />
                    <div className='list-group list-group-flush'>
                        <button onClick={() => handleButtonClick('setsignee')} className='list-group-item py-2'>
                            <i className='bi bi-send-fill fs-5 me-3'></i>
                            <span>Set Signee</span> 
                        </button>
                        <button onClick={() => handleButtonClick('studentaccount')} className='list-group-item py-2'>
                            <i className='bi bi-send-fill fs-5 me-3'></i>
                            <span>Student Account</span> 
                        </button>
                        <button onClick={() => handleButtonClick('signeeaccount')} className='list-group-item py-2'>
                            <i className='bi bi-send-fill fs-5 me-3'></i>
                            <span>Signee Account</span> 
                        </button>
                    </div>
                </div>
            </div>}
            {toggle && <div className='col-4 col-md-2'></div>}
            <div className='col'>
                {selectedView === 'setsignee' && <SetSignee Toggle={Toggle}/>}
                {selectedView === 'studentaccount' && <StudentAccount Toggle={Toggle}/>}
                {selectedView === 'signeeaccount' && <SigneeAccount Toggle={Toggle}/>}
                {!selectedView && <SetSignee Toggle={Toggle} />}
            </div>
        </div>
    </div>
    <footer className="text-center py-3" style={{ backgroundColor: 'lightseagreen', color: 'white' }}>
    <p className="mb-0">&copy; Copyright 2023 Reneille Clark Nam-ay and Eloisa Ann Velasco. All Rights Reserved.</p>
  </footer>
  </>
  )
}

export default Admindashboard