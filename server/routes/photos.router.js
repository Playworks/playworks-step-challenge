const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

  // DELETE route for removing a photo
  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('Delete photo with url of', req.params.id);
    const queryString = 'DELETE FROM "photos" WHERE "id" = $1;'
    pool.query(queryString, [req.params.id])
        .then(response => {
            console.log("Deleted!");
            res.sendStatus(200);
        })
        .catch(err => {
            console.log("Error in DELETE", err);
            res.sendStatus(500);
        })
  });

  // PUT route for approving photo
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('EDITING photo with id of', req.params.id);
  const queryString = 'UPDATE "photos" SET "approved" = ($1) WHERE "id" = $2;'
  pool.query(queryString, ['TRUE', req.params.id])
      .then(response => {
          console.log("Updated!");
          res.sendStatus(200);
      })
      .catch(err => {
          console.log("Error in PUT", err);
          res.sendStatus(500);
      })
});

// post route communicates with createPhotosSaga
router.post('/', rejectUnauthenticated, async (req, res) => {
  let connection;
  try {
    connection = await pool.connect();

    // Begin the transaction
    await connection.query('BEGIN');

      // Check if user has uploaded a photo yet today
      let todaysPhotos = await connection.query(`
      SELECT FROM "photos"
      WHERE "user_id" = $1
      AND "date" > $2 AND "date" < $3
    `, [req.user.id, req.body.start_of_today, req.body.end_of_today]);
    console.log('TodaysPhotos', todaysPhotos.rows);
    
    if (todaysPhotos.rows.length > 0) {
      res.send(400);
      res.status(400);
      await connection.query('ROLLBACK');
      return;
    };

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