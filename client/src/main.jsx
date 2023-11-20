import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Visit from "./pages/Visit.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/dashboard.jsx";
import AddRecord from "./pages/AddRecord.jsx";
import PatientRecord from "./pages/PatientRecord.jsx";
import PatientRecordList from "./pages/PatientRecordList.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
     {/*<Login />*/}
     {/* <Visit />*/}
     {/* <Signup />*/}
     {/* <Dashboard />*/}
     {/* <PatientRecordList />*/}
     {/* <AddRecord />*/}
     {/* <PatientRecord />*/}
  </React.StrictMode>
);
