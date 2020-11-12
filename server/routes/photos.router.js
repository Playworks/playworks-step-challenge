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

router.post('/', rejectUnauthenticated, async (req, res) => {
  
//   const queryString = `
//   INSERT INTO "photos" ("user_id", "challenges_id", "date", "file_url")
//   VALUES ($1, $2, $3, $4);
// `;
// pool.query(queryString, [req.user.id, req.body.challenges_id.id, req.body.date, req.body.fileUrl])
//   .then((results) => {
//       res.sendStatus(201);
//   })
//   .catch(err => {
//       console.error(`POST /photos failed`, err);
//       res.sendStatus(500);
//   });

  let connection;
  try {
    connection = await pool.connect();

    // Begin the transaction
    await connection.query('BEGIN');

    // Add photo information to photos table
    await connection.query(`
      INSERT INTO "photos" ("user_id", "challenges_id", "date", "file_url")
      VALUES ($1, $2, $3, $4);
    `, [req.user.id, req.body.challenges_id.id, req.body.date, req.body.fileUrl]);

    // Add 1000 steps to steps table and tie them to user
    await connection.query(`
      INSERT INTO "steps" ("user_id", "date", "steps")
      VALUES ($1, $2, $3)
    `, [req.user.id, req.body.date, 1000]);

    console.log('this is working');
    
    // Complete the transaction
    await connection.query('COMMIT');

    res.sendStatus(201);
  }
  catch (err) {
    // Cancel the transaction, if it fails.
    await connection.query('ROLLBACK');

    console.log(err);
    res.statusCode(500);
  }
  finally {
    // release the connection NO MATTER WHAT
    connection.release();
  }
});


module.exports = router;