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
  SELECT SUM("steps"."steps"), "teams"."name", "teams"."id" FROM "user"
  JOIN "teams"
  ON "user"."teams_id" = "teams"."id"
  JOIN "steps"
  ON "user"."id" = "steps"."user_id"
  GROUP BY "teams"."name", "teams"."id"
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
  SELECT SUM("steps"."steps"), "user"."username", "teams"."name", "user"."image_path" FROM "user"
  JOIN "steps"
  ON "user"."id" = "steps"."user_id"
  JOIN "teams"
  ON "user"."teams_id" = "teams"."id"
  GROUP BY "user"."username", "teams"."name", "user"."image_path"
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
    
  const queryString = `
  INSERT INTO "steps" ("user_id", "date", "steps")
      VALUES ($1, $2, $3);
  `
  pool.query(queryString, [req.user.id, req.body.date, req.body.steps])
  .then(response => {    
    res.send(response.rows);
  })
  .catch(error => {
    res.status(500);
  })
});

module.exports = router;