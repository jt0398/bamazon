var inquirer = require("inquirer"); //Module for better presentation of prompts in console
var Store = require("./store.js");
const Table = require("easy-table"); //Module that displays data in a table format in console

//Store.showCustomerProductsMenu();

var store = new Store();

//Retrieves product data from MySQL and them in console
async function showMenu() {
    const productList = await store.getAllProducts();

    //Creates a table object for displaying in console
    let table = new Table;

    //Loops thru the result and adds each product to the table 
    productList.forEach(data => {
        table.cell("ID", data.item_id);
        table.cell("Product Name", data.product_name);
        table.cell("Price", data.price, Table.number(2));
        table.newRow();
    });

    //Display the product list in console in a table format
    console.log("\n" + table.toString());

    const questions = [{
            type: "input",
            name: "productID",
            message: "What is the ID of the product you\'d like to buy?"
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
        buyProduct(selectedProduct, answers.quantity);
    } else {
        console.log("\nPlease provide a valid product ID.\n\n");
        showMenu();
    }

}

/* Check if there's enough stock of the product to meet user's request. If there is, update 
    the stock quantity in the database and console displays total purchase price. If not, the console 
    displays a message informing the user that there's insufficient quantity. After both cases, 
    the user is given an option to place another order. */
async function buyProduct(product, quantity) {

    //If there's enough stock, updates the stock quantity in the database
    if (product.stock_quantity > quantity) {

        //Calculates total price
        let total = product.price * quantity;

        await store.updateProductSale(product.item_id, quantity, total);

        //Display total purchase price in console
        console.log(`Thank you for your purchase. Item purchased:
        ${product.product_name} - $${product.price.toFixed(2)} x ${quantity} qty
         Total cost = ${total.toFixed(2)}`);
    } else {
        console.log("Insufficient stock quantity. Cannot process purchase.");
    }

    //Prompt confirmation
    const confirm = [{
        type: "confirm",
        message: "Place another order?",
        name: "continue",
        default: false

    }];

    //Gives user the option to place another order
    inquirer.prompt(confirm).then(function(answers) {

        //If user chooses to do another purchase, display the product list in console
        if (answers.continue) {
            showMenu();
        }
    });

}

showMenu();