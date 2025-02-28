import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CarDetails from './components/CarDetails';
import AddCarForm from './components/AddCarForm';
import EditCarForm from './components/EditCarForm';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';

import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // בדיקה אם המשתמש מחובר בעת טעינת הדף
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/cars/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the car data!', error);
      });
  }, []);

  const addCar = (car) => {
    setCars((prevCars) => [...prevCars, car]);
  };

  const updateCar = (updatedCar) => {
    setCars((prevCars) => prevCars.map(car => (car.id === updatedCar.id ? updatedCar : car)));
  };

  // פונקציה להתנתקות
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // מחיקת המידע על התחברות
  };

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={isLoggedIn ? <Home cars={cars} /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details/:id" element={<CarDetails cars={cars} />} />
          <Route path="/add-car" element={<AddCarForm addCar={addCar} />} />
          <Route path="/edit/:id" element={<EditCarForm cars={cars} updateCar={updateCar} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

