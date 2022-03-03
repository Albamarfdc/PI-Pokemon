import React from 'react';
import './App.css';
import {Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Home from './components/home/home';


function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />}/>
    </Routes>
  );
}

export default App;
