var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"


});

connection.connect(function (err) {
  if (err) throw err;

  start();
});




function start() {

  console.log("selecting all products");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);

    inquirer
      .prompt({
        name: "idAndPrice",
        type: "input",
        message: "Please enter the [id] of the product that you would like to purchase"
      })
      .then(function (answer) {
        productId = answer.idAndPrice;

        inquirer
          .prompt(
            {
              name: "idAndPrice",
              type: "input",
              message: "What [quantity] of this item would you like to purchase"
            })

          .then(function (answer) {
            productQuantity = answer.idAndPrice;
            console.log(productId, productQuantity);
            getBamazonId(productId, productQuantity);

          });

      });


  })




  function getBamazonId(productId, productQuantity) {
    connection.query("SELECT * FROM products", function (err, results) {
      if (err) throw err;
      var bamazonStkQuantity = 0;
      for (var i = 0; i < results.length; i++) {
        if (results[i].id == productId) {
          console.log(results[i])
          bamazonStkQuantity = parseInt(results[i].stock_quantity);

        }
      }
      console.log(bamazonStkQuantity);
      if (parseInt(productQuantity) > bamazonStkQuantity) {
        console.log("Sorry.. we have an insufficient quantity of this item to fill your order");
      } else {
        bamazonStkQuantity = parseInt(bamazonStkQuantity) - parseInt(productQuantity);
        fillOrder(productId, bamazonStkQuantity);
      }

    })
  }
  function fillOrder(productId, bamazonStkQuantity) {
    console.log(bamazonStkQuantity);
    console.log("Thanks for shopping with Bamazon, your order will be shipped soon");
    connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?',
      [parseInt(bamazonStkQuantity), parseInt(productId)],

      function (err, res) {
        if (err) throw err;
        console.log(res);
      }


    )
  }




}


