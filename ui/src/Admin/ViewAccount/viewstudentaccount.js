import React, { useEffect, useState } from 'react'
import AdminNav from '../adminnav'
import axios from 'axios'
import '../adminhome.css'


function Viewstudentaccount({Toggle}) {

    const [data, setData] = useState([])
  useEffect(()=> {
    axios.get('http://localhost:8082/adminhome')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8082/adminhome/delete/'+id)
    .then(() => {
      setData(prevData => prevData.filter(item => item.id !== id));
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='px-3'>
        <AdminNav Toggle={Toggle}/>

        <div>
          <div>
            <h2 className=" p-3 bg-white">Student Account</h2>
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Year Level</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Username</th>
                  {/* <th>Password</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((registerstudent, index) => {
                  return <tr key={index}>
                      <td>{registerstudent.id}</td>
                      <td>{registerstudent.name}</td>
                      <td>{registerstudent.year_level}</td>
                      <td>{registerstudent.course}</td>
                      <td>{registerstudent.department}</td>
                      <td>{registerstudent.email}</td>
                      <td>{registerstudent.username}</td>
                      {/* <td>{registerstudent.password}</td>*/}
                      <td>
                        <button className="btn btn-danger custom-button">Block</button>
                        <button className="btn btn-success custom-button">Unblock</button>
                        <button onClick={ () => handleDelete(registerstudent.id)} className="btn btn-warning custom-button">Delete</button>
                      </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default Viewstudentaccount