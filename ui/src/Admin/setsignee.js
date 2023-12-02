import React, {useState, useEffect} from 'react'
import AdminNav from './adminnav'
import './adminhome.css'


function Setsignee({Toggle}) {
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem('selectedData')) || [];
    setSelectedData(storedData);
  }, []);

  const handleRemove = (id) => {
    const updatedSelectedData = selectedData.filter(item => item.id !== id);
    setSelectedData(updatedSelectedData);
    localStorage.setItem('selectedData', JSON.stringify(updatedSelectedData));
  };
  
  return (
    <div className='px-3'>
        <AdminNav Toggle={Toggle}/>

        <div>
        <h2>Selected Signee</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((selectedItem, index) => (
                <tr key={index}>
                <td>{selectedItem.id}</td>
                <td>{selectedItem.name}</td>
                <td>{selectedItem.designation}</td>
                <td>
                  {/* Add any additional actions for the second table */}
                  <button onClick={() => handleRemove(selectedItem.id)} className="btn btn-danger custom-button">Remove</button>
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