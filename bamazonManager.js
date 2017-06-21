var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Keyport1",
	database: "bamazon"
});

var managerStart = function() {
	inquirer.prompt([
		{
			type: "list",
			name: "action",
			message: "Please select an option.",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		}
	]).then(function(answer) {
		switch (answer.action) {
			case "View Products for Sale":
				viewProducts();
				break;
			case "View Low Inventory":
				lowInventory();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product":
				addProduct();
				break;
			default:
		}
	});
}
module.exports = managerStart;

function viewProducts() {
	var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
	connection.query(query, function(err, result) {
		if (err) throw err;
		for (var i = 0; i < result.length; i++) {
			console.log("ID: "+result[i].item_id+", "+result[i].product_name+" | Price: $"+result[i].price+" | Quantity: "+result[i].stock_quantity);
		}
		managerStart();
	});
}

function lowInventory() {
	var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
	connection.query(query, function(err, result) {
		if (err) throw err;
		for (var i = 0; i < result.length; i++) {
			console.log("ID: "+result[i].item_id+", "+result[i].product_name+" | Price: $"+result[i].price+" | Quantity: "+result[i].stock_quantity);
		}
		managerStart();
	});
}

function addInventory() {
	inquirer.prompt([
		{
			type: "input",
			name: "item",
			message: "Enter ID of the product you want to increase the stock of.",
		},
		{
			type: "input",
			name: "stockAdd",
			message: "Enter amount of stock you want to add to the inventory."
		}
	]).then(function(answers) {
		var query = "UPDATE products SET stock_quantity = stock_quantity+? WHERE item_id = ?";
		var param = [answers.stockAdd, answers.item]
		connection.query(query, param, function(err, result) {
			if (err) throw err;
			console.log("------ Stock updated. ------");
			managerStart();
		});
	});
}

function addProduct() {
	inquirer.prompt([
		{
			type: "input",
			name: "product",
			message: "Enter the name of the product you want add.",
		},
		{
			type: "input",
			name: "department",
			message: "Enter the name of the department this product belongs to."
		},
		{
			type: "input",
			name: "price",
			message: "Enter the price of this product.",
		},
		{
			type: "input",
			name: "quantity",
			message: "Enter the amount of this product in stock."
		}
	]).then(function(answers) {
		var query = "INSERT INTO products(product_name, department_name, price, stock_quantity) values(?, ?, ?, ?)";
		var param = [answers.product, answers.department, answers.price, answers.quantity];
		connection.query(query, param, function(err, result) {
			if (err) throw err;
			console.log(answers.product+" added to products list.");
			managerStart();
		});
	});
	
}