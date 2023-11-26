import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from './Student/StudentLogin';
import SigneeLogin from './Signee/SigneeLogin';
import AdminLogin from './Admin/AdminLogin';
import Frontpage from './frontpage';
import Studentregister from './Student/studentregister';
import Signeeregister from './Signee/signeeregister';
import Adminregister from './Admin/adminregister';
import Studentdashboard from './Student/studentdashboard';
import ViewClearanceStatus from './Student/viewclearancestatus'
import SigneeDashboard from './Signee/signeedashboard'
import AdminDashboard from './Admin/admindashboard'


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Frontpage />}></Route>
      <Route path="/StudentLogin" element={<StudentLogin />}></Route>
      <Route path="/SigneeLogin" element={<SigneeLogin />}></Route>
      <Route path="/AdminLogin" element={<AdminLogin />}></Route>
      <Route path="/studentregister" element={<Studentregister />}></Route>
      <Route path="/signeeregister" element={<Signeeregister />}></Route>
      <Route path="/adminregister" element={<Adminregister />}></Route>
      <Route path="/studentdashboard" element={<Studentdashboard />}></Route>
      <Route path="/viewclearancestatus" element={<ViewClearanceStatus />}></Route>
      <Route path="/signeedashboard" element={<SigneeDashboard />}></Route>
      <Route path="/admindashboard" element={<AdminDashboard />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
