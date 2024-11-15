import React from 'react'
import 'bootstrap/js/dist/dropdown'
import '../Student/studentnav.css'
import 'bootstrap/js/dist/collapse'
import { Link } from 'react-router-dom'

function signeenav({Toggle}) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
            <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation"><i className='bi bi-justify'></i></button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li className="nav-item dropdown">
                        <Link to='' className="nav-link dropdown-toggle" href="#" id="dropdownId" 
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="text-black">Logout</span>
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link to='/SigneeLogin' className="dropdown-item" href="#">Logout</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
  )
}

export default signeenav