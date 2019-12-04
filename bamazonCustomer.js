const inquirer = require("inquirer"); //Module for better presentation of prompts in console
const Store = require("./store.js");
const Table = require("easy-table"); //Module that displays data in a table format in console

class BamazonCustomer {
  constructor() {
    this.store = new Store();
  }

  //Retrieves product data from MySQL and displays them in console
  async showMenu(displayHomeMenu) {
    const productList = await this.store.getAllProducts();

    //Creates a table object for displaying in console
    let table = new Table();

    //Loops thru the result and adds each product to the table
    productList.forEach(data => {
      table.cell("ID", data.item_id);
      table.cell("Product Name", data.product_name);
      table.cell("Price", data.price, Table.number(2));
      table.newRow();
    });

    //Display the product list in console in a table format
    console.log("\n" + table.toString());

    const questions = [
      {
        type: "input",
        name: "productID",
        message: "What is the ID of the product you'd like to buy?"
      },
      {
        type: "input",
        name: "quantity",
        message: "How many units would you like to buy?"
      }
    ];

    const answers = await inquirer.prompt(questions);

    //Searches the product array for the user's choice of product
    const selectedProduct = productList.find(function(product) {
      return product.item_id === parseInt(answers.productID);
    });

    if (selectedProduct) {
      this.buyProduct(selectedProduct, answers.quantity, displayHomeMenu);
    } else {
      console.log("\nPlease provide a valid product ID.\n\n");
      this.showMenu();
    }
  }

  /* Check if there's enough stock of the product to meet user's request. If there is, update 
    the stock quantity in the database and console displays total purchase price. If not, the console 
    displays a message informing the user that there's insufficient quantity. After both cases, 
    the user is given an option to place another order. */
  async buyProduct(product, quantity, displayHomeMenu) {
    //If there's enough stock, updates the stock quantity in the database
    if (product.stock_quantity > quantity) {
      //Calculates total price
      let total = product.price * quantity;

      await this.store.updateProductSale(product.item_id, quantity, total);

      //Display total purchase price in console
      console.log(`Thank you for your purchase. Item purchased:
        ${product.product_name} - $${product.price.toFixed(2)} x ${quantity} qty
         Total cost = ${total.toFixed(2)}`);
    } else {
      console.log("Insufficient stock quantity. Cannot process purchase.");
    }

    //Prompt confirmation
    const confirm = [
      {
        type: "confirm",
        message: "Place another order?",
        name: "continue",
        default: false
      }
    ];

    //Gives user the option to place another order
    const answers = await inquirer.prompt(confirm);

    //If user chooses to do another purchase, display the product list in console
    if (answers.continue) {
      this.showMenu();
    } else {
      console.log("\n\n");
      displayHomeMenu();
    }
  }
}

module.exports = new BamazonCustomer();
