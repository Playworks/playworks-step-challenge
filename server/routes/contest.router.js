const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('made it to delete this is params', req.params.id);
  const queryText = `DELETE FROM "contests" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('We have an error in /api/contest/:id DELETE', error);
    res.sendStatus(500);
  });
});

// Cannot use rejectUnauthenticated here due to on registration uses this end point to get all contests. 
router.get('/', (req, res) => {
  const queryText = `SELECT "contests"."id", "contests"."name", "contests"."start_date", "contests"."end_date" FROM "contests";`;
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