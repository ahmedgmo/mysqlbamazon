require('console.table');
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Monday12",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  }
  loadProducts();
});

function loadProducts() {
  connection.query("SELECT * FROM inventory", function(err, res) {
    if (err) throw err;
    console.table(res);

    getProduct(res);
  });
}

function getProduct(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What would you like to purchase today? Please choose a number from the list of products.",
      }
    ])
    .then(function(input) {
      var productID = parseInt(input.choice);
      var product = checkInventory(productID, inventory);

      if (product) {
        returnStock(product);
      }
      else 
      {
        console.log("We ran out of this product. Is there anything you'd like to buy?");
        loadProducts();
      }
    });
}

function returnStock(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many itmes would you like?",
      }
    ])
    .then(function(input) {
      var quantity = parseInt(input.quantity);

      if (quantity > input.stock) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        confirmSale(product, quantity);
      }
    });
}

function confirmSale(product, quantity) {
  connection.query(
    "UPDATE products SET stock = stock - ? WHERE id = ?",
    [quantity, product.id],
    function(err, res) {
      console.log("Your order has been received!");
      loadProducts();
    }
  );
}

function checkInventory(productID, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].id === productID) {
      return inventory[i];
    }
  }
  return null;
}
