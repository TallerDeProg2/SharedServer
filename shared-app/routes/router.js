const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'http://ubre-shared.herokuapp.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/rules', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/users/super`)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
