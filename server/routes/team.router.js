const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  // GET route code here
  console.log('team router get');
  const queryString = `
  SELECT * FROM "teams"
  `
  pool.query(queryString)
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

module.exports = router;