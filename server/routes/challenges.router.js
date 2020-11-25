const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// gets challenges ordered by date, communicates with fetchChallengesSaga
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "challenges" ORDER BY "date" ASC;`;
  pool.query(queryString)
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    console.log('we have an error in challenges.router.js GET', error);
    res.status(500);
  });
});

// post route communicates with createChallengesSaga
router.post('/', rejectUnauthenticated, (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let date = req.body.date;
  const queryString = `
    INSERT INTO "challenges" ("name", "description", "date")
    VALUES ($1, $2, $3);`;
  pool.query(queryString, [name, description, date])
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    console.log('we have an error challenges.router.js POST', error);
    res.sendStatus(500);
  });
});

// put route communicates with updateChallengeSaga
router.put('/', rejectUnauthenticated, (req, res) => {
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
    WHERE "id" = $4;`;
  pool.query(queryString, [name, description, date, id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('we have an error in challenges.router.js PUT', error);
    res.sendStatus(500);
  });
});

module.exports = router;