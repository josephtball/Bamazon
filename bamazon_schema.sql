CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT auto_increment NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values ("MacBook", "Computers", 1199.99, 12),
("Asus Laptop", "Computers", 899.99, 10),
("HP All-In-One", "Computers", 629.99, 4),
("iPad", "Computers", 329.99, 8),
("Surface", "Computers", 999, 10),
("Canon T6", "Cameras", 449.99, 5),
("Nikon D3400", "Cameras", 499.99, 6),
("Sony Alpha a6000", "Cameras", 599.99, 2),
("Xbox One", "Video Games", 249.99, 13),
("Playstation 4", "Video Games", 249.99, 14);

SELECT * FROM products;