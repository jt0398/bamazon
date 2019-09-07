var inquirer = require("inquirer"); //Module for better presentation of prompts in console
var Store = require("./store.js");
const Table = require("easy-table"); //Module that displays data in a table format in console

var store = new Store();

const getMenu = function() {

    const list = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"];

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
            showAllProducts();
            break;
        case 2:
            showLowInventory();
            break;
        case 3:
            addToInventory();
            break;
        case 4:
            addNewProduct();
            break;
    }
}

async function showAllProducts() {

    const productList = await store.getAllProducts();

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
    console.log("\nALL PRODUCTS\n\n" + table.toString());

    showMenu();

}

async function showLowInventory() {

    const productList = await store.getLowInventory();

    if (productList.length > 0) {
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
        console.log("\nLOW INVENTORY\n\n" + table.toString());
    } else {
        console.log("\nAll products have sufficient stock\n");
    }

    showMenu();

}

async function addToInventory() {

    const productList = await store.getAllProducts();

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
    console.log("\nALL PRODUCTS\n\n" + table.toString());

    const questions = [{
            type: "input",
            name: "productID",
            message: "What is the ID of the product you\'d like to add inventory?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to add?"
        }
    ];

    const answers = await inquirer.prompt(questions);

    //Searches the product array for the user's choice of product
    const selectedProduct = productList.find(function(product) {
        return product.item_id === parseInt(answers.productID);
    });


    if (selectedProduct) {
        await store.updateProductQuantity(answers.productID, answers.quantity);
        console.log("\nInventory updated successfully.\n\n");

    } else {
        console.log("\nInvalid product ID.\n\n");
    }

    showMenu();

}

async function addNewProduct() {

    const departmentList = await store.getDepartments();

    //Creates a table object for displaying in console
    let table = new Table;

    //Loops thru the result and adds each department to the table 
    departmentList.forEach(data => {
        table.cell("ID", data.department_id);
        table.cell("Department Name", data.department_name);
        table.newRow();
    });

    //Display the department list in console in a table format
    console.log("\nALL DEPARTMENTS\n\n" + table.toString());

    const questions = [{
            type: "input",
            name: "departmentID",
            message: "What is the ID of the department you\'d like to add a product?"
        },
        {
            type: "input",
            name: "productName",
            message: "What is the product name?"
        },
        {
            type: "input",
            name: "price",
            message: "What is the unit price?"
        },
        {
            type: "input",
            name: "quantity",
            message: "What is the stock quantity?"
        }
    ];

    const answers = await inquirer.prompt(questions);

    const results = await store.addProduct(answers.productName, answers.departmentID, answers.price, answers.quantity);

    console.log("\nProduct added successfully.\n\n");

    showMenu();
}


showMenu();