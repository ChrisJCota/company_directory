const mysql = require('mysql2/promise');
const inquirer = require("inquirer");
const { addEmployee, addDepartment } = require('./questions');
var connection;
var connect = async () => {
    connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'workplace_db'
    });
    runQuery()
}

connect()


const runQuery = async () => {
    try {
        const [roleArr, fields] = await connection.execute('SELECT title as name, id as value FROM role');
        const [employeeArr, other] = await connection.execute('SELECT id as value, CONCAT(first_name, " ", last_name) AS name FROM employee')
        var data = await inquirer.prompt(addDepartment)
        console.log(data)
        return
        data.has_manager == "Yes"
            ? console.log("need to add manager logic")
            : await connection.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${data.role}, null)`)
    } catch (error) {
        console.error(error);
    }
}