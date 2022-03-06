import React from 'react';
import './App.css';
import {Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Home from './components/home/home';
import Detail from './components/detail/detail'
import Create from './components/create/create';


function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/create' element={<Create />} />
    </Routes>
  );
}

export default App;
