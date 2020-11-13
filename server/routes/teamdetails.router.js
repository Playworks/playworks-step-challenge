const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('in router.get api/teams/teamDetails');
    console.log('req.user.id', req.params.id);
    let teamId = req.params.id;
    console.log('team id', teamId);
    const queryText = `
      SELECT SUM("steps"."steps"), "user"."username", "user"."id" FROM "user"
      JOIN "steps"
      ON "user"."id" = "steps"."user_id"
      WHERE "user"."teams_id" = $1
      GROUP BY "user"."username", "user"."id"
      ORDER BY "sum" DESC;
    `;
    pool.query(queryText, [teamId])
    .then(result => {
      console.log('result', result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.log('We have an error in GET /searchforcaptains', error);
      res.sendStatus(501);
    });
  })

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;