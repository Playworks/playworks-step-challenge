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
('The A-Team', 'http://playworks-step-challenge.s3.amazonaws.com/b9f36faa-7591-45fa-9b18-8d62f2027fc1_ateam.jpg', 'Prime Digital Academy'),
('Draw', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital Academy'),
('Black Ignite', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital Academy'),
('MinneAnalytics', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital Academy'),
('Lake Elmo Aero', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital Academy'),
('Du be du be Dupont', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital Academy'),
('U Ukkonen U U Ukkonen', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital Academy'),
('The Staff Of Power', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital Academy'),
('Some Vatti That I Used To Know', 'https://playworks-step-challenge.s3.us-east-2.amazonaws.com/9c60e7ec-e699-460c-b189-d97cec860470_1200px-A-Team-Logo.svg.png', 'Prime Digital Academy');
-- passwords for all users including admin is 123
INSERT INTO "user" ("username", "email", "first_name", "last_name", "password", "image_path", "admin", "contests_id", "teams_id")
VALUES
('davidgould', 'davidgould@gmail.com', 'David', 'Gould', '$2a$10$3gqpioSzewoKOvSJhKh86O6am4X.H/T0isyOzU8/l6yTG7iZcHLAK', 'http://playworks-step-challenge.s3.amazonaws.com/89fb066f-3d26-43ed-b6c4-3fbd409fc60f_davidgould.jpeg', 'USER', 1, 1),
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
('hannahmcdonald', 'hannah@gmail.com', 'Hannah', 'McDonald', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 6),
('chaelakimbeck', 'chaela@gmail.com', 'Chaela', 'Kim-Beck', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 6),
('natemadsen', 'nate@gmail.com', 'Nate', 'Madsen', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 6),
('aaronhiltz', 'aaron@gmail.com', 'Aaron', 'Hiltz', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 6),
('manolasuvannarad', 'manola@gmail.com', 'Manola', 'Suvannarad', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 7),
('jeffpetrovitch', 'jeff@gmail.com', 'Jeff', 'Petrovitch', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 7),
('antonioperezcajina', 'antonio@gmail.com', 'Antonio', 'Perez-Cajina', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 7),
('carolinehubbell', 'caroline@gmail.com', 'Caroline', 'Hubbell', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 7),
('edanschwartz', 'edan@gmail.com', 'Edan', 'Schwartz', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 8),
('christylarsen', 'christy@gmail.com', 'Christy', 'Larsen', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/e285f4cc-8b84-412e-8381-e9337cbd09e5_christy.jpg', 'USER', 1, 8),
('casiesiekman', 'casie@gmail.com', 'Casie', 'Siekman', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('devjana', 'dev@gmail.com', 'Dev', 'Jana', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('bethany', 'bethany@gmail.com', 'Bethany', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('emily', 'emilyprime@gmail.com', 'Emily', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('genia', 'genia@gmail.com', 'Genia', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('kris', 'kris@gmail.com', 'Kris', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('mark', 'mark@gmail.com', 'Mark', 'Prime', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 8),
('adamboerhave', 'adamb@gmail.com', 'Adam', 'Boerhave', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'CAPTAIN', 1, 9),
('beauweise', 'beau@gmail.com', 'Beau', 'Weise', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 9),
('elliotmalcolm', 'elliotm@gmail.com', 'Elliot', 'Malcolm', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 9),
('emmasongfisher', 'emmasong@gmail.com', 'Emma', 'Song Fisher', '$2a$10$CPuQi17HbK/2HdXkeEFWmuBFemaMj5mpsT.VnFsHTgMIByzFnVZtW', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg', 'USER', 1, 9);
-----------------------------------------------------------------------------------------
-- ADMIN
INSERT INTO "user" ("username", "email", "first_name", "last_name", "password", "image_path", "admin")
VALUES ('playworksadmin', 'playworks@playworks.org', 'Playworks', 'Admin', '$2a$10$wBC6FTIpF7Os2dB/LbIVAel1QRuAyt2xIN5jUEy6O3pXxyP1XCQoK', 'http://playworks-step-challenge.s3.amazonaws.com/43b6de1f-7daa-4b34-90f2-a821b2d47eae_playworkslogo.png', 'ADMIN');
-- Challenges
INSERT INTO "challenges" ("name", "description", "date")
VALUES 
('It’s Not Winter Yet', 'Take a picture with a plant found on your walk that’s still hanging it there', '2020-11-19'),
('Vegetables?', 'Take a photo of yourself eating or preparing some veggies', '2020-11-22'),
('Vitamin Boost', 'Take a photo of yourself eating or preparing fresh fruit', '2020-11-20'),
('Wuzzy Fuzzy Friend', 'Take a photo of yourself with your pet', '2020-11-24'),
('Water Selfie', 'Take a photo of yourself drinking some water', '2020-11-21'),
('Selfie', 'Post a photo of yourself', '2020-11-23');

INSERT INTO "steps" ("user_id", "date", "steps")
VALUES
(1, '2020-11-22', 5322),
(2, '2020-11-22', 6533),
(3, '2020-11-22', 5234),
(4, '2020-11-22', 6111),
(5, '2020-11-22', 4322),
(6, '2020-11-22', 3135),
(7, '2020-11-22', 5332),
(8, '2020-11-22', 5324),
(9, '2020-11-22', 5278),
(10, '2020-11-22', 2422),
(11, '2020-11-22', 3211),
(12, '2020-11-22', 3732),
(13, '2020-11-22', 2955),
(14, '2020-11-22', 4234),
(15, '2020-11-22', 3245),
(16, '2020-11-22', 5333),
(17, '2020-11-22', 3222),
(18, '2020-11-22', 4555),
(19, '2020-11-22', 4322),
(20, '2020-11-22', 4551), 
(1, '2020-11-23', 5444),
(2, '2020-11-23', 5866),
(3, '2020-11-23', 4211),
(4, '2020-11-23', 6599),
(5, '2020-11-23', 2144),
(6, '2020-11-23', 1532),
(7, '2020-11-23', 6422),
(8, '2020-11-23', 5622),
(9, '2020-11-23', 5222),
(10, '2020-11-23', 1539),
(11, '2020-11-23', 3213),
(12, '2020-11-23', 3211),
(13, '2020-11-23', 4333),
(14, '2020-11-23', 633),
(15, '2020-11-23', 2143),
(16, '2020-11-23', 4324),
(17, '2020-11-23', 1312),
(18, '2020-11-23', 6555),
(19, '2020-11-23', 2156),
(20, '2020-11-23', 2433),
(1, '2020-11-24', 4800),
(2, '2020-11-24', 54320),
(3, '2020-11-24', 4534),
(4, '2020-11-24', 5323),
(5, '2020-11-24', 4322),
(6, '2020-11-24', 4211),
(7, '2020-11-24', 1433),
(8, '2020-11-24', 7433),
(9, '2020-11-24', 5555),
(10, '2020-11-24', 3466),
(11, '2020-11-24', 3788),
(12, '2020-11-24', 3976),
(13, '2020-11-24', 6400),
(14, '2020-11-24', 3211),
(15, '2020-11-24', 3553),
(16, '2020-11-24', 5109),
(17, '2020-11-24', 5322),
(18, '2020-11-24', 4988),
(19, '2020-11-24', 4948),
(20, '2020-11-24', 2948),
(21, '2020-11-24', 3222),
(22, '2020-11-24', 3222),
(23, '2020-11-24', 3222),
(24, '2020-11-24', 3222),
(23, '2020-11-24', 2222),
(22, '2020-11-24', 3222),
(2, '2020-11-24', 3222),
(25, '2020-11-24', 3222),
(26, '2020-11-24', 3222),
(27, '2020-11-24', 3222),
(23, '2020-11-24', 1222),
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
(23, '2020-11-24', 3222),
(20, '2020-11-24', 3222),
(19, '2020-11-24', 1222),
(17, '2020-11-24', 8222),
(16, '2020-11-24', 3222),
(13, '2020-11-24', 3222),
(15, '2020-11-24', 3222),
(1, '2020-11-22', 3322),
(2, '2020-11-22', 3533),
(3, '2020-11-22', 5234);

INSERT INTO "photos" ("user_id", "challenges_id", "date", "file_url")
VALUES 
(19, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/da3e59c4-c23b-46eb-b794-c17edead8157_tylerj.jpg'),
(18, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/58d2809c-a64f-457b-b874-b606cc13bcf5_leahb.jpeg'),
(17, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/31d63141-7dec-4083-a73e-7db4c4748266_justusw.jpg'),
(16, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/b64cf416-68ff-4fbb-95c6-3b8560aaf2c9_derekw.jpg'),
(15, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/b820df2b-fb0f-4049-8f97-e16867d60ada_johnr.jpg'),
(14, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/ba2aa31f-ba48-4dcc-b66d-95ac10bfce84_johnh.jpg'),
(13, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/3fcc9ab9-0465-409e-8b6d-8edd8cb07389_jimt.jpg'),
(12, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/ec69d6b1-d7f4-4dac-b45f-78d99243d2c5_gabrielv.png'),
(11, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/27dba948-c0ae-415d-8fb4-6f3714624746_nc2.jpg'),
(10, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/eb9a0fda-09f5-4faf-a9c2-a5c42c7855de_gadaw.jpeg'),
(9, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/902e1b73-85d7-466a-9522-5d5721495c13_ethank.jpg'),
(8, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/ba2fd133-76a9-4433-b708-00400d9f3daf_cooperd.jpg'),
(7, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/6bc21ba9-665e-4083-9c66-8a6e54c4ea01_prime.jpeg'),
(6, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/39445a90-fa7b-4af6-89df-ca1884c667b7_mikes.jpg'),
(5, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/a06b6a79-61c6-4411-a078-4875a35aec17_jakes.jpeg'),
(4, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/340b2edc-a81c-4302-9454-806074620cc9_emmaw.jpg'),
(3, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/492cfd0d-2803-4f5c-afa0-498319bee09d_BradyTrudeau.jpeg'),
(2, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/8effa722-7b82-41ae-b2b5-3575fa0a5f98_ArthurCarson.jpeg'),
(1, 6, '2020-11-23', 'http://playworks-step-challenge.s3.amazonaws.com/89fb066f-3d26-43ed-b6c4-3fbd409fc60f_davidgould.jpeg'),

(1, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/954e352d-4345-4ad0-8b5f-899630bb88f8_daviddoggo.jpg'),
(2, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/1a592c47-0dcf-4a42-90b7-f854e2158388_arthurdoggo.jpg'),
(29, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/9b7a1eaa-3321-4aee-970a-befbac7885f1_christydoggo.jpg'),
(16, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/e0b15ba7-17df-4c98-aa8b-3b0b4dc3d5f9_derekcat.jpg'),
(16, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/7a8c7eee-6619-497c-bdc8-644e1611beb4_dereknorma.jpg'),
(18, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/a1b46d7f-8ba8-4417-896f-622faf2401d3_leahcats.jpg'),
(6, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/442d805a-9fb2-4557-9032-ef68b4fedb2b_mikedoggo.jpeg'),
(15, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/7b14fb6a-4414-46d9-b1ab-b5eda5c42d9c_johnbanjo.jpg'),
(4, 4, '2020-11-24', 'http://playworks-step-challenge.s3.amazonaws.com/ae93ecfb-2f1f-49a0-a572-b56afaea5c4f_emmadoggo.jpg');

-- Only enter below to drop tables in the correct order
DROP TABLE "photos";
DROP TABLE "steps";
DROP TABLE "user";
DROP TABLE "challenges";
DROP TABLE "teams";
DROP TABLE "contests";
DROP TABLE "faq";
DROP TABLE "rules";