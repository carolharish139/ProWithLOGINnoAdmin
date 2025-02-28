// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../dbSingleton').getConnection();  // אם אתה משתמש ב-dbSingleton
const router = express.Router();

// נתיב להרשמה
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // בדוק אם המשתמש כבר קיים
  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkQuery, [username], (err, results) => {
    if (err) {
      return res.json({ success: false, error: err.message });
    }

    // אם המשתמש קיים, החזר שגיאה
    if (results.length > 0) {
      return res.json({ success: false, error: 'שם המשתמש כבר קיים!' });
    }

    // הצפנת הסיסמה
    const hashedPassword = bcrypt.hashSync(password, 10);

    // הוספת המשתמש למסד הנתונים
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, 'user'], (err, results) => {
      if (err) {
        return res.json({ success: false, error: err.message });
      }
      res.json({ success: true });
    });
  });
});

module.exports = router;
