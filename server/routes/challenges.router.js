const { response } = require('express');
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
      res.sendStatus(500);
  })
});

router.put('/name', (req, res) => {
  console.log('req put challenges id', req.body.id);
  console.log('req put challenges name', req.body.name);
  let idToUpdate = req.body.id;
  let newName = req.body.name;
  const queryString = `
    UPDATE "challenges"
    SET "name" = $1
    WHERE "id" = $2;
  `;
  pool.query(queryString, [newName, idToUpdate])
  .then(response => {
    console.log('Change challenge description', response);
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('error challenge put', error);
    res.sendStatus(500);
  })
})

router.put('/description', (req, res) => {
  console.log('req put challenges id', req.body.id);
  console.log('req put challenges description', req.body.description);
  let idToUpdate = req.body.id;
  let newDescription = req.body.description;
  const queryString = `
    UPDATE "challenges"
    SET "description" = $1
    WHERE "id" = $2;
  `;
  pool.query(queryString, [newDescription, idToUpdate])
  .then(response => {
    console.log('Change challenge description', response);
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('error challenge put', error);
    res.sendStatus(500);
  })
})

module.exports = router;