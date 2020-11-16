const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/:id', (req, res) => {
  // GET route code here
  console.log('req', req.params.id);
  let contestToGet = req.params.id;
  
  // query gets team captain's full name, team name and company name
  let queryText = `
  SELECT "user"."first_name", "user"."last_name", "teams"."name", "teams"."company_name" FROM "user"
  JOIN "contests"
  ON "user"."contests_id" = "contests"."id"
  JOIN "teams"
  ON "user"."teams_id" = "teams"."id"
  WHERE "user"."contests_id" = $1
  AND "user"."admin" = 'CAPTAIN';
  `;
  pool.query(queryText, [contestToGet])
  .then(response => {
      console.log('resp', response.rows);
      res.send(response.rows)
  })
  .catch((error) => {
      console.log('error contest details get', error);
      res.sendStatus(500);
  })
  
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;