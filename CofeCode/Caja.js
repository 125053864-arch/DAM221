const readline = require("readline");

const entrada = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let listaPedidos = [];

let subtotal = 0;
let iva = 0;
let total = 0;

function agregarPedido(){
    entrada.question("Cual es tu pedido? ", (pedido) => {
        entrada.question("Cual es el precio del pedido? ", (precio) => {
            precio =Number(precio);
            listaPedidos.push(pedido);
            subtotal = subtotal + precio;
            iva = subtotal * 0.16;
            total = subtotal + iva;
            console.log("Pedido agregado: " + pedido);
            mostrarPedidos();
            menu();

        });

    });
}

function mostrarPedidos() {
    console.log("Lista de pedidos: ");
    for (let i = 0; i < listaPedidos.length; i++) {
        console.log((i + 1) + ". " + listaPedidos[i]);
    }

    console.log("Subtotal: $" + subtotal);
    console.log("IVA: $" + iva);
    console.log("Total: $" + total);
}

function menu() {
    console.log("1. Agregar pedido");
    console.log("2. Mostrar pedidos");
    console.log("3. Salir");

    entrada.question("Seleccione una opción: ", function(opcion) {
        if (opcion === "1") {
            agregarPedido();
        } else if (opcion === "2") {
            mostrarPedidos();
            menu();
        } else if (opcion === "3") {
            console.log("Programa finalizado");
            entrada.close();
        } else {
            console.log("Opción no válida");
            menu();
        }
    });
}

menu ();