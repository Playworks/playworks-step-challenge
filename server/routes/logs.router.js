const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // GET route code here
  console.log('user id to get', req.params.id);
  let userLogToGet = req.params.id;
  console.log('user log to get', userLogToGet);
  let queryString = `
    SELECT "user"."username", "steps"."date", "steps"."steps", "steps"."id" FROM "steps"
    JOIN "user"
    ON "steps"."user_id" = "user"."id"
    WHERE "user"."id" = $1;
  `;
  pool.query(queryString, [userLogToGet])
  .then(response => {
    console.log('response', response.rows);
    res.send(response.rows)
  })
  .catch(error => {
    res.send('error logs get', error)
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