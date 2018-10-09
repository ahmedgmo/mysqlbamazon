DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE inventory(
  id INT AUTO_INCREMENT NOT NULL,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT(10) NOT NULL,
  primary key(id)
);

SELECT * FROM inventory;

INSERT INTO products (product, department, price, stock)
VALUES ("Instant Pot 6-Quart 7-in-1 Multi-cooker", "Kitchen", 58.99, 120),
  ("LifeStraw Personal Water Filter", "Travel", 24.95, 350),
  ("iRobot Roomba 671", "Vacuums", 388, 150),
  ("23andMe DNA Test", "Home Tests", 139, 52),
  ("Sony Wireless Headphones", "Accessories", 198, 100),
  ("Anker PowerCore 10000mAh", "Accessories", 29.00, 190),
  ("Bose QuietComfort 25", "Accessories", 299, 35),
  ("Oral-B White Pro 1000", "Oral Care", 69.99, 123),
  ("Trtl Travel Pillow", "Travel", 29.99, 300)