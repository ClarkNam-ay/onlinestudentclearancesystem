import React from 'react'
import AdminNav from './adminnav'
import './adminhome.css'
import { Link } from 'react-router-dom'

function Adminhome({Toggle}) {
  
  return (
    <div className='px-3'>
        <AdminNav Toggle={Toggle}/>
        <div className='container-fluid'>
          <div className='row g-3 my-2'>
            <div className='col-md-3'>
              <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                <div>
                  <Link to="/dashviewstudentacc" style={{textDecoration: 'none', color: 'black'}}><h3 className='fs-2'>Student Account</h3>
                  <p className='fs-5'>16 Accounts</p></Link>
                </div>
               {/*<i className='bi bi-mortarboard-fill  p-3 fs-1'></i>*/}
              </div>
            </div>

            <div className='col-md-3'>
              <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                <div>
                  <Link to="/dashviewstudentacc" style={{textDecoration: 'none', color: 'black'}}><h3 className='fs-2'>Signee Account</h3>
                  <p className='fs-5'>8 Accounts</p></Link>
                </div>
               {/*<i className='bi bi-mortarboard-fill  p-3 fs-1'></i>*/}
              </div>
            </div>
          </div>
        </div>            
    </div>
  )
}

export default Adminhome