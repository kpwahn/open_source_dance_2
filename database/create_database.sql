CREATE DATABASE IF NOT EXISTS open_source_dance;

USE open_source_dance;

DROP TABLE IF EXISTS user_table;

CREATE TABLE user_table(
    user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

DROP TABLE IF EXISTS video_table;

CREATE TABLE video_table(
    video_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    likes INT UNSIGNED DEFAULT 0 NOT NULL,
    url varchar(255) NOT NULL
);

DROP TABLE IF EXISTS user_video_table;

CREATE TABLE user_video_table(
    user_video_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    video_id int,
    FOREIGN KEY (user_id) REFERENCES user_table(user_id),
    FOREIGN KEY (video_id) REFERENCES user_table(user_id)
);