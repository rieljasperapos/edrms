import { useState, useEffect } from 'react';
import Navbar from './components/navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
