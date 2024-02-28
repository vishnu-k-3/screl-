const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./dataB');

const app = express();

app.use(bodyParser.json());

// Registration
app.post('/register', async (req, res) => {
  const { username, password, name, bio } = req.body;

  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUsernameQuery, [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) throw hashErr;

      const insertUserQuery = 'INSERT INTO users (username, password, name, bio) VALUES (?, ?, ?, ?)';
      db.query(insertUserQuery, [username, hashedPassword, name, bio], (insertErr, result) => {
        if (insertErr) throw insertErr;

        const token = jwt.sign({ username, name }, 'your-secret-key');

        res.json({ message: 'User registered successfully', token });
      });
    });
  });
});

//Other routes

app.listen(3004, () => {
  console.log('server is running');
});
