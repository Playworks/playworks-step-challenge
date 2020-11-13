const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
// gets users in order of steps taken
// by using the provided team :id int
// provided my teamDetailsSaga
router.get('/:id', (req, res) => {
    console.log('in router.get api/teams/teamDetails');
    console.log('req.user.id', req.params.id);
    let teamId = req.params.id;
    console.log('team id', teamId);
    const queryText = `
    SELECT SUM("steps"."steps"), "user"."username", "user"."id", "teams"."name" FROM "user"
    JOIN "steps"
    ON "user"."id" = "steps"."user_id"
    JOIN "teams"
    ON "user"."teams_id" = "teams"."id"
    WHERE "user"."teams_id" = $1
    GROUP BY "user"."username", "user"."id", "teams"."name"
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

  // does the exact same as the challengephotos router GET
  // but it goes a level deeper by selecting by team :id int
  router.get('/photos/:id', (req, res) => {
    let teamId = req.params.id;
    
    const queryString = `
    SELECT "photos".id, "photos".file_url, challenges.name, challenges.description, "user".username, "user".image_path, "teams"."id" FROM "user"
    JOIN "photos" ON "photos"."user_id" = "user"."id"
    JOIN "challenges" ON "challenges"."id" = "photos"."challenges_id"
    JOIN "teams" ON "user"."teams_id" = "teams"."id"
    WHERE "teams"."id" = $1
    GROUP BY "photos".id, "photos"."file_url", challenges.name, challenges.description, "user".username, "user".image_path, "teams"."id"
    ORDER BY "photos".id DESC;
    `;
    pool.query(queryString, [teamId])
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
});

module.exports = router;