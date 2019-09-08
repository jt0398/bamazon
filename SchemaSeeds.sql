DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE departments (
    department_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs decimal(10,4) NOT NULL DEFAULT '0.0000'
);

CREATE TABLE products (
    item_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_id INT(10) NOT NULL,
    price DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
    stock_quantity INT(10) NOT NULL DEFAULT '0',
    product_sales decimal(10,10) NOT NULL DEFAULT '0.0000',
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

INSERT INTO departments (department_name,over_head_costs)
VALUES ('Clothing & Accessories', 1000),
        ('Sports & Outdoors', 5000),
        ('Electronics', 7500),
        ('Books', 4500),
        ('Toys & Games', 4500);

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

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddProduct`(
	productName VARCHAR(100),
    departmentID INT,
    price DECIMAL(10,4),
    stockQuantity INT
)
BEGIN
	INSERT INTO products (product_name, department_id, price, stock_quantity)
    VALUES (productName,departmentID,price,stockQuantity);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetProductLowStock`()
BEGIN
	SELECT * FROM products WHERE stock_quantity < 5;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetProducts`()
BEGIN
	SELECT p.item_id, p.product_name, d.department_name, p.price, p.stock_quantity  
    FROM products AS p
	INNER JOIN departments AS d ON d.department_id = p.department_id
	ORDER BY p.item_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateProductQuantity`(
	itemID INT,
	quantity INT
)
BEGIN
	UPDATE products SET stock_quantity = stock_quantity + quantity WHERE item_id = itemID;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDepartments`()
BEGIN
	SELECT * FROM departments;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateProductQuantitySale`(
	itemID INT,
	quantity INT,
    totalSale DECIMAL(10,4)
)
BEGIN
	UPDATE products SET stock_quantity = stock_quantity - quantity, product_sales = product_sales + totalSale WHERE item_id = itemID;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddDepartment`(
	departmentName VARCHAR(100),
    overHeadCost DECIMAL(10,4)
)
BEGIN
	INSERT INTO departments (department_name,over_head_costs)
    VALUES(departmentName,overHeadCost);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDepartmentSales`()
BEGIN
	SELECT d.department_id, d.department_name, d.over_head_costs, COALESCE(SUM(p.product_sales),0) AS product_sales, COALESCE(CAST(SUM(p.product_sales) - d.over_head_costs AS SIGNED),0)  AS total_profit
    FROM departments AS d
	LEFT JOIN products AS p ON p.department_id = d.department_id
    GROUP BY d.department_id
	ORDER BY d.department_id;
END$$
DELIMITER ;



