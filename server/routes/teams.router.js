const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// communicates with fetchCaptainsForJoinSaga returns captains name, image and team id by contest id
router.get('/searchforcaptains', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "user"."teams_id", CONCAT("first_name", ' ', "last_name") AS "name", "user"."image_path" FROM "user"
    WHERE "user"."contests_id" = $1 AND "admin" = 'CAPTAIN' ORDER BY "name" ASC;`;
  pool.query(queryText, [req.user.contests_id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in teams.router.js /searchforcaptains GET', error);
    res.sendStatus(500);
  });
});

// communicates with fetchTeamsForJoinSaga sends team name, id and image path by contest id
router.get('/searchforteams', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "teams"."id" AS "teams_id", "teams"."name", "team_logo" AS "image_path" FROM "teams"
    JOIN "user"
    ON "user"."teams_id" = "teams"."id"
    WHERE "user"."contests_id" = $1 AND "admin" = 'CAPTAIN' ORDER BY "name" DESC;`;
  pool.query(queryText, [req.user.contests_id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in teams.router /searchforteams GET', error);
    res.sendStatus(500);
  });
});

// Post route creates a team then updates users admin level to be captain
// communicates with createTeamSaga
router.post('/', rejectUnauthenticated, (req, res) => {
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
      console.log('We have an error in second catch /api/teams POST', error);
      res.sendStatus(500);
    })
  })
  // Catch for first query
  .catch(error => {
    console.log('We have an error in first catch /api/teams POST', error);
    res.sendStatus(500);
  });
});

// Updates user's team id in jointeam.js, communicates with joinTeamSaga
router.put('/join/:id', rejectUnauthenticated, (req, res) => {
  const selected_team_id = req.body.selected_team_id;
  const user_id = req.params.id;
  const queryText = `UPDATE "user" SET "teams_id" = $1, "admin" = 'USER' WHERE "id" = $2;`
  pool.query(queryText, [selected_team_id, user_id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(error => {
    console.log('We have an error in teams.router.js /api/teams/join/:id PUT', error);
    res.sendStatus(500);
  });
});

module.exports = router;