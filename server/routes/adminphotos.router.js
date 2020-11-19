const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('req photos admin', req.params.id);
  let contestToFind = req.params.id;
  let queryText = `
    SELECT "user"."first_name", "user"."last_name", "photos"."file_url", "challenges"."name", "user"."image_path", "photos"."id", "teams"."company_name" FROM "user"
    JOIN "contests"
    ON "user"."contests_id" = "contests"."id"
    JOIN "teams"
    ON "user"."teams_id" = "teams"."id"
    JOIN "photos"
    ON "photos"."user_id" = "user"."id"
    JOIN "challenges"
    ON "challenges"."id" = "photos"."challenges_id"
    WHERE "user"."contests_id" = $1;
  `;
  pool.query(queryText, [contestToFind])
  .then(results => {
      console.log('res rows', results.rows);
      res.send(results.rows)
  })
  .catch(error => {
      res.sendStatus(500)
  })
});

module.exports = router;