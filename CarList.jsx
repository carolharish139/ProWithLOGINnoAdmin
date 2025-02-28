// CarList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CarList.css';

function CarList({ cars, updateCar }) {
  return (
    <div className="car-list">
      {cars.map(car => (
        <div key={car.id} className="car-item">
          <img src={car.image} alt={car.name} />
          <h2>{car.name}</h2>
          <p>{car.type}</p>
          <p>${car.price} per day</p>
          <Link to={`/details/${car.id}`}>View Details</Link>
          <Link to={`/edit/${car.id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
}

export default CarList;