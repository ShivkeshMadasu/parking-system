import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ParkingPage from './components/ParkingPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find" element={<ParkingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
