//Add required modules
var inquirer = require("inquirer"); //Module for better presentation of prompts in console
const pool = require("./dbPool.js"); //Exported objects of the MYSQL pool
const Product = require("./product.js"); //Product class
const Table = require("easy-table"); //Module that displays data in a table format in console

var Store = function() {
    var instance; //Store singleton object   

    //Returns a singleton object
    return function() {

        //Retrieves product data from MySQL and them in console
        this.showCustomerProductsMenu = function() {

            //Calls a stored procedure in MySQL
            pool.query("CALL GetProducts()", function(error, results, fields) {
                if (error) throw error;

                const productList = results[0];

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

                //Prompts user to choose a product to buy and the quantity
                inquirer.prompt([{
                        type: "input",
                        name: "productID",
                        message: "What is the ID of the product you\'d like to buy?"
                    },
                    {
                        type: "input",
                        name: "quantity",
                        message: "How many units would you like to buy?"
                    }
                ]).then(function(answers) {

                    //Searches the product array for the user's choice of product
                    selectedProduct = productList.find(function(product) {
                        return product.id === parseInt(answers.productID);
                    });

                    instance.buyProduct(selectedProduct, answers.quantity);
                });

            });
        };

        /* Check if there's enough stock of the product to meet user's request. If there is, update 
            the stock quantity in the database and console displays total purchase price. If not, the console 
            displays a message informing the user that there's insufficient quantity. After both cases, 
            the user is given an option to place another order. */
        this.buyProduct = function(product, quantity) {

            //Prompt confirmation
            const confirm = [{
                type: "confirm",
                message: "Place another order?",
                name: "continue",
                default: false

            }];

            //If there's enough stock, updates the stock quantity in the database
            if (product.stockQuantity > quantity) {
                pool.query("CALL UpdateProductPrice(?,?)", [product.item_id, quantity], function(error, results) {
                    if (error) throw error;

                    //Calculates total price
                    let total = product.price * quantity;

                    //Display total purchase price in console
                    console.log(`Thank you for your purchase. Item purchased:
                ${product.name} - $${product.price.toFixed(2)} x ${quantity} qty
                Total cost = ${total.toFixed(2)}`);

                    //Gives user the option to place another order
                    inquirer.prompt(confirm).then(function(answers) {

                        //If user chooses to do another purchase, display the product list in console
                        if (answers.continue) {
                            instance.showProductsMenu();
                        }
                    });
                });
            } else {
                console.log("Insufficient stock quantity. Cannot process purchase.");

                //Gives user the option to place another order
                inquirer.prompt(confirm).then(function(answers) {

                    //If user chooses to do another purchase, display the product list in console
                    if (answers.continue) {
                        instance.showProductsMenu();
                    }
                });
            }

        }

        this.GetLowInventory = function() {

            //Calls a stored procedure in MySQL
            pool.query("CALL GetProductLowStock()", function(error, results, fields) {
                if (error) throw error;

                const productList = results[0];

                //Creates a table object for displaying in console
                let table = new Table;


                //Loops thru the result and adds each product to the table 
                productList.forEach(data => {
                    table.cell("ID", data.item_id);
                    table.cell("Product Name", data.product_name);
                    table.cell("Price", data.price, Table.number(2));
                    table.cell("Stock Quantity", data.stock_quantity);
                    table.newRow();
                });

                //Display the product list in console in a table format
                console.log("\n" + table.toString());


            });
        };

        //If there's an store type object in memory, return the same object whenever the constructor is called
        if (!instance) {
            instance = this;
        }

        return instance;
    }

}();

module.exports = new Store();