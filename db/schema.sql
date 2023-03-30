DROP DATABASE IF EXISTS workplace_db;
CREATE DATABASE workplace_db;

USE workplace_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

