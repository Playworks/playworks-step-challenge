const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    
    const queryString = `
    SELECT *
    FROM "faq"
    ORDER BY "id" DESC
    LIMIT 1
    `
    pool.query(queryString)
    .then(response => {    
      res.send(response.rows);
    })
    .catch(error => {
      res.status(500);
    })
  });

router.post('/', rejectUnauthenticated, (req, res) => { 
    const queryString = `
    INSERT INTO "faq" ("file_url")
    VALUES ($1);
    `;
    pool.query(queryString, [req.body.fileUrl])
    .then((results) => {
        res.sendStatus(201);
    })
    .catch(err => {
        console.error(`POST /faq failed`, err);
        res.sendStatus(500);
    });
});

module.exports = router;