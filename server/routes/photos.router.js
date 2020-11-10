const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
// selects all photos by team
SELECT "photos"."image_path" FROM "user"
JOIN "teams"
ON "user"."teams_id" = "teams"."id"
JOIN "photos"
ON "user"."id" = "photos"."user_id"
WHERE "teams"."id" = 1;

// selects all photos by team
// provides date, first and last name, and image path
SELECT "photos"."image_path", "photos"."date", "user"."first_name", "user"."last_name" FROM "user"
JOIN "teams"
ON "user"."teams_id" = "teams"."id"
JOIN "photos"
ON "user"."id" = "photos"."user_id"
WHERE "teams"."id" = 1;

*/

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('photos router get');
  const queryString = `
  SELECT * FROM "photos"
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
  console.log('photos router post');
});

module.exports = router;