import React, {useState, useEffect} from 'react'
import Studentnav from './studentnav'
import { useSigneeData } from '../SigneeDataContext';


function Studenthome({Toggle}) {
  const { updateRequestingStudents } = useSigneeData();
  const [selectedData, setSelectedData] = useState([]);
  const { requestingStudents } = useSigneeData();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('selectedData')) || [];
    setSelectedData(storedData);
  }, []);

  const handleRequest = (index, studentName, signeeName) => {
    console.log('Student Name:', studentName);
    console.log('Signee Name:', signeeName);
  updateRequestingStudents(studentName);
  console.log('Requesting Students:', requestingStudents); // Log the updated array
  // Additional logic if needed
  };


  return (
    <div className='px-3'>
        <Studentnav Toggle={Toggle}/>
        
        <div>
        <h2>Your Clearance</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Signee Name</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((selectedItem, index) => (
                <tr key={index}>
                <td>{selectedItem.name}</td>
                <td>{selectedItem.designation}</td>
                <td>
                  {/* Add any additional actions for the second table */}
                  <button
                    className="btn btn-primary custom-button"
                    onClick={() => handleRequest(index, selectedItem.name)}
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