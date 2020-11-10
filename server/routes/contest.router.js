const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();


router.get('/', (req, res) => {
  const queryText = `SELECT "contests"."id", "contests"."name" FROM "contests";`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error in /api/contest GET', error);
  });
});

module.exports = router;