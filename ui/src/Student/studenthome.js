import React, {useState, useEffect} from 'react'
import Studentnav from './studentnav'


function Studenthome({Toggle}) {
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem('selectedData')) || [];
    setSelectedData(storedData);
  }, []);


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
                  <button className="btn btn-primary custom-button">Request</button>
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