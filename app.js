const express = require('express');
const cors = require('cors');
const carRoutes = require('./routes/cars');  // ניתובים לרכבים
const userRoutes = require('./routes/users');  // ניתובים למשתמשים

const app = express();
const port = 3001;

app.use(cors());  // מאפשר חיבורים מכל דומיין
app.use(express.json());  // מאפשר קריאת body בבקשות POST/PUT

// הגדרת הניתובים
app.use('/cars', carRoutes);  // ניתובים הקשורים לרכבים
app.use('/users', userRoutes);  // ניתובים הקשורים למשתמשים

// האזנה על הפורט
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
