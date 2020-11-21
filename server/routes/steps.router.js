const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// grabs leader board by team for user's contest
router.get('/teamleaderboard', rejectUnauthenticated, (req, res) => {
  const queryString = `
    SELECT SUM("steps"."steps"), "teams"."name", "teams"."id" FROM "user"
    JOIN "teams"
    ON "user"."teams_id" = "teams"."id"
    JOIN "steps"
    ON "user"."id" = "steps"."user_id"
    WHERE "user"."contests_id" = $1
    GROUP BY "teams"."name", "teams"."id"
    ORDER BY "sum" DESC;`;
  pool.query(queryString, [req.user.contests_id])
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    console.log('we have an error in steps.router.js /teamleaderboard GET', error);
    res.status(500);
  });
});

// grabs top steppers for user's contest limit of 20 results
router.get('/topsteppers', rejectUnauthenticated, (req, res) => {
  const queryString = `
    SELECT SUM("steps"."steps"), CONCAT("user"."first_name", ' ', "user"."last_name") AS "username", "teams"."name", "user"."image_path" FROM "user"
    JOIN "steps"
    ON "user"."id" = "steps"."user_id"
    JOIN "teams"
    ON "user"."teams_id" = "teams"."id"
    WHERE "user"."contests_id" = $1
    GROUP BY "user"."first_name", "user"."last_name", "teams"."name", "user"."image_path"
    ORDER BY "sum" DESC
    LIMIT 20;`;
  pool.query(queryString, [req.user.contests_id])
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    console.log('we have an error in steps.router.js /topsteppers GET', error);
    res.status(500);
  });
});

// post route communicates with createStepsSaga
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryString = `
    INSERT INTO "steps" ("user_id", "date", "steps") 
    VALUES ($1, $2, $3);`;
  pool.query(queryString, [req.user.id, req.body.date, req.body.steps])
  .then(response => {    
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

module.exports = router;