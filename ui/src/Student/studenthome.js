import React, {useState, useEffect} from 'react'
import Studentnav from './studentnav'
import axios from 'axios';



function Studenthome({Toggle}) {
  const [assignedSignees, setAssignedSignees] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:8082/viewsigneeaccount/assigned/all')
      .then(response => {
        setAssignedSignees(response.data);
        console.log('Assigned Signees:', response.data);
      })
      .catch(error => {
        console.error('Error fetching assigned signees:', error);
      });
  }, []);

  const handleRequest = (assignedSigneeId) => {
    console.log(`Requesting signee with ID: ${assignedSigneeId}`);
  
    // Assuming there's an endpoint to handle the request on the server
    const requestBody = {
      studentId: 3,
      assignedSigneeId: assignedSigneeId,
    };
  
    axios.post('http://localhost:8082/request/signee', requestBody)
      .then(response => {
        console.log('Request sent successfully:', response.data);
        // You may want to update the UI or show a notification here
      })
      .catch(error => {
        console.error('Error sending request:', error);
        // Handle error, update UI, or show an error notification
      });
  };
  

  return (
    <div className='px-3'>
        <Studentnav Toggle={Toggle}/>
        
        <div>
        <h2 className="p-3 bg-white">Your Assigned Signees</h2>
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
                className="btn btn-primary custom-button"
                onClick={() => handleRequest(assignedSignee.id)}
              >
                Request
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

export default Studenthome