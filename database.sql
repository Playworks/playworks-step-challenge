
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

CREATE TABLE "companies" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "contests_id" INT REFERENCES "contests"
);

CREATE TABLE "teams" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL,
    "team_logo" TEXT,
    "companies_id" INT REFERENCES "companies"
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" VARCHAR (30) NOT NULL,
    "first_name" VARCHAR (20) NOT NULL,
    "last_name" VARCHAR (30) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "image_path" TEXT,
    "admin" admin_level,
    "teams_id" INT REFERENCES "teams"
);

CREATE TABLE "challenges" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "description" VARCHAR (200) NOT NULL,
    "date" DATE
);

CREATE TABLE "contest_logs" (
    "id" SERIAL PRIMARY KEY,
    "teams_id" INT REFERENCES "teams",
    "user_id" INT REFERENCES "user",
    "challenges_id" INT REFERENCES "challenges",
    "contests_id" INT REFERENCES "contests",
    "companies_id" INT REFERENCES "companies",
    "date" DATE NOT NULL,
    "steps" INT NOT NULL,
    "image_path" TEXT
);