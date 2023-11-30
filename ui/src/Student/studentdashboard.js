import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'

import ViewClearStat from './viewcleartable'
import PrintClearance from './printclearance'
import SubmitClearReq from './studenthome'


function Studentdashboard() {
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
                        <button onClick={() => handleButtonClick('submitClearance')} className='list-group-item py-2'>
                            <i className='bi bi-send-fill fs-5 me-3'></i>
                            <span>Submit Clearance Request</span>
                        </button>
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
            {selectedView === 'viewClearanceStatus' && <ViewClearStat Toggle={Toggle}/>}
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