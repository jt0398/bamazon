var inquirer = require("inquirer"); //Module for better presentation of prompts in console
var Store = require("./store.js");
const Table = require("easy-table"); //Module that displays data in a table format in console

var store = new Store();

const getMenu = function() {

    const list = ["View Product Sales by Department", "Create New Department", "Exit"];

    const choices = list.map((item, index) => {

        return {
            key: index,
            name: item,
            value: index + 1
        }
    });

    return {

        type: 'rawlist',
        message: 'What do you want to do?',
        name: 'action',
        choices: choices
    }

}

async function showMenu() {

    const answer = await inquirer.prompt(getMenu());

    switch (answer.action) {
        case 1:
            showDepartmentSales();
            break;
        case 2:
            addNewDepartment();
            break;
    }
}

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
    console.log("\nDEPARTMENT SALES\n\n" + table.toString());

    showMenu();
}

async function addNewDepartment() {

}

showMenu();