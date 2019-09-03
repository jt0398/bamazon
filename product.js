//Add required modules
const pool = require("./dbPool.js"); //exported objects of the MYSQL pool

var Product = function(id, name, department, price, stockQuantity) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.price = price;
    this.stockQuantity = stockQuantity;
};

module.exports = Product;