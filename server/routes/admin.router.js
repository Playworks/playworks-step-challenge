const express = require('express');
const Papa = require('papaparse');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// route sends back data in a csv format
router.post('/', rejectUnauthenticated, (req, res) => {
  const contests_id = req.body.contests_id;
  const queryText = `
    SELECT 
    "user"."first_name" AS "First Name", 
    "user"."last_name" AS "Last Name", 
    "user"."email" AS "Email", 
    "teams"."company_name" AS "Company Name", 
    "contests"."name" AS "Contest Name" 
    FROM "user"
    JOIN "teams"
    ON "user"."teams_id" = "teams"."id"
    JOIN "contests"
    ON "user"."contests_id" = "contests"."id"
    WHERE "user"."contests_id" = $1;`;
  pool.query(queryText, [contests_id])
  .then(result => {
    let csv = Papa.unparse(result.rows);
    res.send(csv);
  })
  .catch(error => {
    console.log('We have an error in /api/admin POST', error);
    res.sendStatus(500);
  });
});

module.exports = router;