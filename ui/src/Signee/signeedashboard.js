import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../Student/style.css'
import SigneeHome from './signeehome'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { useSigneeData } from '../SigneeDataContext'


function Signeedashboard() {
    const { user } = useSigneeData();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');

    console.log('Username:', username);
    console.log('Email:', email);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.username){
                // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint
                const response = await axios.get('http://localhost:8082/get-signee-user/'+user.username); // Assuming you have an endpoint to get signee user details
                const { username, email, name, designation } = response.data;
                setUsername(username);
                setEmail(email);
                setName(name);
                setDesignation(designation);
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
              navigate('/'); // Adjust the route as needed
            }
          }, [user, navigate]);
    
    const [selectedView, setSelectedView] = useState(null);
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }

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
                        {email && <p>{email}</p>}
                        {email && <p><strong>Name: </strong>{name}</p>}
                        {email && <p><strong>Designation: </strong>{designation}</p>}
                    </div>
                    <hr className='text-dark' />
                    <div className='list-group list-group-flush'>
                        <button onClick={() => handleButtonClick('viewclearreq')} className='list-group-item py-2'>
                            <i className='bi bi-send-fill fs-5 me-3'></i>
                            <span>View Clearance Request</span> 
                        </button>
                    </div>
                </div>
            </div>}
            {toggle && <div className='col-4 col-md-2'></div>}
            <div className='col'>
                {selectedView === 'viewclearreq' && <SigneeHome Toggle={Toggle}/>}
                {!selectedView && <SigneeHome Toggle={Toggle} />}
            </div>
        </div>
    </div>
    <footer className="text-center py-3" style={{ backgroundColor: 'lightseagreen', color: 'white' }}>
    <p className="mb-0">&copy; Copyright 2023 Reneille Clark Nam-ay and Eloisa Ann Velasco. All Rights Reserved.</p>
  </footer>
  </>
  )
}

export default Signeedashboard