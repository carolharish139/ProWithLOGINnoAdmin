
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddCarForm.css';

function AddCarForm() {
  const [carData, setCarData] = useState({ name: '', type: '', price: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // שליחת בקשה לשרת Node.js כדי להוסיף רכב חדש
    axios.post('http://localhost:3001/cars', carData)
      .then(response => {
        console.log('Car added!', response.data);
        navigate('/');  // לאחר הוספת הרכב, חזרה לדף הבית
      })
      .catch(error => {
        console.error('There was an error adding the car!', error);
      });
  };

  return (
    <div className="add-car-form">
      <h1>Add New Car</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={carData.name} onChange={handleChange} required />
        </label>
        <label>
          Type:
          <input type="text" name="type" value={carData.type} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={carData.price} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="image" value={carData.image} onChange={handleChange} required />
        </label>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddCarForm;
