const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('user id to get', req.params.id);
  let userLogToGet = req.params.id;
  console.log('user log to get', userLogToGet);
  let queryString = `
    SELECT "user"."username", "user"."first_name", "user"."last_name", "steps"."date", "steps"."steps", "steps"."id" FROM "steps"
    JOIN "user"
    ON "steps"."user_id" = "user"."id"
    WHERE "user"."id" = $1
    AND "steps"."steps" > 0
    ;
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

router.put('/', rejectUnauthenticated, (req, res) => {
  console.log('req body id', req.body.id);
  console.log('req body steps', req.body.steps);
  let updatedSteps = req.body.steps;
  let stepIdToUpdate = req.body.id;
  let queryString =`
    UPDATE "steps"
    SET "steps" = $1
    WHERE "id" = $2;
  `;
  pool.query(queryString, [updatedSteps, stepIdToUpdate])
  .then(response => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

router.delete('/', rejectUnauthenticated, (req, res) => {
  console.log('req', req.body.id);
  let stepLogToDelete = req.body.id;
  let queryString = `
    DELETE FROM "steps"
    WHERE "id" = $1;
  `;
  pool.query(queryString, [stepLogToDelete])
  .then(response => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

module.exports = router;