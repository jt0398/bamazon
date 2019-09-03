DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE departments (
    department_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INT(10)
);

CREATE TABLE products (
    item_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_id INT(10),
    price DECIMAL(10,4),
    stock_quantity INT(10),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

INSERT INTO departments (department_name,over_head_costs)
VALUES ('Clothing & Accessories', 100),
        ('Sports & Outdoors', 50),
        ('Electronics', 75),
        ('Books', 45),
        ('Toys & Games', 45);

INSERT INTO products (product_name,department_id,price,stock_quantity)
VALUES ('CK Mens Sweatshirt',1,35.50,50),
        ('Guess Womens Black Dress',1,45.90,30),
        ('1/2 Inch Extra Mat',2,20.25,20),
        ('Women Men iWatch Apple Watch',2,40.00,60),
        ('Samsung Galaxy Tablet 10"',3,400.00,10),
        ('Lenovo Thinkpad T560p 14"',3,1000.00,5),
        ('Western Digital External Hard Drive - USB 3.0',3,50.00,15),
        ('Clean Code by Robert Martin',4,60.00,20),
        ('The Pragmatic Programmer by Andrew Hunt',4,40.00,10),
        ('Design Patterns by Erich Gamma',4,60.00,20),
        ('Optimus Prime Exclusive Figure',5,20.00,30),
        ('LEGO Marvel Spider-Man Building Kit',5,20.00,30);