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
  // query gets team captain's full name and team name
  let queryText = `
    SELECT * FROM "user"
    JOIN "contests"
    ON "user"."contests_id" = "contests"."id"
    JOIN "teams"
    ON "user"."teams_id" = "teams"."id"
    JOIN "photos"
    ON "photos"."user_id" = "user"."id"
    WHERE "user"."contests_id" = 1;
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