import React, {useState, useEffect} from 'react'
import Studentnav from './studentnav'
import axios from 'axios';



function Studenthome({Toggle}) {
  const [assignedSignees, setAssignedSignees] = useState([]);
  

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
                  {/* Add any additional actions for the table */}
                  <button
                    className="btn btn-primary custom-button"
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