const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// DELETE route for removing a photo
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = 'DELETE FROM "photos" WHERE "id" = $1;'
  pool.query(queryString, [req.params.id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('we have an error in photos.router.js DELETE', error);
    res.sendStatus(500);
  });
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
      res.status(400).send('You may only do one per day');
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
    
    // Complete the transaction
    await connection.query('COMMIT');
  
    res.sendStatus(201);
  }
  catch (error) {
    // Cancel the transaction, if it fails.
    await connection.query('ROLLBACK');

    console.log('we have an error in photos.router.js POST', error);
    res.statusCode(500);
  }
  finally {
    // release the connection NO MATTER WHAT
    connection.release();
  }
});

// PUT route for approving photo
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = 'UPDATE "photos" SET "approved" = ($1) WHERE "id" = $2;';
  pool.query(queryString, ['TRUE', req.params.id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('we have an error in photo.router.js PUT', error);
    res.sendStatus(500);
  });
});

module.exports = router;