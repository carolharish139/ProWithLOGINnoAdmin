const express = require('express');
const dbSingleton = require('../dbSingleton');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = dbSingleton.getConnection();

// רישום משתמש חדש
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // הצפנת הסיסמה
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, 'user'], (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'There was an error registering!' });
        return;
      }
      res.json({ message: 'User registered!', id: results.insertId });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ message: 'There was an error registering!' });
  }
});

// התחברות משתמש
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'There was an error logging in!' });
        return;
      }

      if (results.length > 0) {
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);  // השוואת הסיסמה המוצפנת

        if (passwordMatch) {
          res.json({ message: 'Login successful!', user });
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'There was an error logging in!' });
  }
});

module.exports = router;