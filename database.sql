
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- OLD SQL QUERY
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

-- TABLE NAME playworks_step_challenge
CREATE TYPE admin_level AS ENUM (
  'USER', 
  'CAPTAIN', 
  'ADMIN');
  
CREATE TABLE "contests" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL
);


CREATE TABLE "teams" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "team_logo" TEXT,
    "contests_id" INT REFERENCES "contests"
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) NOT NULL,
    "email" VARCHAR (30) UNIQUE NOT NULL,
    "first_name" VARCHAR (20) NOT NULL,
    "last_name" VARCHAR (30) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "image_path" TEXT,
    "admin" admin_level,
    "teams_id" INT REFERENCES "teams",
    "contests_id" INT REFERENCES "contests"
);

CREATE TABLE "challenges" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "description" VARCHAR (200) NOT NULL,
    "date" DATE
);

CREATE TABLE "steps" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "date" DATE NOT NULL,
    "steps" INT NOT NULL
);

CREATE TABLE "photos" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "challenges_id" INT REFERENCES "challenges",
    "date" TIMESTAMP NOT NULL,
    "image_path" TEXT
);

-- Only enter below to drop tables in the correct order
DROP TABLE "photos";
DROP TABLE "steps";
DROP TABLE "user";
DROP TABLE "challenges";
DROP TABLE "teams";
DROP TABLE "contests";