const fs = require('fs');
const papaparse = require('papaparse');
const Papa = require("papaparse")

function importar(filename) {
    const data = fs.readFileSync(filename, { encoding: 'latin1', flag: 'r' });
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
const convertir = (a) => {
    return typeof a == 'string' ? parseFloat(a.replace('.', '').replace(',', '.')) : a
}
orders.filter(i=>i.order_id == 11.077).forEach(i=> console.log(i))
orders = orders.map(i =>
(
    {
        ...i,
        order_id: convertir(i.order_id),
        
        order_date: new Date(i.order_date),
        required_date: new Date(i.required_date),
        shipped_date: new Date(i.shipped_date)
    }
));

products = products.map(i =>
(
    {
        ...i,
        unit_price: convertir(i.unit_price),
    }
));

orderDetails = orderDetails.map(i =>
(
    {
        product_id: convertir(i.product_id),
        unit_price: convertir(i.unit_price),
        order_id: convertir(i.order_id),
        quantity: convertir(i.quantity),
        discount: convertir(i.discount)
    }
)
);

fs.writeFileSync("./datos/customers_1.csv",Papa.unparse(customers.filter(i=>i.customer_id!=null)))
fs.writeFileSync("./datos/orders_1.csv",Papa.unparse(orders.filter(i=>i.order_id!=null)))
fs.writeFileSync("./datos/order_details_1.csv",Papa.unparse(orderDetails.filter(i=>i.order_id!=null)))
fs.writeFileSync("./datos/products_1.csv",Papa.unparse(products.filter(i=>i.product_id!=null)))

// meter un campo nuevo en orders que tenga el importe 
orders = orders.map(i =>
({
    ...i,
    customer: customers.find(j => j.customer_id == i.customer_id),
    total: orderDetails.filter(j => j.order_id == i.order_id)
        .reduce((acc, k) => acc + k.unit_price  * k.quantity,0)
})
)

// seleccionar los campo company_name, order_date, total 

var sel = orders.map(i => ({
   company_name: i.customer.company_name,
   order_date: i.order_date,
   total: i.total
}));

// seleccionar los campos company_name, order_date, total del año 1996
var sel = orders
    .filter(i => i.order_date.getFullYear() == 1996)
    .map(i => ({
    company_name: i.customer.company_name,
    order_date: i.order_date,
    total: i.total
 }));
 
// agrupar por año
var grupoAaaa = orders.reduce((acc, r) => {
    var a = acc[r.order_date.getFullYear()] 
    if (a) {
        acc[r.order_date.getFullYear()]++
    } else {
        acc[r.order_date.getFullYear()] = 1
    }
    return acc
}, {})



console.log(grupoAaaa)



// console.log(JSON.stringify(orders))

// console.log(orders.map(i => ({
//     order_id: i.order_id, total: i.total
// })))


// la media de las facturas por año
// compras medias por cliente y año
// numero de facturas e importe orders por meses
// numero de facturas e importe por cliente
// productos vendidos por meses
// productos no vendidos por meses
// productos no vendidos por clientes
// productos no vendidos entre dos fechas






