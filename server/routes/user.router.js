const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log(req.body);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const image = req.body.photo;
  const contests_id = req.body.contests_id;


  // Hard coding in image path as have not uploaded image file to aws yet.
  const queryText = `INSERT INTO "user" (first_name, last_name, email, username, password, image_path, contests_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
  pool
    .query(queryText, [first_name, last_name, email, username, password, image, contests_id])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log(error);
      res.sendStatus(501);
    })
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.delete('/delete', async(req, res) => {
  console.log('req delete', req.body.id);
  let connection;
  try{
    connection = await pool.connect();
    // Begin transaction
    await connection.query('BEGIN');
    await connection.query(`
      DELETE FROM "photos"
      WHERE "user_id" = $1;
    `, [req.body.id]);
    await connection.query(`
      DELETE FROM "steps"
      WHERE "user_id" = $1;
    `, [req.body.id]);
    await connection.query(`
      DELETE FROM "user"
      WHERE "id" = $1;
  `, [req.body.id]);
    await connection.query('COMMIT');

    res.sendStatus(201);
  }
  catch(err) {
    await connection.query('ROLLBACK');
    console.log('err', err);
    res.sendStatus(500);
  }
  finally {
    // release connection no matter what
    connection.release();
  }
})

module.exports = router;
