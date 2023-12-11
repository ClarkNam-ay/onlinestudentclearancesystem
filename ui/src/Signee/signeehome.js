import React, {useState, useEffect} from 'react'
import SigneeNav from './signeenav'
import axios from 'axios';


function Signeehome({Toggle}) {
  
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    // Fetch pending requests from the server
    axios.get('http://localhost:8082/signee/requests/pending')
      .then(response => {
        setPendingRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching pending requests:', error);
      });
  }, []);

  const handleApprove = (requestId) => {
    console.log(`Approving request with ID: ${requestId}`);
    // Implement the logic to update the request status to approved on the server
  };

  const handleReject = (requestId) => {
    console.log(`Rejecting request with ID: ${requestId}`);
    // Implement the logic to update the request status to rejected on the server
  };

  return (
    <div className='px-3'>
        <SigneeNav Toggle={Toggle}/>
        
        <div>
        <h2 className="p-3 bg-white">Student Request</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Student Name</th>
              <th>Year Level</th>
              <th>Course</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {pendingRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.name}</td>
                <td>{request.year_level}</td>
                <td>{request.course}</td>
                <td>{request.department}</td>
                <td>
                  <button
                    className="btn btn-primary custom-button"
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger custom-button"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject
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

export default Signeehome