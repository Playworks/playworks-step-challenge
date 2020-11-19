const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// gets challenges ordered by date
router.get('/', (req, res) => {
  // GET route code here
  console.log('challenges router get');
  const queryString = `
  SELECT * FROM "challenges"
  ORDER BY "date" ASC;
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
      res.sendStatus(500);
  })
});

router.put('/', (req, res) => {
  console.log('req', req.body);
  let name = req.body.name;
  let description = req.body.description;
  let date = req.body.date;
  let id = req.body.id;
  let queryString = `
  UPDATE "challenges"
  SET
  "name" = $1,
  "description" = $2,
  "date" = $3
  WHERE "id" = $4;
  `;
  pool.query(queryString, [name, description, date, id])
  .then(response => {
    res.sendStatus(200)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})



module.exports = router;