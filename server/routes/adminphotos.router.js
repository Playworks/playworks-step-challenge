const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// communicates with adminDeletePhotoSaga, deletes photo by photo id
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete, this is req.params.id', req.params.id);
  const queryText = `DELETE FROM "photos" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('We have an error in /api/adminphotos/:id DELETE', error);
    res.sendStatus(500);
  });
});

// Get route that communicates with fetchContestPhotosSaga
router.get('/:id', rejectUnauthenticated, (req, res) => {
  let contest_id = req.params.id;
  let queryText = `
    SELECT "contests"."id" AS "contest_id",
    "user"."first_name", 
    "user"."last_name", 
    "photos"."file_url", 
    "challenges"."name", 
    "user"."image_path", 
    "photos"."id", 
    "teams"."company_name" 
    FROM "user"
    JOIN "contests" ON "user"."contests_id" = "contests"."id"
    JOIN "teams" ON "user"."teams_id" = "teams"."id"
    JOIN "photos" ON "photos"."user_id" = "user"."id"
    JOIN "challenges" ON "challenges"."id" = "photos"."challenges_id"
    WHERE "user"."contests_id" = $1;`;
  pool.query(queryText, [contest_id])
  .then(results => {
    res.send(results.rows);
  })
  .catch(error => {
    console.log('we have an error in adminphotos.router GET', error);
    res.sendStatus(500);
  });
});

module.exports = router;