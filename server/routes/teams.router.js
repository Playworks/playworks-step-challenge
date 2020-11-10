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

// Post route creates a team then updates users admin level to be captain
router.post('/', (req, res) => {
  const team_name = req.body.team_name;
  const team_photo = req.body.team_photo;
  const user_id = req.user.id;
  const contest_id = req.user.contests_id;
  console.log('this is our info we need from client', team_name, team_photo, user_id, contest_id)
  let queryText = `
    INSERT INTO "teams" ("name", "team_logo", "contests_id") 
    VALUES ($1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/A-Team-Logo.svg/1200px-A-Team-Logo.svg.png', $2) RETURNING "id";`
  pool.query(queryText, [team_name, contest_id])
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