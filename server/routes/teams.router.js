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

router.get('/searchforteams', (req, res) => {
  console.log('in router.get api/teams/searchforteams');
  console.log('this is req.user.contests_id', req.user.contests_id);
  const queryText = `
    SELECT "teams"."id" AS "teams_id", "teams"."name" FROM "teams"
    JOIN "user"
    ON "user"."teams_id" = "teams"."id"
    WHERE "user"."contests_id" = $1 ORDER BY "name" ASC;`;
  pool.query(queryText, [req.user.contests_id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in GET /searchforteams', error);
    res.sendStatus(501);
  });
});

router.get('/searchforcaptains', (req, res) => {
  console.log('in router.get api/teams/searchforcaptains');
  console.log('this is req.user.contests_id', req.user.contests_id);
  const queryText = `
    SELECT "user"."teams_id", CONCAT("first_name", ' ', "last_name") AS "name", "user"."image_path" FROM "user"
    WHERE "user"."contests_id" = $1 AND "admin" = 'CAPTAIN' ORDER BY "name" ASC;`;
  pool.query(queryText, [req.user.contests_id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in GET /searchforcaptains', error);
    res.sendStatus(501);
  });
})


// Post route creates a team then updates users admin level to be captain
router.post('/', (req, res) => {
  console.log('req.body', req.body);
  console.log('req.user', req.user);
  const team_name = req.body.team_name;
  const team_photo = req.body.team_photo;
  const user_id = req.user.id;
  const company_name = req.body.company_name;

  let queryText = `
    INSERT INTO "teams" ("name", "team_logo", "company_name") 
    VALUES ($1, $2, $3) RETURNING "id";`;
  pool.query(queryText, [team_name, team_photo, company_name])
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