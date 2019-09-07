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
};

module.exports = Store;