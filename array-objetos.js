const valores = [12,10, 20, 30]

const factura = {
    cliente:{
        nombre:"juan"
    },
    items:[
        {
            importe:100
        },
        {
            importe:200
        },
        {
            importe:300
        },
        {
            importe:400
        }
    ]
}


function calcularMedia(arreglo){
    var suma = 0;
    for (ele of arreglo) {
        suma = suma + ele
    }
    console.log("suma", suma)
    console.log("numero de elementos", arreglo.length)

    var media = suma / arreglo.length

    return media;
}

function sumaLineas(fact) {
    var suma = 0;
    for (linea of fact.items){
        console.log("valor de la linea", linea)
        suma += linea.importe
    }
    console.log('suma', suma)
    return suma;
}

var m = calcularMedia(valores)
console.log(m)

var sumaFactura = sumaLineas(factura)
console.log("el valor de la factura es de ", sumaFactura)

