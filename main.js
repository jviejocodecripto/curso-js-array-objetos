const fs = require('fs');
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

// console.log("customers", customers.length);

// console.log("orders", orders.length);

// console.log("orderDetails", orderDetails.length);

// console.log("products", products.length);

// customer_id,company_name,contact_name,contact_title,address,city,region,postal_code,country,phone,fax

var clientesSevilla = customers.filter(i => i.country == 'USA')

// var clientesSevilla = []

// for (var customer of customers) {
//    if (customer.country == 'USA') {
//     clientesSevilla.push(customer)
//    }
// }


// // console.log(clientesSevilla)


// const hungo_customer = customers.find(i => i.customer_id == 'HUNGO')
// //console.log('busqueda de hungo _customer', hungo_customer)



function buscarCustomer(clientes, texto) {
    for (var customer of customers) {
        if (customer.customer_id == texto) {
            return customer;
        }
    }
    return null
}

var resultadoBusqueda = buscarCustomer(customers, 'HUNGa')
// console.log('resultado de la busueda', resultadoBusqueda)


const nombres = customers
    .filter(cliente => cliente.country == 'USA' && cliente.city == 'Portland')
    .map(cliente => ({ nombre: cliente.company_name, city: cliente.city, country: cliente.country }))
// console.log(nombres)


const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// var suma = 0;
// for (var el of array) {
//     suma += el
// }
// console.log(suma)

const suma = array.reduce((acumulador, valor) => {
    return acumulador + valor
}
)
console.log(suma)

// product_id,unit_price,order_id,quantity,discount

// 10.255 


function totalFactura(facturas, numeroFactura) {

    return facturas.filter(factura => factura.order_id == numeroFactura)
        .reduce((acumulador, fila) =>
            acumulador + fila.unit_price * fila.quantity
            , 0)

}

console.log(totalFactura(orderDetails, 10.255 ))