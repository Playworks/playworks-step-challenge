const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();


/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

router.post('/', rejectUnauthenticated, (req, res) => {
  
  const queryString = `
  INSERT INTO "photos" ("user_id", "challenges_id", "date", "file_url")
  VALUES ($1, $2, $3, $4);
`;
pool.query(queryString, [req.user.id, req.body.challenges_id.id, req.body.date, req.body.fileUrl])
  .then((results) => {
      res.sendStatus(201);
  })
  .catch(err => {
      console.error(`POST /photos failed`, err);
      res.sendStatus(500);
  });
});

module.exports = router;