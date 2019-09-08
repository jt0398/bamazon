var inquirer = require("inquirer"); //Module for better presentation of prompts in console
var Store = require("./store.js");
const Table = require("easy-table"); //Module that displays data in a table format in console

var store = new Store();

const getMenu = function() {

    //Menu list
    const list = ["View Product Sales by Department", "Create New Department", "Exit"];

    //Convert string array into an array of objects
    const choices = list.map((item, index) => {

        return {
            key: index,
            name: item,
            value: index + 1
        }
    });

    //returns a rawlist type
    return {
        type: 'rawlist',
        message: 'What do you want to do?',
        name: 'action',
        choices: choices
    }

}

async function showMenu() {

    //Prompts user to choose from the menu
    const answer = await inquirer.prompt(getMenu());

    switch (answer.action) {
        case 1:
            showDepartmentSales();
            break;
        case 2:
            addNewDepartment();
            break;
        default:
            process.exit();
    }
}

//Retrieves department sales data from MySQL and displays them in console
async function showDepartmentSales() {
    const departmentData = await store.getDepartmentSales();

    //Creates a table object for displaying in console
    let table = new Table;

    //Loops thru the result and adds each department sales to the table 
    departmentData.forEach(data => {
        table.cell("ID", data.department_id);
        table.cell("Department Name", data.department_name);
        table.cell("Over Head Cost", data.over_head_costs, Table.number(0));
        table.cell("Product Sales", data.product_sales, Table.number(0));
        table.cell("Total Profit", data.total_profit, Table.number(0));
        table.newRow();
    });

    //Display the department sales in console in a table format
    console.log("\nDEPARTMENT SALES\n\n" + table.toString() + '\n');

    showMenu();

}

//Prompts user for new department information
async function addNewDepartment() {

    //Prompts user to provide department name and over head cost
    const questions = [{
            type: "input",
            name: "departmentName",
            message: "What is the department name?"
        },
        {
            type: "input",
            name: "overHeadCost",
            message: "What is the over head cost?"
        }
    ];

    const answers = await inquirer.prompt(questions);

    //Adds department information to the database
    const results = await store.addDepartment(answers.departmentName, answers.overHeadCost);

    console.log("\nDepartment added successfully.\n\n");

    showMenu();

}

showMenu();