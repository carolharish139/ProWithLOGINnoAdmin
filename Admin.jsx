import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user', error);
      });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} 
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
