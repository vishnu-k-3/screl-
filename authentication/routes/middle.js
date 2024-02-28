const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

const secretKey = 'keybasic1';

const authenticateToken = expressjwt({ secret: secretKey, algorithms: ['HS256'] });

app.get('/prot-route', authenticateToken, (req, res) => {
  res.json({ message: 'protected route', user: req.user });
});

app.listen(3004, () => {
  console.log('Server is running');
});
