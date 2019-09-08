//Add required modules
const pool = require("./dbPool.js"); //Exported objects of the MYSQL pool

var Store = function() {

    this.getAllProducts = function() {

        return new Promise(resolve => {

            pool.query("CALL GetProducts()", function(error, results, fields) {
                if (error) throw error;
                resolve(results[0]);
            });
        });

    };

    this.updateProductQuantity = function(productID, quantity) {

        return new Promise(resolve => {

            pool.query("CALL UpdateProductQuantity(?,?)", [productID, quantity], function(error, results) {
                if (error) throw error;
                resolve(results);
            });

        });
    }

    this.updateProductSale = function(productID, quantity, totalSale) {

        return new Promise(resolve => {

            pool.query("CALL UpdateProductQuantitySale(?,?,?)", [productID, quantity, totalSale], function(error, results) {
                if (error) throw error;
                resolve(results);
            });

        });
    }

    this.getLowInventory = function() {

        return new Promise(resolve => {

            pool.query("CALL GetProductLowStock()", function(error, results, fields) {
                if (error) throw error;

                resolve(results[0]);
            });

        });

    };

    this.addInventory = function(productID, quantity) {

        return new Promise(resolve => {

            pool.query("CALL GetProductLowStock()", function(error, results, fields) {
                if (error) throw error;

                resolve(results[0]);
            });

        });

    };

    this.getDepartments = function() {

        return new Promise(resolve => {

            pool.query("CALL GetDepartments()", function(error, results, fields) {
                if (error) throw error;

                resolve(results[0]);
            });

        });

    };

    this.addProduct = function(productName, departmentID, price, quantity) {

        return new Promise(resolve => {

            pool.query("CALL AddProduct(?,?,?,?)", [productName, departmentID, price, quantity], function(error, results, fields) {
                if (error) throw error;

                resolve(results);
            });

        });

    };

    this.getDepartmentSales = function() {

        return new Promise(resolve => {

            pool.query("CALL GetDepartmentSales()", function(error, results, fields) {
                if (error) throw error;

                resolve(results[0]);
            });

        });

    };

    this.addDepartment = function(departmentName, overHeadCost) {

        return new Promise(resolve => {

            pool.query("CALL AddDepartment(?,?)", [departmentName, overHeadCost], function(error, results, fields) {
                if (error) throw error;

                resolve(results);
            });

        });

    };
};

module.exports = Store;