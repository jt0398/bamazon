//Add required modules
var inquirer = require("inquirer");
const pool = require("./dbPool.js"); //exported objects of the MYSQL pool
const Product = require("./product.js");
const Table = require("easy-table");

var Store = function() {
    var instance;
    var productList = [];

    return function() {

        this.addProduct = function(id, name, department, price, stockQuantity) {
            this.productList.push(new Product(id, name, department, price, stockQuantity));
        };

        this.showProductsMenu = function() {

            this.productList = [];

            pool.query("CALL GetProducts()", function(error, results, fields) {
                if (error) throw error;

                let table = new Table;

                results[0].forEach(data => {
                    productList.push(new Product(data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity));

                    table.cell("ID", data.item_id);
                    table.cell("Product Name", data.product_name);
                    table.cell("Price", data.price, Table.number(2));
                    table.newRow();
                });

                console.log("\n" + table.toString());

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

                    selectedProduct = productList.find(function(product) {
                        return product.id === parseInt(answers.productID);
                    });

                    instance.buyProduct(selectedProduct, answers.quantity);
                });

            });
        };

        this.buyProduct = function(product, quantity) {

            const confirm = [{
                type: "confirm",
                message: "Place another order?",
                name: "continue",
                default: false

            }];

            if (product.stockQuantity > quantity) {
                pool.query("CALL UpdateProductPrice(?,?)", [product.id, quantity], function(error, results) {
                    if (error) throw error;

                    let total = product.price * quantity;

                    console.log(`Thank you for your purchase. Item purchased:
                ${product.name} - $${product.price} x ${quantity} qty
                Total cost = ${product.price * quantity}`);

                    inquirer.prompt(confirm).then(function(answers) {
                        if (answers.continue) {
                            instance.showProductsMenu();
                        }
                    });
                });
            } else {
                console.log("Insufficient stock quantity. Cannot process purchase.");

                inquirer.prompt(confirm).then(function(answers) {
                    if (answers.continue) {
                        instance.showProductsMenu();
                    }
                });
            }

        }

        if (instance) {
            console.log('an instance is already present');
        } else {
            instance = this;
        }

        return instance;
    }

}();

module.exports = new Store();