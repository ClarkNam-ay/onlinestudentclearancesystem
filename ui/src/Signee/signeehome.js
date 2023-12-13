import React, {useState, useEffect} from 'react'
import SigneeNav from './signeenav'
import axios from 'axios';

import { useSigneeData } from '../SigneeDataContext'


function Signeehome({Toggle}) {
  
  const [pendingRequests, setPendingRequests] = useState([]);

  const { user } = useSigneeData();
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');

  console.log('Username:', username);
  console.log('Id:', id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.username) {
          const response = await axios.get('http://localhost:8082/get-signee-user/'+user.username);
          const { username, id } = response.data;
          setUsername(username);
          setId(id);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchData();
  }, [user]);

  useEffect(() => {
    const signeeId = id;
    // Fetch pending requests from the server
    axios.get('http://localhost:8082/signee/requests/pending/'+signeeId)
      .then(response => {
        setPendingRequests(response.data);
        console.log('Server Response:', response.data);
      })
      .catch(error => {
        console.error('Error fetching pending requests:', error);
      });
  }, [id]);

  const handleApprove = () => {
    const signeeId = id;
    console.log(`Approving request with ID: ${signeeId}`);

    // Send a request to the server to update the request status to 'approved'
    axios.post("http://localhost:8082/signee/requests/approve/"+signeeId)
      .then(response => {
        console.log('Request Approved:', response.data);
        // You may want to update the UI or show a notification here
      })
      .catch(error => {
        console.error('Error approving request:', error);
        // Handle error, update UI, or show an error notification
      });
  };

  const handleReject = () => {
    const signeeId = id;
    console.log(`Rejecting request with ID: ${signeeId}`);

    // Send a request to the server to update the request status to 'rejected'
    axios.post("http://localhost:8082/signee/requests/reject/"+signeeId)
      .then(response => {
        console.log('Request Rejected:', response.data);
        // You may want to update the UI or show a notification here
      })
      .catch(error => {
        console.error('Error rejecting request:', error);
        // Handle error, update UI, or show an error notification
      });
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