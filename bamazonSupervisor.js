const inquirer = require("inquirer"); //Module for better presentation of prompts in console
const Store = require("./store.js");
const Table = require("easy-table"); //Module that displays data in a table format in console

class BamazonSupervisor {
  constructor() {
    this.store = new Store();
  }

  getMenu() {
    //Menu list
    const list = [
      "View Product Sales by Department",
      "Create New Department",
      "Exit"
    ];

    //Convert string array into an array of objects
    const choices = list.map((item, index) => {
      return {
        key: index,
        name: item,
        value: index + 1
      };
    });

    //returns a rawlist type
    return {
      type: "rawlist",
      message: "What do you want to do?",
      name: "action",
      choices: choices
    };
  }

  async showMenu(displayHomeMenu) {
    //Prompts user to choose from the menu
    const answer = await inquirer.prompt(this.getMenu());

    switch (answer.action) {
      case 1:
        this.showDepartmentSales();
        break;
      case 2:
        this.addNewDepartment();
        break;
      default:
        console.log("\n\n");
        displayHomeMenu();
        break;
    }
  }

  //Retrieves department sales data from MySQL and displays them in console
  async showDepartmentSales() {
    const departmentData = await this.store.getDepartmentSales();

    //Creates a table object for displaying in console
    let table = new Table();

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
    console.log("\nDEPARTMENT SALES\n\n" + table.toString() + "\n");

    this.showMenu();
  }

  //Prompts user for new department information
  async addNewDepartment() {
    //Prompts user to provide department name and over head cost
    const questions = [
      {
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
    const results = await this.store.addDepartment(
      answers.departmentName,
      answers.overHeadCost
    );

    console.log("\nDepartment added successfully.\n\n");

    this.showMenu();
  }
}

module.exports = new BamazonSupervisor();
