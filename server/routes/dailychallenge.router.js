const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
    const queryString = `SELECT * FROM "challenges" WHERE "date" = $1;`;
    pool.query(queryString, [req.body])
    .then(response => {    
      res.send(response.rows);
    })
    .catch(error => {
      res.status(500);
    })
  });

  module.exports = router;