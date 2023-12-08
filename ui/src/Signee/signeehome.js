import React from 'react'
import SigneeNav from './signeenav'
import { useSigneeData } from '../SigneeDataContext'

function Signeehome({Toggle}) {
  console.log('Signeehome Rerendered');

  const { requestingStudents } = useSigneeData();



  return (
    <div className='px-3'>
        <SigneeNav Toggle={Toggle}/>
        
        <div>
      <h2 className=" p-3 bg-white">Student Request</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Student Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {requestingStudents.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
              <td>
                <button className="btn btn-primary custom-button">Approve</button>
                <button className="btn btn-danger custom-button">Reject</button>
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