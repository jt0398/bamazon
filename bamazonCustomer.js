var inquirer = require("inquirer");
var Store = require("./store.js");

var store = new Store();

store.showProductsMenu();