const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// gets challenges ordered by date, communicates with fetchChallengesSaga
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('challenges router get');
  const queryString = `
  SELECT * FROM "challenges"
  ORDER BY "date" ASC;
  `
  pool.query(queryString)
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

// post route communicates with createChallengesSaga
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('challenges router post', req.body);
  let name = req.body.name;
  let description = req.body.description;
  let date = req.body.date;
  const queryString = `
    INSERT INTO "challenges" ("name", "description", "date")
    VALUES ($1, $2, $3);
    `;
  pool.query(queryString, [name, description, date])
  .then(response => {
    console.log('Added challenge', response);
    res.send(response.rows)  
  })
  .catch(error => {
    console.log('error challenges router post', error);
    res.sendStatus(500);
  })
});

// put route communicates with updateChallengeSaga
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log('req', req.body);
  let name = req.body.name;
  let description = req.body.description;
  let date = req.body.date;
  let id = req.body.id;
  let queryString = `
    UPDATE "challenges"
    SET
    "name" = $1,
    "description" = $2,
    "date" = $3
    WHERE "id" = $4;
    `;
  pool.query(queryString, [name, description, date, id])
  .then(response => {
    res.sendStatus(200)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

module.exports = router;