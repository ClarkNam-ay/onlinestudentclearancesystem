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

  const [selectedData, setSelectedData] = useState([]);
  const handleSelect = (registersignee) => {
    
    // Check if the signee is already selected
    if (!selectedData.find(item => item.id === registersignee.id)) {

    // Move the selected signee to another table
    const updatedSelectedData = [...selectedData, registersignee];
    setSelectedData(updatedSelectedData);

    localStorage.setItem('selectedData', JSON.stringify(updatedSelectedData));
    }
  };
      //Block Function
  const handleBlock = (id) => {
    // You can customize the endpoint and request type based on your backend API
    axios.put('http://localhost:8082/viewsigneeaccount/block/'+id)
      .then(() => {
        setData(prevData => {
          // Update the data, marking the specific item as blocked
          return prevData.map(item => (item.id === id ? { ...item, blocked: true } : item));
        });
      })
      .catch(err => console.log(err));
  };
      //Unblock Function
  const handleUnblock = (id) => {
    axios.put('http://localhost:8082/viewsigneeaccount/unblock/'+id)
      .then(() => {
        setData(prevData => {
          return prevData.map(item => (item.id === id ? { ...item, blocked: false } : item));
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-3'>
        <AdminNav Toggle={Toggle}/>

        <div>
            <div>
                <h2 className=" p-3 bg-white">Signee Account</h2>
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
                  //Assigned Function
                  const isAssigned = selectedData.find(item => item.id === registersignee.id);
                  const isBlocked = registersignee.blocked; // Check if the item is blocked
                  return <tr key={index}>
                      <td>{registersignee.id}</td>
                      <td>{registersignee.name}</td>
                      <td>{registersignee.designation}</td>
                      <td>{registersignee.email}</td>
                      <td>{registersignee.username}</td>
                      {/* <td>{registersignee.password}</td>*/}
                      <td>
                      {/*Mao ni para sa button nga para blocked */}
                      <button
                        className={`btn ${isBlocked ? 'btn-success' : 'btn-danger'} custom-button`}
                        onClick={() => (isBlocked ? handleUnblock(registersignee.id) : handleBlock(registersignee.id))}
                      >
                        {isBlocked ? 'Unblock' : 'Block'}
                      </button>

                      {/*Mao ni para sa button nga para delete */}
                        <button onClick={ () => handleDelete(registersignee.id)} className="btn btn-warning custom-button">Delete</button>
                     
                     {/*Mao ni para sa button nga mahimong assigned */}
                        {isAssigned ? (
                            <span className="text-success">Assigned</span>
                          ) : (
                            <button
                              onClick={() => handleSelect(registersignee)}
                              className="btn btn-primary custom-button"
                            >
                              Set Signee
                            </button>
                          )}

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