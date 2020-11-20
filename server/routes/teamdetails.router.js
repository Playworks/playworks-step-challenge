const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// gets users in order of steps taken
// by using the provided team :id int
// communicates with fetchTeamDetailsSaga
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in router.get api/teams/teamDetails');
    console.log('req.user.id', req.params.id);
    let teamId = req.params.id;
    console.log('team id', teamId);
    const queryText = `
      SELECT SUM("steps"."steps"), "user"."username", "user"."first_name", "user"."last_name", "user"."id", "teams"."name" FROM "user"
      JOIN "steps"
      ON "user"."id" = "steps"."user_id"
      JOIN "teams"
      ON "user"."teams_id" = "teams"."id"
      WHERE "user"."teams_id" = $1
      GROUP BY "user"."username", "user"."id", "teams"."name"
      ORDER BY "sum" DESC;`;
    pool.query(queryText, [teamId])
    .then(result => {
      console.log('result team details', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.log('We have an error in GET /searchforcaptains', error);
      res.sendStatus(501);
    });
  })

// get route communicates with fetchTeamCaptainPhotosSaga
// main filter here is shows both false/true for approved column
router.get('/captain/photos/:id', rejectUnauthenticated, (req, res) => {
  let teamId = req.params.id;
  const queryString = `
    SELECT "photos"."id", 
    "photos"."file_url", 
    "photos"."approved", 
    "photos"."date", 
    "photos"."user_id" AS "photo_user_id", 
    "challenges"."name", 
    "challenges"."description", 
    CONCAT("user"."first_name", ' ', "user"."last_name") AS "username", 
    "user"."image_path", 
    "teams"."id" AS "teams_id" 
    FROM "user"
    JOIN "photos" ON "photos"."user_id" = "user"."id"
    JOIN "challenges" ON "challenges"."id" = "photos"."challenges_id"
    JOIN "teams" ON "user"."teams_id" = "teams"."id"
    WHERE "teams"."id" = $1
    GROUP BY "photos"."id", "photos"."file_url", "challenges"."name", "challenges"."description", "user"."first_name","user"."last_name", "user"."image_path", "teams"."id"
    ORDER BY "photos"."approved" = 'TRUE' , "photos"."date" DESC;`;
  pool.query(queryString, [teamId])
  .then(response => {
    console.log('TEAM PHOTOS', response.rows);
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

// get route gets photos for user levels that only shows approved photos
router.get('/user/photos/:id', rejectUnauthenticated, (req, res) => {
  let teamId = req.params.id;
  const queryString = `
    SELECT "photos"."id", 
    "photos"."file_url", 
    "photos"."approved", 
    "photos"."date", 
    "photos"."user_id" AS "photo_user_id", 
    "challenges"."name", "challenges"."description", 
    CONCAT("user"."first_name", ' ', "user"."last_name") AS "username",
    "user"."image_path", 
    "teams"."id" AS "teams_id" 
    FROM "user"
    JOIN "photos" ON "photos"."user_id" = "user"."id"
    JOIN "challenges" ON "challenges"."id" = "photos"."challenges_id"
    JOIN "teams" ON "user"."teams_id" = "teams"."id"
    WHERE "teams"."id" = $1 AND "photos"."approved" = 'TRUE'
    GROUP BY "photos"."id", "photos"."file_url", "challenges"."name", "challenges"."description", "user"."image_path", "user"."first_name", "user"."last_name", "teams"."id"
    ORDER BY "photos"."approved" = 'TRUE', "photos"."date" DESC;`;
  pool.query(queryString, [teamId])
  .then(response => {
    console.log('TEAM PHOTOS', response.rows);
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});


module.exports = router;