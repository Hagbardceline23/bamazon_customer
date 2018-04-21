var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "root",
    database : "bamazon_db"


});

connection.connect(function(err){
    if (err) throw err;
    
    start();
});

function start(){
 
    function readProducts();
    inquirer
    .prompt({
        name: "idAndQuantity",
        type: "list",
        message: "What is the id of the product that you would like to purchase? How many itmes would you like to buy?",
        choices: ["id","stockQuantity"]
})
.then(function(answer){

})



}

function readProducts(){
    console.log("selecting all products");
    connection.query("SELECT * FROM products", function(err, res ) {
    if  (err) throw err;    
    console.log(res);
    connection.end();
    });
}



