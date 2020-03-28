CREATE DATABASE winhacks;
use winhacks;

CREATE TABLE affected_area (
	day DATE NOT NULL,
	time_of_day VARCHAR(2) NOT NULL,
       	latitude DECIMAL(9,6) NOT NULL,
	longitude DECIMAL(9,6) NOT NULL,
	PRIMARY KEY (day, time_of_day, longitude, latitude)
);
