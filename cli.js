var inquirer = require("inquirer");
var customer = require("./bamazonCustomer.js");
var manager = require("./bamazonManager.js");

inquirer.prompt([
	{
		type: "list",
		name: "type",
		message: "Select One",
		choices: ["Customer", "Manager", "Supervisor"]
	}
]).then(function(answer) {
	switch (answer.type) {
		case "Customer":
			new customer;
			break;
		case "Manager":
			new manager;
			break;
		case "Supervisor":
			console.log("Option not available yet.");
			break;
		default:
	}
});