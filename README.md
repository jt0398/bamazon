# Bamazon

## Overview

Bamazon is a Node CLI application which uses a MySQL database to store product and department data.

1.  bamazonCustomer.js

    This application is for customers to place an purchase order. It will first display all of the items available for sale.

    The customer is prompted for the product ID and quantity he or she would like to buy.

    After the cusomter has placed the order, the application will check if there's enough stock to meet the customer's request and updates the stock quantity in the database. The total purchase purchase price is calculated and also tracked in the database for each product.

    If there's not enough stock, the application displays a message `Insufficient quantity!` and then prevents the order from going through.

2.  bamazonManager.js

    This application is for managers to manage products in the store. It will first display the menu options below:

        * View Products for Sale

        * View Low Inventory

        * Add to Inventory

        * Add New Product

    If a manager selects `View Products for Sale`, all products in the database will be displayed with their IDs, names, prices, and quantities.

    If a manager selects `View Low Inventory`, the application will display all products with an inventory count lower than five.

    If a manager selects `Add to Inventory`, the application allows the manager to add more quantity of any product in the store.

    If a manager selects `Add New Product`, the application allows the manager to add a completely new product to the store.

3.  bamazonSupervisor.js

    This application is for supervisor to manage departments in the store. It will first display the menu options below:

        * View Product Sales by Department

        * Create New Department

    If a supervisor selects `View Product Sales by Department`, the application will display a summarized table of each department's sale.

    If a supervisor selects `Create New Department`, the application allows the supervisor to add a completely new department to the store.
