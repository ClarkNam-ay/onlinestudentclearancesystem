import React, {useState, useEffect} from 'react'
import AdminNav from './adminnav'
import './adminhome.css'
import axios from 'axios';


function Setsignee({Toggle}) {
  const [assignedSignees, setAssignedSignees] = useState([]);
  const [notification, setNotification] = useState('');


  useEffect(() => {
    // Fetch assigned signee for all student accounts
    axios.get('http://localhost:8082/viewsigneeaccount/assigned/all')
      .then(response => {
        // Update state with the assigned signees
        setAssignedSignees(response.data);
        console.log('Assigned Signees:', response.data); // Log assigned signees
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error fetching assigned signees:', error);
      });
  }, []);

  const handleRemove = (assignedSigneeId) => {
    console.log('Removing signee with ID:', assignedSigneeId);
    // Send a request to the server to unassign the signee
    axios.put(`http://localhost:8082/viewsigneeaccount/unassign/${assignedSigneeId}`)
      .then(response => {
        // Update state by filtering out the removed signee
        setAssignedSignees(prevAssignedSignees => prevAssignedSignees.filter(signee => signee.id !== assignedSigneeId));
        setNotification('Signee unassigned successfully');
        console.log('Signee removed successfully');
      })
      .catch(error => {
        console.error('Error removing signee:', error);
      });
  };
  
  return (
    <div className='px-3'>
        <AdminNav Toggle={Toggle}/>

        <div>
        {notification && <div className="alert alert-success">{notification}</div>}
        <h2 className="p-3 bg-white">Assigned Signees</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
             
              <th>Signee Name</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedSignees.map((assignedSignee, index) => (
              <tr key={index}>
                
                <td>{assignedSignee.name}</td>
                <td>{assignedSignee.designation}</td>
                <td>
                  <button
                    className="btn btn-danger custom-button"
                    onClick={() => handleRemove(assignedSignee.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
                    
    </div>
  )
}

export default Setsignee