const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // GET route code here
  console.log('teams router get');
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

router.get('/searchforteams/:id', (req, res) => {
  console.log('in router.get api/teams/searchforteams');
  const queryText = `
    SELECT "teams"."id" AS "teams_id", "teams"."name" FROM "teams"
    WHERE "contests_id" = $1 ORDER BY "name" ASC;`;
  pool.query(queryText, [req.params.id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in GET /searchforteams/:id', error);
    res.sendStatus(501);
  });
});

router.get('/searchforcaptains/:id', (req, res) => {
  console.log('in router.get api/teams/searchforcaptains');
  const queryText = `
    SELECT "user"."teams_id", CONCAT("first_name", ' ', "last_name") AS "name" from "user"
    JOIN "teams"
    ON "teams"."id" = "user"."teams_id"
    WHERE "contests_id" = $1 AND "admin" = 'CAPTAIN' ORDER BY "name" ASC;`;
  pool.query(queryText, [req.params.id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in GET /searchforteams/:id', error);
    res.sendStatus(501);
  });
})

// Post route creates a team then updates users admin level to be captain
router.post('/', (req, res) => {
  const team_name = req.body.team_name;
  const team_photo = req.body.team_photo;
  const user_id = req.user.id;
  const contests_id = req.body.contests_id;
  const company_name = req.body.company_name;

  let queryText = `
    INSERT INTO "teams" ("name", "team_logo", "contests_id", "company_name") 
    VALUES ($1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/A-Team-Logo.svg/1200px-A-Team-Logo.svg.png', $2, $3) RETURNING "id";`
  pool.query(queryText, [team_name, contests_id, company_name])
  // First Then
  .then(result => {
    const team_id = result.rows[0].id;
    // Upon success of first query, queryString is to update user admin level to captain and their team id.
    let queryString = `UPDATE "user" SET "admin" = 'CAPTAIN', "teams_id" = $1 WHERE "id" = $2;`;
    pool.query(queryString, [team_id, user_id])
    // Second Then
    .then(() => {
      res.sendStatus(201);
    })
    // Catch for second query
    .catch(error => {
      console.log('We have an error in second catch /api/teams', error);
      res.sendStatus(501);
    })
  })
  // Catch for first query
  .catch(error => {
    console.log('We have an error in first catch /api/teams', error);
    res.sendStatus(501);
  })
});

module.exports = router;