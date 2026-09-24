let readline = require('readline');
let teclado = readline.createInterface({
    imput: process.stdin,
    output: process.stdout
});

//==============PEDIDOS==========

let listaPedidos =  [];
let subtotal = 0;
let iva = 0;
let total = 0;

function agregarPedido(){
    teclado.question("Cual es tu pedido? ", (precio) => {
        teclado.question("Cual es el precio del pedido? ", (precio) => {
            precio = Number(precio;)
            listaPedidos.push(pedido);
            subtotal = subtotal + precio;
            iva = subtotal * 0.16;
            total = subtotal + iva;
            

            console.log?("pedido agregado: " + pedido);
            mostrarPedidos():
            menuPedidos();
        });
    });
}


function mostrarPedidos() {
console.log?("Lista de pedidos: ");

for  (let i = 0; i < listaPedidos.length; i++) {
    console.log((i + 1) + ". " + listaPedidos[i]);
}

console.long("Subtotal: $" + subtotal);
console.log("IVA: $" + iva);
console.log("Total: $" + total);

}

function menuPedidos(){
    console.log("1. Agregar pedido");
    console.log("2. Mostrar pedidos");
    console.log("3. Salir");

    teclado.question("Seleccione una opcion: ", function(opcion) {

        if (opcion === "1"){
            agregarPedido();

        } else if (opcion === "2"){
            mostrarPedidos();
            menuPedidos();

        }else if (opcion ==="3"){
            console.log("Programa finalizado");
            teclado.close();

        }else {
            console.log("Opcion no valida");
            menuPedidos();
        }
    });
}


//==============SISTEMA DE PEDIDOS============

let producto = "";
let precio = 0;
let cantidad = 0;
let totalPedido = 0;

let productos = [
    { nombre: "Sabritas", precio: 25, descuento: 10, disponible: true},
    {nombre: "Jocho", precio: 65, descuento: 15, disponible: true},
    {nombre: "Matiburguer", precio: 105, descuento: 20, disponible: false}
];

let pedidos = [];

function mostrarMenu() {
    console.log(`
        SISTEMA DE PEDIDOS
        1.Consultar productos
        2. Crear pedido
        3.Listar pedidos
        4. Ver promociones
        5. Salir
        `);

        teclado.question("Seleccione una opcion: ", function(opcion) {

            if (opcion == "1") {
                consultarProductos();
                mostrarMenu();

            } else if (opcion == "2") {
                crearPedido();

            } else if (opcion == "3") {
                listarPedidos();
                mostrarMenu();

            } else if (opcion == "4") {
                consultarPromociones();
                mostrarMenu();

            } else if (opcion == "5") {
                console.log("Saliendo");
                teclado.close();
            }
        });




}

function consultarProductos() {
    console.log(`
        PRODUCTOS DISPONIBLES
        `)

        productos.forEach(function(producto, i) {
             if (producto.disponible == true) {

                 console.log(
                     (i + 1) + ". " +
                       producto.nombre +
                         " - $" + producto.precio
                          );

                           } else {
                             console.log(
                                 (i + 1) + ". " +
                                   producto.nombre +
                                   " - No disponible"
                                    );
                                      }
                                       });

                                       }

                                       function consultarPromociones() {
                                        console.log(`
                                            Promociones disponibles
                                             `);

                                              let promociones = productos.map(function(producto) {

                                                let precioFinal = producto.precio - (producto.precio * producto.descuento / 100);
                                                 return precioFinal;

                                                 });

                                              for (let i = 0; i < productos.length; i++) {

                                                 if (productos[i].disponible == true) {
                                                    
                                            console.log(`
                                                   Producto: ${productos[i].nombre}
                                                         Precio original: $${productos[i].precio}
                                                       Descuento: ${productos[i].descuento}%
                                                        Precio final: $${promociones[i]}
                                                            `);
                                                         }
                                                        }
                                                   }
                                                   
                                               function crearPedido() {
                                                      consultarProductos();

                                        teclado.question("Seleccione un producto: ", function(opcionProducto) {
                                            
                                              let indice = Number(opcionProducto) - 1;

                                             if (indice < 0 || indice >= productos.length || opcionProducto == "") {
                                                
                                              console.log("Producto invalido");
                                                 mostrarMenu();
                                                 return;

                                                 }


                                               if (productos[indice].disponible == false) {
                                                
                                                console.log("Producto invalido.");
                                                 mostrarMenu();
                                                 return;
                                                   }

                                               producto = productos[indice].nombre;
                                                precio = productos[indice].precio;
                                                
                                                 teclado.question("Ingrese la cantidad: ", function(cantidadIngresada) {
                                                    
                                                  cantidad = Number(cantidadIngresada);
  
                                                  if(cantidad <= 0 || cantidad % 1 != 0 ) {
                                                    console.log("Cantidad invalida");
                                                    mostrarMenu();
                                                      return;
                                                        }

                                                let subtotal = precio * cantidad;
                                                  let descuento = subtotal * productos[indice].descuento / 100;
                                                    totalPedido = subtotal - descuento;
                                                    
                                                    let pedido = {
                                                                        producto: producto,
                                                                        precio: precio,
                                                                         cantidad: cantidad,
                                                                         descuento: descuento,
                                                                        total: totalPedido
                                                                        };
                                                                        
                                                                    pedidos.push(pedido);
                                                                    
                                                                    console.log(`
                                                                        PEDIDO CREADO

                                                                         producto: ${producto}
                                                                          precio unitario: $${precio}
                                                                         cantidad: ${cantidad} 
                                                                          subtotal: $${subtotal}
                                                                          descuento: $${descuento}
                                                                         Total: $${totalPedido}
                                                                       `);
                                                                       
                                                                      mostrarMenu();
                                                                      
                                                                      }); 

                                                    

   




                    
}