const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');
const router = express.Router();
const Papa = require('PapaParse');


router.post('/', (req, res) => {
  const contests_id = req.body.contests_id;
  const contests_name = req.body.contests_name;
  console.log('this is contests_id', contests_id)
  const queryText = `
    SELECT "user"."first_name" AS "First Name", "user"."last_name" AS "Last Name", "user"."email" AS "Email", "teams"."company_name" AS "Company Name" FROM "user"
    JOIN "teams"
    ON "user"."teams_id" = "teams"."id"
    WHERE "user"."contests_id" = $1;`;
  pool.query(queryText, [contests_id])
  .then(result => {
    console.log('this is result.rows', result.rows);
    let dataToExport = [];
    for(data of result.rows){
      dataToExport.push(data)
    }
    let csv = Papa.unparse(dataToExport)
    console.log('this is dataToExport', csv);
    res.send(csv);
  })
  .catch(error => {
    console.log('We have an error in /api/admin POST', error);
    res.sendStatus(500);
  });
});

module.exports = router;