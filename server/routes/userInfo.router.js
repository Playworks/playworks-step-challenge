const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "user";`;
  pool.query(queryString)
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

module.exports = router;