const inquirer = require('inquirer');

const express = require('express');
const mysql = require('mysql2');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'workplace_db'
    },
    console.log(`Connected to the staff_db database.`)
);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit']
        }
    ]).then((data) => {
        switch (data.selection) {
            case "View all departments":
                viewAllDepartments();
                break;

            case "View all roles":
                viewAllRoles();
                break;

            case "View all employees":
                viewAllEmployees();
                break;

            case "Add department":
                addDepartment();
                break;

            case "Add role":
                addRole();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Update employee role":
                updateEmployeeRole();
                break;
        }
    })
};

promptUser();

const viewAllEmployees = () => {
    db.query(`
    SELECT
    employees_with_managers.id AS employee_id,
    employees_with_managers.first_name,
    employees_with_managers.last_name,
    employee_info.title,
    employee_info.salary,
    employee_info.department_name,
    employees_with_managers.manager_name
    FROM employee_info
    JOIN employees_with_managers on employee_info.role_id = employees_with_managers.role_id;
    `, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}

const viewAllRoles = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}

const addDepartment = () => {
    return inquirer.prompt
        ([
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'name'
            }
        ]).then((data) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, data.name, (err, results) => {
                console.log("\nNew department added!");
                viewAllDepartments();
            })
        })
}

const addRole = () => {
    let departmentArr = [];
    db.query(`SELECT * FROM department`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            departmentArr.push(results[i].name)
        }

        return inquirer.prompt
            ([{
                type: 'input',
                message: 'What role would you like to add?',
                name: 'name'
            }, {
                type: 'input',
                message: "What is the salary for the new role?",
                name: 'department',
                choices: departmentArr
            }
            ]).then((data) => {
                db.query(`SELECT id FROM department WHERE department.name = ?`, data.department, (err, results) => {
                    let department_id = results[0].id;


                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [data.title, data.salary, department_id], (err, results) => {
                        console.log("\nNew role added!")
                        viewAllRoles();
                    })
                })
            })
    })
}
const addEmployee = () => {
    const roleArr = [];
    const employeeArr = [];
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArr.push(results[i].title);
        }
        db.query(`SELECT * FROM employee`, function (err, results) {
            for (let i = 0; i < results.length; i++) {
                let employeeName = `${results[i].first_name} ${results[i].last_name}`
                employeeArr.push(employeeName);
            }
            return inquirer.prompt([
                {
                    type: 'input',
                    message: "What is the emplyee's first name?",
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: "What's the employee's last name?",
                    name: 'last_name'
                },
                {
                    type: 'list',
                    message: "What is the employee's role",
                    name: 'role',
                    choices: roleArr
                },
                {
                    type: 'list',
                    message: "Does the employee have a manager?",
                    name: 'has_manager',
                    choices: ["Yes", "No"]
                }
            ]).then((data) => {
                let roleName = data.role;
                let first_name = data.first_name;
                let last_name = data.last_name;
                let role_id = '';
                let manager = '';

                db.query(`SELECT id FROM role WHERE role.title = ?`, data.role, (err, results) => {
                    role_id = results[0].id;
                });
                if (data.has_manager === "Yes") {
                    return inquirer.prompt([
                        {
                            type: 'list',
                            message: "Please select the employees manager",
                            name: 'manager',
                            choices: employeeArr
                        }
                    ]).then((data) => {
                        db.query(`SELECT id FROM role WHERE role.title = ?`, roleName, (err, results) => {
                            role_id = results[0].id;
                        })
                        db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.manager.split(""), (err, results) => {
                            manager = results[0].id;
                            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?,?,?,?)`, [first_name, last_name, role_id, manager], (err, results) => {
                                console.log("\nNew employee added. See below:");
                                viewAllEmployees();

                            })
                        })
                    })
                } else {
                    manager = null;
                    db.query(`SELECT id FROM role WHERE role.title = ?`, roleName, (err, results) => {
                        role_id = results[0].id;
                        db.query(`SELECT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUEs (?,?,?,?)`, [data.first_name, data.last_name, role_id, manager], (err, results) => {
                            console.log("\nNew employee added!");
                            viewAllEmployees();
                        })

                    })
                }
            })
        })
    })
}

const updateEmployeeRole = () => {
    const roleArr = [];
    const employeeArr = [];

    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArr.push(results[i].title);
        }
        db.query(`SELECT * FROM employee`, function (err, results) {
            for (let i = 0; i < results.length; i++) {
                let employee = `${results[i].first_name} ${results[i].last_name}`
                employeeArr.push(employeeName);
            }
            return inquirer.prompt([
                {
                    type: 'list',
                    message: "Which employee do you want to update?",
                    name: 'employee',
                    choices: employeeArr
                },
                {
                    type: 'list',
                    message: "What is the employee's new role?",
                    name: 'role',
                    choices: roleArr
                },
            ]).then((data) => {
                db.query(`SELECT id FROM employee WHERE role.title = ?;`, data.role, (err, results) => {
                    role_id = results[0].id;
                    db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.employee.split(" "), (err, results) => {
                        db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [role_id, results[0].id], (err, results) => {
                            console.log("\nEmployee role updated!");
                            viewAllEmployees();
                        })
                    })
                })
            })
        })
    })
}
