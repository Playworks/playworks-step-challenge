const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('challenges router get');
  const queryString = `
  SELECT * FROM "challenges"
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
  console.log('challenges router post', req.body);
  let name = req.body.name;
  let description = req.body.description;
  let date = req.body.date;
  const queryString = `
        INSERT INTO "challenges" ("name", "description", "date")
        VALUES ($1, $2, $3);
  `;
  pool.query(queryString, [name, description, date])
  .then(response => {
      console.log('Added challenge', response);
      res.send(response.rows)  
  })
  .catch(error => {
      console.log('error challenges router post', error);
      res.sendStatus(500)
  })
});

module.exports = router;