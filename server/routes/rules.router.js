const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// get route communicates with fetchRulesSaga
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `
    SELECT *
    FROM "rules"
    ORDER BY "id" DESC
    LIMIT 1;`;
  pool.query(queryString)
  .then(response => {    
    res.send(response.rows);
  })
  .catch(error => {
    console.log('we have an error in rules.router.js GET', error)
    res.status(500);
  });
});

// post route communicates with createRulesSaga
router.post('/', rejectUnauthenticated, (req, res) => { 
  const queryString = `INSERT INTO "rules" ("file_url") VALUES ($1);`;
  pool.query(queryString, [req.body.fileUrl])
  .then(() => {
    res.sendStatus(201);
  })
  .catch(error => {
    console.error(`we have an error in rules.router.js POST`, error);
    res.sendStatus(500);
  });
});

module.exports = router;