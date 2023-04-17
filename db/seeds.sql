USE workplace_db;

INSERT INTO department(id, name)
VALUES
(1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "Legal");

INSERT INTO role(title, salary, department_id)
VALUES
("Salesperson", 70000, 1),
("Sales Lead", 100000, 1),
("Software Engineer", 90000, 2),
("Lead Engineer", 150000, 2),
("Accountant", 110000, 3),
("Account Manager", 170000, 3),
("Lawyer", 180000, 4),
("Legal Team Lead", 250000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Tony", "Bertocchi", 2, NULL),
("Vinnie", "Pere", 1, 1),
("Giovanni", "Parlatore", 4, NULL),
("Allesia", "Rossi", 3, 3),
("Sofia", "Giucola", 6, NULL),
("Fernando", "Bernadini", 5, 5),
("Tom", "Jones", 8, NULL),
("Giorgio", "Santorelli", 7, 7);