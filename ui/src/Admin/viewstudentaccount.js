import React, { useEffect, useState } from 'react'
import AdminNav from './adminnav'
import axios from 'axios'
import './adminhome.css'


function Viewstudentaccount({Toggle}) {

  const [notification, setNotification] = useState('');

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
      setNotification('Deleted successfully');
    })
    .catch(err => console.log(err));
  }

  //Block Function
  const handleBlock = (id) => {
    axios.put('http://localhost:8082/viewstudentaccount/block/'+id)
      .then(() => {
        setData(prevData => {
          // Update the data, marking the specific item as blocked
          return prevData.map(item => (item.id === id ? { ...item, blocked: true } : item));
        });
        setNotification('Blocked successfully');
      })
      .catch(err => console.log(err));
  };
      //Unblock Function
  const handleUnblock = (id) => {
    axios.put('http://localhost:8082/viewstudentaccount/unblock/'+id)
      .then(() => {
        setData(prevData => {
          return prevData.map(item => (item.id === id ? { ...item, blocked: false } : item));
        });
        setNotification('Unblocked successfully');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-3'>
        <AdminNav Toggle={Toggle}/>

        <div>
          <div>
          {notification && <div className="alert alert-success">{notification}</div>}
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((registerstudent, index) => {
                  const isBlocked = registerstudent.blocked; // Check if the item is blocked
                  return <tr key={index}>
                      <td>{registerstudent.id}</td>
                      <td>{registerstudent.name}</td>
                      <td>{registerstudent.year_level}</td>
                      <td>{registerstudent.course}</td>
                      <td>{registerstudent.department}</td>
                      <td>{registerstudent.email}</td>
                      <td>{registerstudent.username}</td>
                      
                      <td>

                       {/*Mao ni para sa button nga para blocked */}
                      <button
                        className={`btn ${isBlocked ? 'btn-success' : 'btn-danger'} custom-button`}
                        onClick={() => (isBlocked ? handleUnblock(registerstudent.id) : handleBlock(registerstudent.id))}
                      >
                        {isBlocked ? 'Unblock' : 'Block'}
                      </button>

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