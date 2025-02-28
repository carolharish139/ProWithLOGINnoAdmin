const express = require('express');
const dbSingleton = require('../dbSingleton');
const router = express.Router();
const db = dbSingleton.getConnection();

// Read (R) - Get all cars
router.get('/cars', (req, res) => {
  const query = 'SELECT * FROM cars';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });

});

// Create (C) - Add a new car
router.post('/', (req, res) => {
  const { name, type, price, image } = req.body;
  const query = 'INSERT INTO cars (name, type, price, image) VALUES (?, ?, ?, ?)';
  db.query(query, [name, type, price, image], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'Car Added!', id: results.insertId });
  });
});

// Update (U) - Edit a car
router.put('/cars/:id', (req, res) => {
  const { id } = req.params;
  const { name, type, price, image } = req.body;
  console.log('Received update for car:', req.body);  // הדפסת נתונים מתקבלים
  const query = 'UPDATE cars SET name = ?, type = ?, price = ?, image = ? WHERE id = ?';
  db.query(query, [name, type, price, image, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    console.log('Update successful:', results);  // הדפסת תוצאות השאילתה
    res.json({ message: 'Car updated!' });
  });
});

 

// Delete (D) - Delete a car
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM cars WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'Car deleted!' });
  });
});

module.exports = router;