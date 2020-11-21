const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// If rejectUnauthenticated is put into this route you will not be able to log in
// selects challenge of the day by date.
router.post('/', (req, res) => {
    const queryString = `SELECT * FROM "challenges" WHERE "date" = $1;`;
    pool.query(queryString, [req.body])
    .then(response => {    
      res.send(response.rows);
    })
    .catch(error => {
      console.log('we have an error in dailychallenge.router.js POST', error);
      res.status(500);
    });
  });

  module.exports = router;