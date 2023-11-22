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
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addRecord" element={<AddRecord />} />
          <Route
            exact
            path="/patientRecordList"
            element={<PatientRecordList />}
          />
          <Route exact path="/patientRecord" element={<PatientRecord />} />
          <Route exact path={"/visit"} element={<Visit />} />
          <Route exact path={"/calendar"} element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
