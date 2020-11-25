const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// communicates with fetchContestDetailsSaga, sends first, last name, company name and team name of captains
router.get('/:id', rejectUnauthenticated, (req, res) => {
  let contest_id = req.params.id;
  let queryText = `
    SELECT "user"."first_name", "user"."last_name", "teams"."name", "teams"."company_name" FROM "user"
    JOIN "contests"
    ON "user"."contests_id" = "contests"."id"
    JOIN "teams"
    ON "user"."teams_id" = "teams"."id"
    WHERE "user"."contests_id" = $1
    AND "user"."admin" = 'CAPTAIN';`;
  pool.query(queryText, [contest_id])
  .then(response => {
    res.send(response.rows);
  })
  .catch((error) => {
    console.log('error contest details get', error);
    res.sendStatus(500);
  });
});

module.exports = router;