const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// communicates with deleteLog() in EditsUserLogs.js
router.delete('/', rejectUnauthenticated, (req, res) => {
  let stepLogToDelete = req.body.id;
  let queryString = `DELETE FROM "steps" WHERE "id" = $1;`;
  pool.query(queryString, [stepLogToDelete])
  .then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('we have an error in logs.router.js DELETE', error);
    res.sendStatus(500);
  });
});

// Communicates with getUserLogs()
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('user id to get', req.params.id);
  let userLogToGet = req.params.id;
  console.log('user log to get', userLogToGet);
  let queryString = `
    SELECT "user"."username", "user"."first_name", "user"."last_name", "steps"."date", "steps"."steps", "steps"."id" FROM "steps"
    JOIN "user"
    ON "steps"."user_id" = "user"."id"
    WHERE "user"."id" = $1
    AND "steps"."steps" > 0
    ORDER BY "steps"."date" DESC;`;
  pool.query(queryString, [userLogToGet])
  .then(response => {
    res.send(response.rows)
  })
  .catch(error => {
    res.send('we have an error in logs.router.js GET', error)
    res.sendStatus(500);
  })
});

// communicates with saveStepsLogChanges() in EditUserLogs.js
router.put('/:id', rejectUnauthenticated, (req, res) => {
  let updatedSteps = req.body.steps;
  let stepIdToUpdate = req.params.id;
  let queryString =` UPDATE "steps" SET "steps" = $1 WHERE "id" = $2;`;
  pool.query(queryString, [updatedSteps, stepIdToUpdate])
  .then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('we have an error in logs.router.js PUT', error);
    res.sendStatus(500);
  });
});

module.exports = router;