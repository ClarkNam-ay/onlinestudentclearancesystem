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
import SigneeDashboard from './Signee/signeedashboard'
import AdminDashboard from './Admin/admindashboard'
import ViewStudentAccount from './Admin/viewstudentaccount'


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
      <Route path="/signeedashboard" element={<SigneeDashboard />}></Route>
      <Route path="/admindashboard" element={<AdminDashboard />}></Route>
      <Route path="/viewstudentaccount" element={<ViewStudentAccount />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
