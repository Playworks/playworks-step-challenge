const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();


router.get('/', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

module.exports = router;