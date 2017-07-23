CREATE DATABASE IF NOT EXISTS open_source_dance;

USE open_source_dance;

DROP PROCEDURE IF EXISTS createDifficulties;

DELIMITER //
CREATE PROCEDURE createDifficulties()
BEGIN
    DECLARE i int DEFAULT 0;
    WHILE i <= 1000 DO
        INSERT INTO difficulty_table(difficulty) VALUES (i);
        SET i = i + 10;
    END WHILE;
END //

DROP TABLE IF EXISTS user_video_table;
DROP TABLE IF EXISTS user_table;
DROP TABLE IF EXISTS video_table;
DROP TABLE IF EXISTS style_table;
DROP TABLE IF EXISTS difficulty_table;

CREATE TABLE user_table(
    user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE style_table(
    style_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL
);

CREATE TABLE difficulty_table(
    difficulty_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    difficulty int NOT NULL
);

CALL createDifficulties();

INSERT INTO style_table(name) VALUES ("Lindy Hop");
INSERT INTO style_table(name) VALUES ("Charleston");
INSERT INTO style_table(name) VALUES ("Tandem Charleston");
INSERT INTO style_table(name) VALUES ("East Coast");

CREATE TABLE video_table(
    video_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    likes INT UNSIGNED DEFAULT 0 NOT NULL,
    url varchar(255) NOT NULL,
    style_id int NOT NULL,
    difficulty_id int NOT NULL,
    FOREIGN KEY (style_id) REFERENCES style_table(style_id),
    FOREIGN KEY (difficulty_id) REFERENCES difficulty_table(difficulty_id)
);

CREATE TABLE user_video_table(
    user_video_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int NOT NULL,
    video_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_table(user_id),
    FOREIGN KEY (video_id) REFERENCES video_table(video_id)
);