import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditCarForm.css';

function EditCarForm({ cars, updateCar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({ name: '', type: '', price: '', image: '' });

  useEffect(() => {
    const car = cars.find(c => c.id === parseInt(id));
    if (car) {
      setCarData(car);
    }
  }, [cars, id]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3001/cars/cars/${id}`, carData)
      .then(response => {
        console.log('Car updated!', response.data);
        updateCar({ ...carData, id: parseInt(id) });  // עדכון הסטייט בצד הלקוח
        navigate('/');  // חזרה לדף הבית
      })
      .catch(error => {
        console.error('There was an error updating the car!', error);
      });
  };

  return (
    <div className="edit-car-form">
      <h1>Edit Car</h1>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditCarForm;
