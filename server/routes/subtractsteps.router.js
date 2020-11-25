const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// post route communicates with subtractStepsSaga
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryString = `
    INSERT INTO "steps" ("user_id", "date", "steps")
    VALUES ($1, $2, $3);`;
  pool.query(queryString, [req.body.photo_user_id, req.body.date, (-1000)])
  .then(response => {    
    res.send(response.rows);
  })
  .catch(error => {
    console.log('we have an error in subtractsteps.router.js', error);
    res.status(500);
  });
});

module.exports = router;