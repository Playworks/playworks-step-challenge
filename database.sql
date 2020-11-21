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
-- Contests
INSERT INTO "contests" ("name", "start_date", "end_date")
VALUES
('Tarjan vs The Universe', '2020-11-22', '2020-11-27'),
('Step Count 2: The Streets', '2020-11-22', '2020-11-27'),
('Stepless In Seattle', '2020-11-22', '2020-11-27'),
('Stepmanji', '2020-11-22', '2020-11-27');
-- Teams
INSERT INTO "teams" ("name", "team_logo", "company_name")
VALUES 
('Play Works', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/0cbf17aa-f6d8-4e45-aaea-55554c862a3f_ScreenShot2020-11-17at1.55.40PM.png', 'Tarjaneers'),
('Draw', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Tarjaneers'),
('Black Ignite', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Tarjaneers'),
('MinneAnalytics', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Tarjaneers'),
('Lake Elmo Aero', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Tarjaneers'),
('Dupont', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Dupontinites'),
('Dontpont', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Dupontinites'),
('Du be du be Dupont', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Dupontinites'),
('The Ukkonenest Of All', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Ukkonians'),
('Dont stop Ukkonen', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Ukkonians'),
('U Ukkonen U U Ukkonen', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Ukkonians'),
('The Staff Of Power', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Staff'),
-- passwords for all users including admin is 123
INSERT INTO "user" ("username", "email", "first_name", "last_name", "password", "image_path", "admin", "contests_id", "teams_id")
VALUES
('davidgould', 'davidgould@gmail.com', 'David', 'Gould', '$2a$10$3gqpioSzewoKOvSJhKh86O6am4X.H/T0isyOzU8/l6yTG7iZcHLAK', 'http://playworks-step-challenge.s3.amazonaws.com/48370ad3-7e80-4ddf-8b11-02a4fe7cd2bf_carjake.png', 'USER', 1, 1),
('ashleyberry', 'ashleyberry@gmail.com', 'Ashley', 'Berry', '$2a$10$0ayUwmcgsm.u/Lvktqg7POIu2R1Lp7mX2eKxgAPQdrzsjU3b928nq', 'http://playworks-step-challenge.s3.amazonaws.com/0f32d253-3ef1-4235-8f6d-16a6b873f130_AshleyBerry.jpeg', 'USER', 1, 1),
('arthurcarson', 'arthurcarson@gmail.com', 'Arthur', 'Carson', '$2a$10$5tHU.Tcyv/PMJIVtmOPxWO3kuw6mPShIHR.iOQOuT2iq4T8LgJiY2', 'http://playworks-step-challenge.s3.amazonaws.com/8effa722-7b82-41ae-b2b5-3575fa0a5f98_ArthurCarson.jpeg', 'USER', 1, 1),
('bradytrudeau', 'bradytrudeau@gmail.com', 'Brady', 'Trudeau', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/492cfd0d-2803-4f5c-afa0-498319bee09d_BradyTrudeau.jpeg', 'CAPTAIN', 1, 1),
('emmawestbrook', 'emma@gmail.com', 'Emma', 'Westbrook', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/340b2edc-a81c-4302-9454-806074620cc9_emmaw.jpg', 'CAPTAIN', 1, 2),
('jakestucky', 'jake@gmail.com', 'Jake', 'Stucky', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/a06b6a79-61c6-4411-a078-4875a35aec17_jakes.jpeg', 'USER', 1, 2),
('mikesiddall', 'mike@gmail.com', 'Mike', 'Siddall', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/39445a90-fa7b-4af6-89df-ca1884c667b7_mikes.jpg', 'USER', 1, 2),
('sophiea', 'sophie@gmail.com', 'Sophie', 'A', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 2),
('cooperdoten', 'cooper@gmail.com', 'Cooper', 'Doten', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/ba2fd133-76a9-4433-b708-00400d9f3daf_cooperd.jpg', 'CAPTAIN', 1, 3),
('ethankananagh', 'ethan@gmail.com', 'Ethan', 'Kavanagh', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/902e1b73-85d7-466a-9522-5d5721495c13_ethank.jpg', 'USER', 1, 3),
('gadawaka', 'gada@gmail.com', 'Gada', 'Waka', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/eb9a0fda-09f5-4faf-a9c2-a5c42c7855de_gadaw.jpeg', 'USER', 1, 3),
('kieranstomberg', 'kieran@gmail.com', 'Kieran', 'Stomberg', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 3),
('gabrielvargas', 'gabriel@gmail.com', 'Gabriel', 'Vargas', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/ec69d6b1-d7f4-4dac-b45f-78d99243d2c5_gabrielv.png', 'CAPTAIN', 1, 4),
('jimtalarski', 'jim@gmail.com', 'Jim', 'Talarski', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/3fcc9ab9-0465-409e-8b6d-8edd8cb07389_jimt.jpg', 'USER', 1, 4),
('johnhinderer', 'johnh@gmail.com', 'John', 'Hinderer', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/ba2aa31f-ba48-4dcc-b66d-95ac10bfce84_johnh.jpg', 'USER', 1, 4),
('johnriviera', 'johnr@gmail.com', 'John', 'Riviera', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/b820df2b-fb0f-4049-8f97-e16867d60ada_johnr.jpg', 'USER', 1, 4),
('derekwilliamson', 'derek@gmail.com', 'Derek', 'Williamson', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/b64cf416-68ff-4fbb-95c6-3b8560aaf2c9_derekw.jpg', 'CAPTAIN', 1, 5),
('justuswitmer', 'justus@gmail.com', 'Justus', 'Witmer', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/31d63141-7dec-4083-a73e-7db4c4748266_justusw.jpg', 'USER', 1, 5),
('leahbrenny', 'leah@gmail.com', 'Leah', 'Brenny', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/58d2809c-a64f-457b-b874-b606cc13bcf5_leahb.jpeg', 'USER', 1, 5),
('tylerjorenby', 'tyler@gmail.com', 'Tyler', 'Jorenby', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/da3e59c4-c23b-46eb-b794-c17edead8157_tylerj.jpg', 'USER', 1, 5),
('hannahmcdonald', 'hannah@gmail.com', 'Hannah', 'McDonald', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/492cfd0d-2803-4f5c-afa0-498319bee09d_BradyTrudeau.jpeg', 'CAPTAIN', 1, 6),
('chaelakimbeck', 'chaela@gmail.com', 'Chaela', 'Kim-Beck', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/492cfd0d-2803-4f5c-afa0-498319bee09d_BradyTrudeau.jpeg', 'USER', 1, 6),
('natemadsen', 'nate@gmail.com', 'Nate', 'Madsen', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/492cfd0d-2803-4f5c-afa0-498319bee09d_BradyTrudeau.jpeg', 'USER', 1, 6),
('aaronhiltz', 'aaron@gmail.com', 'Aaron', 'Hiltz', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/492cfd0d-2803-4f5c-afa0-498319bee09d_BradyTrudeau.jpeg', 'USER', 1, 6),
('manolasuvannarad', 'manola@gmail.com', 'Manola', 'Suvannarad', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 7),
('jeffpetrovitch', 'jeff@gmail.com', 'Jeff', 'Petrovitch', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 7),
('antonioperezcajina', 'antonio@gmail.com', 'Antonio', 'Perez-Cajina', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 7),
('carolinehubbell', 'caroline@gmail.com', 'Caroline', 'Hubbell', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 7),
('cindyelvendahl', 'cindy@gmail.com', 'Cindy', 'Elvendahl', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 8),
('gabylasala', 'gaby@gmail.com', 'Gaby', 'Lasala', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('katiecopan', 'katie@gmail.com', 'Katie', 'Copan', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('samileemoody', 'samilee@gmail.com', 'Samilee', 'Moody', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('adamboerhave', 'adamb@gmail.com', 'Adam', 'Boerhave', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 9),
('beauweise', 'beau@gmail.com', 'Beau', 'Weise', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 9),
('elliotmalcolm', 'elliotm@gmail.com', 'Elliot', 'Malcolm', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 9),
('emmasongfisher', 'samilee@gmail.com', 'Emma', 'Song Fisher', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 9),
('matthewharris', 'matth@gmail.com', 'Matthew', 'Harris', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 10),
('nicklawler', 'nicklaw@gmail.com', 'Nick', 'Lawler', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 10),
('stavkidron', 'stav@gmail.com', 'Stav', 'Kidron', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 10),
('thomasbrookshaw', 'thomasb@gmail.com', 'Thomas', 'Brookshaw', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 10),
('franzcordeseklund', 'franz@gmail.com', 'Franz', 'Cordes-Eklund', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 11),
('jamiewhite', 'beau@gmail.com', 'Jamie', 'White', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 11),
('kellydanger', 'kellyd@gmail.com', 'Kelly', 'Danger', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 11),
('leroydahl', 'leroy@gmail.com', 'Leroy', 'Dahl', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 11),
('edanschwartz', 'edan@gmail.com', 'Edan', 'Edan Schwartz', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 12),
('christylarsen', 'christy@gmail.com', 'Christy', 'Larsen', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 12),
('casiesiekman', 'casie@gmail.com', 'Casie', 'Siekman', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 12),
('devjana', 'dev@gmail.com', 'Dev', 'Jana', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 12),
('bethany', 'bethany@gmail.com', 'Bethany', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 12),
('emily', 'emilyprime@gmail.com', 'Emily', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 12),
('genia', 'genia@gmail.com', 'Genia', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 12),
('kris', 'kris@gmail.com', 'Kris', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 12),
('mark', 'mark@gmail.com', 'Mark', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 12);
-----------------------------------------------------------------------------------------
-- ADMIN
INSERT INTO "user" ("username", "email", "first_name", "last_name", "password", "image_path", "admin")
VALUES ('playworksadmin', 'playworks@playworks.org', 'Playworks', 'Admin', '$2a$10$wBC6FTIpF7Os2dB/LbIVAel1QRuAyt2xIN5jUEy6O3pXxyP1XCQoK', 'http://playworks-step-challenge.s3.amazonaws.com/43b6de1f-7daa-4b34-90f2-a821b2d47eae_playworkslogo.png', 'ADMIN');
-- Challenges
INSERT INTO "challenges" ("name", "description", "date")
VALUES 
('Winter Is Coming', 'Take a photo of yourself embracing the cold weather', '2020-11-22'),
('Vegetables?', 'Take a photo of yourself eating or preparing some veggies', '2020-11-21'),
('Vitamin Boost', 'Take a photo of yourself eating or preparing fresh fruit', '2020-11-20'),
('Swing Swing', 'Take a photo of yourself on a swing', '2020-11-23'),
('Water Selfie', 'Take a photo of yourself drinking some water', '2020-11-24');

INSERT INTO "steps" ("user_id", "date", "steps")
VALUES 
(1, '2020-11-23', 5444),
(2, '2020-11-23', 7866),
(3, '2020-11-23', 6211),
(4, '2020-11-23', 6599),
(5, '2020-11-23', 2144),
(6, '2020-11-23', 1532),
(7, '2020-11-23', 6422),
(8, '2020-11-23', 4322),
(9, '2020-11-23', 1222),
(10, '2020-11-23', 1539),
(11, '2020-11-23', 3213),
(12, '2020-11-23', 3211),
(13, '2020-11-23', 4333),
(14, '2020-11-23', 633),
(15, '2020-11-23', 2143),
(16, '2020-11-23', 4324),
(17, '2020-11-23', 1312),
(18, '2020-11-23', 4555),
(19, '2020-11-23', 2156),
(20, '2020-11-23', 5433),
(1, '2020-11-24', 8800),
(2, '2020-11-24', 54320),
(3, '2020-11-24', 6534),
(4, '2020-11-24', 5323),
(5, '2020-11-24', 4322),
(6, '2020-11-24', 4211),
(7, '2020-11-24', 1433),
(8, '2020-11-24', 2433),
(9, '2020-11-24', 4555),
(10, '2020-11-24', 3466),
(11, '2020-11-24', 3788),
(11, '2020-11-24', 3988),
(12, '2020-11-24', 3976),
(13, '2020-11-24', 6400),
(14, '2020-11-24', 3211),
(15, '2020-11-24', 3553),
(16, '2020-11-24', 5109),
(17, '2020-11-24', 5322),
(18, '2020-11-24', 4988),
(19, '2020-11-24', 4948),
(20, '2020-11-24', 4948),
(21, '2020-11-24', 3222),
(22, '2020-11-24', 3222),
(23, '2020-11-24', 3222),
(24, '2020-11-24', 3222),
(23, '2020-11-24', 3222),
(22, '2020-11-24', 3222),
(2, '2020-11-24', 3222),
(25, '2020-11-24', 3222),
(26, '2020-11-24', 3222),
(27, '2020-11-24', 3222),
(23, '2020-11-24', 3222),
(25, '2020-11-24', 3222),
(23, '2020-11-24', 3222),
(27, '2020-11-24', 3222),
(29, '2020-11-24', 3222),
(31, '2020-11-24', 3222),
(30, '2020-11-24', 3222),
(32, '2020-11-24', 3222),
(32, '2020-11-24', 3222),
(33, '2020-11-24', 3222),
(34, '2020-11-24', 3222),
(35, '2020-11-24', 3222),
(36, '2020-11-24', 3222),
(37, '2020-11-24', 3222),
(38, '2020-11-24', 3222),
(39, '2020-11-24', 3222),
(40, '2020-11-24', 3222),
(41, '2020-11-24', 3222),
(42, '2020-11-24', 3222),
(43, '2020-11-24', 3222),
(44, '2020-11-24', 3222),
(45, '2020-11-24', 3222),
(46, '2020-11-24', 3222),
(47, '2020-11-24', 3222),
(48, '2020-11-24', 3222),
(49, '2020-11-24', 3222),
(50, '2020-11-24', 3222),
(51, '2020-11-24', 3222),
(52, '2020-11-24', 3222),
(53, '2020-11-24', 3222),
(54, '2020-11-24', 3222),
(43, '2020-11-24', 3222),
(44, '2020-11-24', 3222),
(49, '2020-11-24', 3222),
(23, '2020-11-24', 3222),
(20, '2020-11-24', 3222),
(19, '2020-11-24', 3222),
(17, '2020-11-24', 3222),
(16, '2020-11-24', 3222),
(13, '2020-11-24', 3222),
(15, '2020-11-24', 3222);



-- Only enter below to drop tables in the correct order
DROP TABLE "photos";
DROP TABLE "steps";
DROP TABLE "user";
DROP TABLE "challenges";
DROP TABLE "teams";
DROP TABLE "contests";
DROP TABLE "faq";
DROP TABLE "rules";