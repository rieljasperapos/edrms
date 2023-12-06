import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import AddRecord from "./pages/AddRecord.jsx";
import PatientRecordList from "./pages/PatientRecordList.jsx";
import PatientRecord from "./pages/PatientRecord.jsx";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import AccountSession from "./components/accountSession.jsx";
import Visit from "./pages/Visit.jsx";
import Calendar from "./pages/calender.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addRecord" element={<AddRecord />} />
          <Route path="/patientRecordList" element={<PatientRecordList />} />
          <Route path="/patientRecord/:patientId" element={<PatientRecord />} />
          <Route path="/visit/:patientId" element={<Visit />} />
          <Route exact path="/calendar/*" element={<Calendar />} />

          <Route index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
