import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../Student/style.css'
import SigneeHome from './signeehome'

function Signeedashboard() {
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
                        <i className='bi bi-mortarboard-fill  me-3 fs-4'></i>
                        <span className='brand-name fs-4'>Signee</span>
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