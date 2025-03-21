DROP DATABASE IF EXISTS gamedb;

CREATE DATABASE gamedb;
USE gamedb;
CREATE TABLE game (
    number INT PRIMARY KEY,
    name VARCHAR(39) NOT NULL,
    genre VARCHAR(22) NOT NULL,
    year INT NOT NULL,
    rating VARCHAR(9) NOT NULL
);

INSERT INTO game (number, name, genre, year, rating) VALUES
(1, 'The Legend of Zelda: Breath of the Wild', 'Action-adventure', 2017, '10/10'),
(2, 'The Witcher 3: Wild Hunt', 'Action role-playing', 2015, '10/10');

DROP USER IF EXISTS "leo"@"localhost";
CREATE USER "leo"@"localhost" IDENTIFIED BY "L33tP@ssw0rd";

GRANT ALL PRIVILEGES ON gamedb.* TO "leo"@"localhost";

FLUSH PRIVILEGES;
