import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard.jsx";
import AddRecord from "./pages/AddRecord.jsx";
import PatientRecordList from "./pages/PatientRecordList.jsx";
import PatientRecord from "./pages/PatientRecord.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Visit from "./pages/Visit.jsx";
import Calendar from "./pages/Calendar.jsx";
import Manage from "./pages/Manage.jsx";

function App() {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [addRecordSuccess, setAddRecordSucess] = useState(false);

  useEffect(() => {
    // Check if the signupSuccess query parameter is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("signupSuccess") === "true") {
      setSignupSuccess(true);
    }

    if (urlParams.get("addRecordSuccess") === "true") {
      setAddRecordSucess(true);
    }
  }, []);

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
          <Route path="/calendar/*" element={<Calendar />} />
          <Route path="/manage" element={<Manage />} />

          {/* Use Navigate to redirect after successful signup */}
          {signupSuccess && <Navigate to="/signin" replace />}
          {addRecordSuccess && <Navigate to="/addRecord" replace />}

          <Route index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
