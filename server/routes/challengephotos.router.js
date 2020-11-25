const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// get route communicates with fetchChallengePhotosSaga
router.get('/', rejectUnauthenticated, (req, res) => {    
  const queryString = `
    SELECT "photos"."id", 
    "photos"."file_url" AS "photos_file_url", 
    "challenges"."name" AS "challenge_name", 
    "challenges"."description" AS "challenge_description", 
    CONCAT("user"."first_name", ' ', "user"."last_name") AS "username", 
    "user"."image_path" AS "user_image_path", 
    "teams"."name" AS "team_name", 
    "teams"."company_name" 
    FROM "user"
    JOIN "photos" ON "photos"."user_id" = "user"."id"
    JOIN "challenges" ON "challenges"."id" = "photos"."challenges_id"
    JOIN "teams" ON "teams"."id" = "user"."teams_id"
    WHERE "user"."contests_id" = $1 AND "photos"."approved" = 'TRUE'
<<<<<<< HEAD
    ORDER BY "photos"."id" DESC;`;
=======
    ORDER BY "photos"."date" DESC;
    `;
>>>>>>> 18e57da7218d77aa70621f7c13de87581e054e57
  pool.query(queryString, [req.user.contests_id])
  .then(response => {  
    res.send(response.rows);
  })
  .catch(error => {
    console.log('we have an error in challengephotos.router.js GET', error);
    res.status(500);
  });
});

  module.exports = router;