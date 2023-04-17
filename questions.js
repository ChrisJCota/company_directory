class InputQuestion {
    constructor(name, message) {
        this.name = name,
            this.message = message,
            this.type = "input"
    }
}

module.exports = {
    addEmployee(array) {
        return [
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
                choices: array
            },
            {
                type: 'list',
                message: "Does the employee have a manager?",
                name: 'has_manager',
                choices: ["Yes", "No"]
            }]

    },
    addDepartment: [
        new InputQuestion("dept_name", "What is the name of your departemnt")
    ]
}