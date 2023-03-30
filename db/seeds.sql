INSERT INTO department(name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal")

INSERT INTO role(title, salary, department_id)
VALUES
("Salesperson", 70000, 1),
("Sales Lead", 100000, 1),
("Software Engineer", 90000, 2),
("Lead Engineer", 150000, 2),
("Accountant", 110000, 3),
("Account Manager", 170000, 3),
("Lawyer", 180000, 4),
("Legal Team Lead", 250000, 4)

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Vinnie", "Pere", 1, 2),
("Tony", "Bertocchi", 2, NULL),
("Allesia", "Rossi", 3, 4),
("Giovanni", "Parlatore", 4, NULL),
("Fernando", "Bernadini", 5, 6),
("Sofia", "Giucola", 6, NULL),
("Giorgio", "Santorelli", 7, 8),
("Tom", "Jones", 8, NULL)

CREATE VIEW employee_info AS
(SELECT
role.id AS role_id,
role.title,
role.salary,
department.name AS department_name
FROM role 
JOIN department 
on role.department_id = department.id);

CREATE VIEW employees_with_managers AS
(SELECT emp.id,
emp.first_name,
emp.last_name,
emp.role_id,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee AS manager RIGHT OUTER JOIN employee AS emp ON manager.id = emp.manager_id);