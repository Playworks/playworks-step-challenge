-- DATABASE NAME playworks_step_challenge
CREATE TYPE admin_level AS ENUM 
('USER', 'CAPTAIN', 'ADMIN');
  
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
    "company_name" VARCHAR (120)
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
    "contests_id" INT REFERENCES "contests" ON DELETE CASCADE,
    "teams_id" INT REFERENCES "teams"
);

CREATE TABLE "challenges" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "description" VARCHAR (200) NOT NULL,
    "date" DATE
);

CREATE TABLE "steps" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "date" DATE NOT NULL,
    "steps" INT NOT NULL
);

CREATE TABLE "photos" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "challenges_id" INT REFERENCES "challenges",
    "date" TIMESTAMP NOT NULL,
    "file_url" TEXT,
    "approved" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "rules" (
    "id" SERIAL PRIMARY KEY,
    "file_url" TEXT
);

CREATE TABLE "faq" (
    "id" SERIAL PRIMARY KEY,
    "file_url" TEXT
); 

INSERT INTO "contests" ("name", "start_date", "end_date")
VALUES
('Prime', '2020-11-20', '2020-11-27'),
('Tarjan', '2020-12-01', '2020-12-07'),
('Best Buy', '2020-11-21', '2020-11-28');

--
INSERT INTO "teams" ("name", "team_logo", "company_name")
VALUES 
('Team David', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/0cbf17aa-f6d8-4e45-aaea-55554c862a3f_ScreenShot2020-11-17at1.55.40PM.png', 'Prime Digital'),
('A-Team', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital');

--
INSERT INTO "user" ("username", "email", "first_name", "last_name", "password", "image_path", "admin", "contests_id", "teams_id")
VALUES
('davidgould', 'davidgould@gmail.com', 'David', 'Gould', '$2a$10$3gqpioSzewoKOvSJhKh86O6am4X.H/T0isyOzU8/l6yTG7iZcHLAK', 'http://playworks-step-challenge.s3.amazonaws.com/48370ad3-7e80-4ddf-8b11-02a4fe7cd2bf_carjake.png', 'CAPTAIN', 1, 1),
('ashleyberry', 'ashleyberry@gmail.com', 'Ashley', 'Berry', '$2a$10$0ayUwmcgsm.u/Lvktqg7POIu2R1Lp7mX2eKxgAPQdrzsjU3b928nq', 'http://playworks-step-challenge.s3.amazonaws.com/0f32d253-3ef1-4235-8f6d-16a6b873f130_AshleyBerry.jpeg', 'USER', 1, 1),
('arthurcarson', 'arthurcarson@gmail.com', 'Arthur', 'Carson', '$2a$10$5tHU.Tcyv/PMJIVtmOPxWO3kuw6mPShIHR.iOQOuT2iq4T8LgJiY2', 'http://playworks-step-challenge.s3.amazonaws.com/8effa722-7b82-41ae-b2b5-3575fa0a5f98_ArthurCarson.jpeg', 'CAPTAIN', 1, 2),
('bradytrudeau', 'bradytrudeau@gmail.com', 'Brady', 'Trudeau', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/492cfd0d-2803-4f5c-afa0-498319bee09d_BradyTrudeau.jpeg', 'USER', 1, 2);

INSERT INTO "user" ("username", "email", "first_name", "last_name", "password", "image_path", "admin")
VALUES ('playworksadmin', 'playworks@playworks.org', 'Playworks', 'Admin', '$2a$10$wBC6FTIpF7Os2dB/LbIVAel1QRuAyt2xIN5jUEy6O3pXxyP1XCQoK', 'http://playworks-step-challenge.s3.amazonaws.com/43b6de1f-7daa-4b34-90f2-a821b2d47eae_playworkslogo.png', 'ADMIN');

INSERT INTO "challenges" ("name", "description", "date")
VALUES 
('Nature Walk Selfie', 'In honor of national Nature Photography Day take a selfie out in nature!', '2020-11-17'),
('Fuzzy Wuzzy Selfie', 'Take a photo of yourself with your fuzzy friend', '2020-11-18'),
('Water Selfie', 'Take a photo of yourself drinking some water', '2020-11-19');

INSERT INTO "steps" ("user_id", "date", "steps")
VALUES 
(1, '2020-11-17', 5000),
(2, '2020-11-17', 4000),
(3, '2020-11-17', 4500),
(4, '2020-11-17', 5600),
(1, '2020-11-18', 3000),
(2, '2020-11-18', 3000),
(3, '2020-11-18', 3500),
(4, '2020-11-18', 3600),
(1, '2020-11-19', 2000),
(2, '2020-11-19', 2000),
(3, '2020-11-19', 2500),
(4, '2020-11-19', 2600);


-- Only enter below to drop tables in the correct order
DROP TABLE "photos";
DROP TABLE "steps";
DROP TABLE "user";
DROP TABLE "challenges";
DROP TABLE "teams";
DROP TABLE "contests";
DROP TABLE "faq";
DROP TABLE "rules";