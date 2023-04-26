import React from 'react';
import './App.css';
import Form from './components/Form';
import Success from './pages/Success/Success';
import { Routes,Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form/>}/>
      <Route path="/verified/" element={<Success/>}/>
      <Route path="/*" element={<Navigate to="/"/>}/>
    </Routes>
    
  );
}

export default App;
