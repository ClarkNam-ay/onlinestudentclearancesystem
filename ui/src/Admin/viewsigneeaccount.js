import React, { useEffect, useState } from 'react'
import AdminNav from './adminnav'
import axios from 'axios'

function Viewsigneeaccount({Toggle}) {

  const [data, setData] = useState([])

  useEffect(()=> {

    // Load data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem('selectedData')) || [];
    setSelectedData(storedData);

    axios.get('http://localhost:8082/viewsigneeaccount')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8082/viewsigneeaccount/delete/'+id)
    .then(() => {
      setData(prevData => prevData.filter(item => item.id !== id));
    })
    .catch(err => console.log(err));
  }

  const [successMessage, setSuccessMessage] = useState('');
  const [selectedData, setSelectedData] = useState([]);
  const handleSelect = (registersignee) => {
    // Move the selected signee to another table
    const updatedSelectedData = [...selectedData, registersignee];
    setSelectedData(updatedSelectedData);

    localStorage.setItem('selectedData', JSON.stringify(updatedSelectedData));
    setSuccessMessage('Signee successfully set!');
  };

  return (
    <div className='px-3'>
        <AdminNav Toggle={Toggle}/>

        <div>
            <div>
                <h2 className=" p-3 bg-white">Signee Account</h2>
                {successMessage && <p className="text-success">{successMessage}</p>}
                <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Username</th>
                  {/* <th>Password</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((registersignee, index) => {
                  return <tr key={index}>
                      <td>{registersignee.id}</td>
                      <td>{registersignee.name}</td>
                      <td>{registersignee.designation}</td>
                      <td>{registersignee.email}</td>
                      <td>{registersignee.username}</td>
                      {/* <td>{registersignee.password}</td>*/}
                      <td>
                        <button className="btn btn-danger custom-button">Block</button>
                        <button className="btn btn-success custom-button">Unblock</button>
                        <button onClick={ () => handleDelete(registersignee.id)} className="btn btn-warning custom-button">Delete</button>
                        <button onClick={ () => handleSelect(registersignee)} className="btn btn-success custom-button">Set Signee</button>
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

export default Viewsigneeaccount