const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('steps router get');
  const queryString = `
  SELECT * FROM "steps"
  `
  pool.query(queryString)
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

router.get('/teamleaderboard', (req, res) => {
  // GET route code here
  console.log('steps router get');
  const queryString = `
  SELECT SUM("steps"."steps"), "teams"."name" FROM "user"
  JOIN "teams"
  ON "user"."teams_id" = "teams"."id"
  JOIN "steps"
  ON "user"."id" = "steps"."user_id"
  GROUP BY "teams"."name"
  ORDER BY "sum" DESC;
  `
  pool.query(queryString)
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

router.get('/topsteppers', (req, res) => {
  // GET route code here
  console.log('steps router get');
  const queryString = `
  SELECT SUM("steps"."steps"), "user"."username", "teams"."name" FROM "user"
  JOIN "steps"
  ON "user"."id" = "steps"."user_id"
  JOIN "teams"
  ON "user"."teams_id" = "teams"."id"
  GROUP BY "user"."username", "teams"."name"
  ORDER BY "sum" DESC
  LIMIT 20;
  `
  pool.query(queryString)
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('steps router post');
});

module.exports = router;