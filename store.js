//Add required modules
var inquirer = require("inquirer");
const pool = require("./dbPool.js"); //exported objects of the MYSQL pool
const Product = require("./product.js");
const Table = require('easy-table')

var productList = [];

var Store = function() {};

Store.prototype.addProduct = function(id, name, department, price, stockQuantity) {
    this.productList.push(new Product(id, name, department, price, stockQuantity));
};

Store.prototype.showProductsMenu = function() {

    productList = [];

    pool.query("CALL GetProducts()", function(error, results, fields) {
        if (error) throw error;

        let table = new Table;

        results[0].forEach(data => {
            productList.push(new Product(data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity));
            table.cell('ID', data.item_id);
            table.cell('Product Name', data.product_name);
            table.cell('Price', data.price);
            table.newRow();
        });

        console.table(table.toString());

        inquirer.prompt([{
                type: 'input',
                name: 'productID',
                message: 'What is the ID of the product you\'d like to buy?'
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many units would you like to buy?'
            }
        ]).then(function(answers) {
            console.log(answers.productID, answers.quantity);
        });

    });
};

module.exports = Store;