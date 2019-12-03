const bCustomer = require("./bamazonCustomer");
const bManager = require("./bamazonManager");
const bSupervisor = require("./bamazonSupervisor");
const Store = require("./store.js");
const inquirer = require("inquirer"); //Module for better presentation of prompts in console

var store = new Store();

function getMenu() {
  //Menu list
  const list = ["Buy Product(s)", "Manage Inventory", "View Reports", "Exit"];

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

async function showMenu() {
  //Prompts user to choose from the menu
  const answer = await inquirer.prompt(getMenu());

  switch (answer.action) {
    case 1:
      bCustomer.showMenu(displayMenu);
      break;
    case 2:
      bManager.showMenu(displayMenu);
      break;
    case 3:
      bSupervisor.showMenu(displayMenu);
      break;
    case 4:
      store.close();
      process.exit();
      break;
  }
}

async function displayMenu() {
  showMenu();
}

showMenu();
