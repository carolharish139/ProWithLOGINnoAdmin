import React from 'react';
import { Link } from 'react-router-dom';
import CarList from '../components/CarList';
import '../styles/Home.css';

function Home({ cars }) {
  return (
    <div className="home">
      <h1>Car Rental</h1>
      <div className="add-car-button">
        <Link to="/add-car">
          <button>Add Car</button>
        </Link>
      </div>
      <CarList cars={cars} />
    </div>
  );
}

export default Home;