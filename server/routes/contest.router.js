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
    res.sendStatus(500);
  });
});

// POST route for adding contest
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('REQ.BODY', req.body);
  
  const queryString = `
      INSERT INTO "contests" ("name", "start_date", "end_date")
      VALUES ($1, $2, $3);
  `;
  pool.query(queryString, [req.body.name, req.body.start_date, req.body.end_date,])
      .then((results) => {
          res.sendStatus(201);
      })
      .catch(err => {
          console.error(`POST /songs failed`, err);
          res.sendStatus(500);
      });
});

module.exports = router;