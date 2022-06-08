const fs = require('fs');
const papaparse = require('papaparse');
const Papa = require("papaparse")

function importar(filename) {
    const data = fs.readFileSync(filename, { encoding: 'utf-8', flag: 'r' });
    return Papa.parse(data, {
        header: true,
        dynamicTyping: true
    })
}

var customers = importar('./datos/customers.csv').data
var orders = importar('./datos/orders.csv').data
var orderDetails = importar('./datos/order_details.csv').data
var products = importar('./datos/products.csv').data

console.log("customers", customers.length);
console.log("orders", orders.length);
console.log("orderDetails", orderDetails.length);
console.log("products", products.length);

