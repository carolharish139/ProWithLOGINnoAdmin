import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/CarDetails.css';

function CarDetails({ cars }) { // ודא ש-cars מועבר כראוי
  const { id } = useParams();
  const car = cars.find(c => c.id === parseInt(id));

  if (!car) {
    return <div className="car-details"><h2>Car not found!</h2></div>;
  }

  return (
    <div className="car-details">
      <h1>{car.name}</h1>
      <img src={car.image} alt={car.name} />
      <p>Type: {car.type}</p>
      <p>Price: ${car.price} per day</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default CarDetails;