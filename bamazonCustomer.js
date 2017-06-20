var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Keyport1",
	database: "bamazon"
});

var customerStart = function() {
	var query = "SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0";
	connection.query(query, function(err, result) {
		if (err) throw err;
		for (var i = 0; i < result.length; i++) {
			console.log("ID: "+result[i].item_id+", "+result[i].product_name+" | Price: $"+result[i].price);
		}
		order(result);
	});
}
module.exports = customerStart;

function order(products) {
	inquirer.prompt([
		{
			type: "input",
			name: "item",
			message: "Please enter the ID number of the product you would like to buy."
		},
		{
			type: "input",
			name: "amount",
			message: "How many would you like to buy?"
		}
	]).then(function(answers) {
		var index = answers.item-1;
		var query = "SELECT stock_quantity FROM products WHERE item_id = "+answers.item;
		connection.query(query, function(err, result) {
			if (err) throw err;
			if (result[0].stock_quantity >= answers.amount) {
				query = "UPDATE products SET ? WHERE ?";
				var param = [{stock_quantity: result[0].stock_quantity-answers.amount}, {item_id: answers.item}];
				connection.query(query, param, function(err, result) {
					if (err) throw err;
					var total = answers.amount * products[index].price;
					console.log("Order Complete");
					console.log(products[index].product_name+"		"+answers.amount+" x $"+products[index].price);
					console.log("TOTAL: $"+total);
					customerEnd();
				});
			} else {
				console.log("Insufficient quantity!");
				customerEnd();
			}
		});
	});
}

function customerEnd() {
	inquirer.prompt([
		{
			type: "confirm",
			name: "again",
			message: "Would you like to place another order?",
			default: true

		}
	]).then(function(answer) {
		if (answer.again) {
			customerStart();
		} else {
			console.log("Thank you for shopping with us.");
			connection.end();
		}
	});
}