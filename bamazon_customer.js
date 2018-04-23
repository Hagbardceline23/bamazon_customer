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
 
function readProducts(){
    console.log("selecting all products");
    connection.query("SELECT * FROM products", function(err, res ) {
    if  (err) throw err;    
    console.log(res);

    });

    function startBamazon(){

        inquirer
        .prompt({
            name: "idAndPrice",
            type: "input",
            message: "Please enter the [id] of the product that you would like to purchase",
            choices: ["id"]
        })
        .then(function(answer){
            productId = answer.idAndPrice;


        });

        inquirer
        .prompt(
           {
               name: "idAndPrice",
               type: "input",
               message: "What [quantity] of this item would you like to purchase",
               choices: ["quantity"]
    })

       .then(function(answer){
           productQuantity = answer.idAndPrice;
       });



function getBamazonId(productId, productQuantity){
    connection.query("SELECT * FROM bamazon_db", function(err, results){
        if (err) throw err;
        inquirer
        .prompt({
         name: "choice",
         type: "list",
         choices: function(){
             for (var i = 0; i < results.length; i++){
                 if (results[i].id === productId){
                     bamzonStkQuantity = results[i].stockQuantity;

                 }
             }
         }
        })
        if (productQuantity > bamazonStkQuantity){
            console.log("Sorry.. we have an insufficient quantity of this item to fill your order");
        } else{
            bamazonStkQuantity = bamazonStkQuantity - productQuantity;
            fillOrder(bamazonStkQuantity);
        }




