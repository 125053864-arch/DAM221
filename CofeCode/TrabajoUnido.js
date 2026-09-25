const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ------------------------------------------------------------------
// Interfaz "controlada": se comporta igual que rl (mismo .question
// y .close que ya usaban los 3 archivos), pero si el usuario escribe
// la palabra "menu" en cualquier pregunta, regresa al menú principal
// en vez de entregarle esa respuesta al sistema activo.
// Esto NO toca la lógica interna de pedidos.js / script2.1.js / script.js.
// ------------------------------------------------------------------
function crearInterfazControlada(interfazReal) {
    return {
        question: function(pregunta, callback) {
            interfazReal.question(pregunta, function(respuesta) {
                if (respuesta.trim().toLowerCase() === "menu") {
                    console.log("\nRegresando al menú principal...\n");
                    menuPrincipal();
                } else {
                    callback(respuesta);
                }
            });
        },
        close: function() {
            interfazReal.close();
        }
    };
}

const controlada = crearInterfazControlada(rl);

// ==================================================================
// SISTEMA 1: Sistema de Pedidos (pedidos.js)
// ==================================================================
const Sistema1 = (function (teclado) {

let producto = "";
let precio = 0;
let cantidad = 0;
let total = 0;

let productos = [
    { nombre: "Sabritas", precio: 25, descuento: 10, disponible: true },
    { nombre: "Jocho", precio: 65, descuento: 15, disponible: true },
    { nombre: "Matiburguer", precio: 105, descuento: 20, disponible: false }
];

let pedidos = [];

function mostrarMenu() {
    console.log(`
        SISTEMA DE PEDIDOS
        1. Consultar productos
        2. Crear pedido
        3. Listar pedidos
        4. Ver promociones
        5. Salir
        6. Cancelar pedido
    `);

    teclado.question("Seleccione una opción: ", function(opcion) {

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

        } else if (opcion == "6") {
            cancelarPedido();

        } else {
            console.log("Opción inválida.");
            mostrarMenu();
        }
    });
}

function consultarProductos() {
    console.log(`
        PRODUCTOS DISPONIBLES
    `);

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
        let precioFinal =
            producto.precio -
            (producto.precio * producto.descuento / 100);

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

        if (
            opcionProducto.trim() == "" ||
            !Number.isInteger(indice) ||
            indice < 0 ||
            indice >= productos.length
        ) {
            console.log("Producto inválido.");
            mostrarMenu();
            return;
        }

        if (productos[indice].disponible == false) {
            console.log("Producto no disponible.");
            mostrarMenu();
            return;
        }

        producto = productos[indice].nombre;
        precio = productos[indice].precio;

        teclado.question("Ingrese la cantidad: ", function(cantidadIngresada) {
            cantidad = Number(cantidadIngresada);

            if (
                cantidadIngresada.trim() == "" ||
                !Number.isInteger(cantidad) ||
                cantidad <= 0
            ) {
                console.log("Cantidad inválida.");
                mostrarMenu();
                return;
            }

            let subtotal = precio * cantidad;
            let descuento =
                subtotal * productos[indice].descuento / 100;

            total = subtotal - descuento;

            let pedido = {
                producto: producto,
                precio: precio,
                cantidad: cantidad,
                descuento: descuento,
                total: total,
                estado: "Pedido recibido"
            };

            pedidos.push(pedido);

            console.log(`
                PEDIDO CREADO

                Pedido: ${pedidos.length}
                Producto: ${producto}
                Precio unitario: $${precio}
                Cantidad: ${cantidad}
                Subtotal: $${subtotal}
                Descuento: $${descuento}
                Total: $${total}
                Estado: ${pedido.estado}
            `);

            actualizarEstado(pedido, pedidos.length);
            mostrarMenu();
        });
    });
}

function actualizarEstado(pedido, numeroPedido) {
    setTimeout(function() {
        if (pedido.estado == "Cancelado") {
            return;
        }

        pedido.estado = "Preparando...";
        console.log(`\nPedido ${numeroPedido}: ${pedido.estado}`);

        setTimeout(function() {
            if (pedido.estado == "Cancelado") {
                return;
            }

            pedido.estado = "Empacando...";
            console.log(`\nPedido ${numeroPedido}: ${pedido.estado}`);

            setTimeout(function() {
                if (pedido.estado == "Cancelado") {
                    return;
                }

                pedido.estado = "Pedido entregado";
                console.log(`\nPedido ${numeroPedido}: ${pedido.estado}`);
            }, 5000);

        }, 5000);

    }, 5000);
}

function listarPedidos() {
    if (pedidos.length == 0) {
        console.log("No hay pedidos registrados.");
    } else {
        console.log(`
            PEDIDOS REGISTRADOS
        `);

        pedidos.forEach(function(pedido, i) {
            console.log(`
                Pedido ${i + 1}

                Producto: ${pedido.producto}
                Precio: $${pedido.precio}
                Cantidad: ${pedido.cantidad}
                Descuento: $${pedido.descuento}
                Total: $${pedido.total}
                Estado: ${pedido.estado}
            `);
        });
    }
}

function cancelarPedido() {
    if (pedidos.length == 0) {
        console.log("No hay pedidos para cancelar.");
        mostrarMenu();
        return;
    }

    listarPedidos();

    teclado.question("Número del pedido que desea cancelar: ", function(numero) {
        let indice = Number(numero) - 1;

        if (
            numero.trim() == "" ||
            !Number.isInteger(indice) ||
            indice < 0 ||
            indice >= pedidos.length
        ) {
            console.log("Número de pedido inválido.");

        } else if (pedidos[indice].estado == "Pedido entregado") {
            console.log("El pedido ya fue entregado.");

        } else if (pedidos[indice].estado == "Cancelado") {
            console.log("El pedido ya está cancelado.");

        } else {
            pedidos[indice].estado = "Cancelado";
            console.log(`Pedido ${indice + 1}: Cancelado`);
        }

        mostrarMenu();
    });
}

return { iniciar: mostrarMenu };

})(controlada);


// ==================================================================
// SISTEMA 2: Sistema de Productos (script2.1.js)
// ==================================================================
const Sistema2 = (function (teclado) {

let productos = [];

function mostrarMenu(){
    console.log(`
       MENU 
       1. agregar
       2. Editar
       3. Eliminar
       4. listar productos 
       5. Buscar
       6. Salir
    `);

    teclado.question("Seleccione una opcion: ", function(opcion)  {

        if (opcion == "1"){
            agregarProducto();

        }else if (opcion == "2"){
            editarProducto();

        }else if (opcion == "3"){
            eliminarProducto();

        }else if (opcion == "4") {
            listarProductos();
            mostrarMenu();


        }else if (opcion =="5") {
            Buscar();

        }else if (opcion == "6"){
            console.log("Saliendo del menu");
            teclado.close();

        }else {
            console.log("Opcion invalida");
            mostrarMenu();
        }
    });
}

function agregarProducto(){
    teclado.question("Nombre del producto: ", function(nombre){

        teclado.question("precio deel producto: ",function(precio){

            teclado.question("Nombre de la categoria?: bebida o postre ", function(categorias){

                revisarIngrediente()
                .then(function(){

                    return prepararProducto(nombre);
                })
                .then(function(){

                    let producto = {
                        nombre: nombre,
                        precio: Number(precio),
                        Categoria: categorias
                    };
                
                    productos.push(producto);

                    console.log("Producto agregado");
                    mostrarMenu();

                })
                .catch(function(error){

                    console.log(error);

                    if(error == "Falta ingrediente"){
                        teclado.question("¿Desea volver a poner el producto? si/no: ", function(respuesta){

                            if(respuesta.toLowerCase() == "si"){
                                agregarProducto();
                            }else{
                                mostrarMenu();
                            }

                        });

                    }else if(error == "Error en cocina"){
                        mostrarMenu();
                    }

                });

            });

        });
    });
}

function revisarIngrediente(){

    return new Promise(function(resolver, rechazar){

        let numero = Math.floor(Math.random() * 10) + 1;

        if(numero == 1){
            rechazar("Falta ingrediente");
        }else{
            resolver();
        }

    });

}

function prepararProducto(nombre){

    return new Promise(function(resolver, rechazar){

        let tiempo = Math.floor(Math.random() * 5) + 1;

        console.log("Preparando " + nombre + "...");

        setTimeout(function(){

            if(tiempo > 3){
                rechazar("Error en cocina");
            }else{
                console.log("Producto preparado correctamente");
                resolver();
            }

        }, tiempo * 1000);

    });

}

function editarProducto(){
    listarProductos();

    teclado.question("Ingres el numero del producto a editar: ", function(numero) {

        let indice = numero -1;
       
        teclado.question("NUEVO nombre: ", function(nombre) {

            teclado.question("Nuevo precio: ", function(precio){

                teclado.question("Nueva categoria", function(categorias){

                    productos[indice].nombre = nombre;
                    productos[indice].precio = Number(precio);
                    productos[indice].Categoria = categorias;

                console.log("Producto editado.");
                mostrarMenu();

                });

            });
        });
    });
}

function eliminarProducto(){
    listarProductos();

    teclado.question("ingrese el nuemero del a eliminar: ", function(numero){

        let indice = numero -1;
        
        productos.splice(indice, 1);

        console.log("Producto eliminado.")
        mostrarMenu();
    })
}

function listarProductos(){
    if (productos.length == 0) {
        console.log("No hay productos registrados.");

    } else {
        console.log(`
            PRODUCTOS REGISTRADOS
        `);

        for (let i =0; i < productos.length; i++){
            console.log(
                (i +1) + ". " +
                productos[i].nombre +
                "-$"+
                productos[i].precio
            );
        }
    }
}

function Buscar(){
    console.log(`
        Buscar por: 
        1. productos Baratos
        2. productos Caros 
        3. Bebidas
        4. Postres
        5. Regresar
        
    `);

    teclado.question("Seleccione una opcion de busqueda: ",function(opcion1) {

    if(opcion1 == "1"){
        barato();
        Buscar();
    
    } else if(opcion1 == "2"){
        caro();
        Buscar();

    } else if(opcion1 == "3"){
        bebidas();
        Buscar();

    } else if(opcion1 == "4"){
        pasteles();
        Buscar();

    } else if(opcion1 == "5"){
        mostrarMenu();
    }else {
            console.log("Opcion de busqueda invalida");
            Buscar();
            
    }

});
}

function barato(){
    let productosBaratos = productos.filter( productos => productos.precio <50 );
    if (productosBaratos.length >0){
        console.log(productosBaratos);
    }else {
        console.log("No hay productos que buscar ");

    }
    
}

function caro(){
    let productosCaros = productos.filter( productos => productos.precio >50);
    if (productosCaros.length >0){
        console.log(productosCaros);

    }else {
        console.log("No hay productos caros ");
    }

}

function bebidas(){
    let productobebidas = productos.filter( productos => productos.Categoria === "bebida");
    if (productobebidas.length >0){
        console.log(productobebidas);

    }else {
        console.log("No hay bebidas ")
    }

}

function pasteles(){
    let productoPasteles =productos.filter(productos => productos.Categoria === "postre");

    if(productoPasteles.length>0){
        console.log(productoPasteles);
    }else {
        console.log("No hay pasteles");
    }
}

return { iniciar: mostrarMenu };

})(controlada);


// ==================================================================
// SISTEMA 3: Sistema de Pedidos con IVA (script.js)
// ==================================================================
const Sistema3 = (function (entrada) {

let listaPedidos = [];

let subtotal = 0;
let iva = 0;
let total = 0;

function notificar(pedido){
    console.log("NOTIFICACIÓN: Tu pedido de " + pedido.nombre + " fue recibido.");
}

function pedidoListo(pedido){
    pedido.estado = "Listo";
    console.log("NOTIFICACIÓN: Tu pedido de " + pedido.nombre + " está listo para recoger.");
}

function pedidoCancelado(pedido){
    pedido.estado = "Cancelado";
    console.log("NOTIFICACIÓN: Tu pedido de " + pedido.nombre + " fue cancelado.");
}

function agregarPedido(notificar){
    entrada.question("Cual es tu pedido? ", (nombre) => {
        entrada.question("Cual es el precio del pedido? ", (precio) => {
            precio =Number(precio);

            let nuevoPedido = { 
                nombre: nombre,
                precio: precio,
                estado: "Pendiente"
            };

            console.log("--------------------------------");
            listaPedidos.push(nuevoPedido);
            console.log("--------------------------------");
            subtotal = subtotal + precio;
            console.log("--------------------------------");
            iva = subtotal * 0.16;
            console.log("--------------------------------");
            total = subtotal + iva;
            console.log("--------------------------------");
            console.log("Pedido agregado: " + nombre);
            notificar(nuevoPedido);
            mostrarPedidos();
            menu();

        });

    });
}

function mostrarPedidos() {
    console.log("\nLista de pedidos: ");

    if (listaPedidos.length === 0) {
        console.log("No hay pedidos.");
    }else {
        for (let i = 0; i < listaPedidos.length; i++) {
        console.log((i + 1) + ". " + 
        listaPedidos[i].nombre +
        " - $" + listaPedidos[i].precio +
        " - Estado: " + listaPedidos[i].estado
    );
    }
}

    console.log("--------------------------------");
    console.log("Subtotal: $" + subtotal);
    console.log("--------------------------------");
    console.log("IVA: $" + iva);
    console.log("--------------------------------");
    console.log("Total: $" + total);
}

function mostrarPendientes() {
    console.log("\nPedidos pendientes: ");

    let existenPendientes = false;
    for (let i=0; i<listaPedidos.length; i++) {
        if (listaPedidos[i].estado === "Pendiente") {
            console.log((i + 1) + ". " +
            listaPedidos[i].nombre +
            " - $" + listaPedidos[i].precio
        );
        existenPendientes = true;
        }
    }

    if (existenPendientes) {
        console.log("No hay pedidos pendientes.");
    }
}

function seleccionarPedido(notificar) {
    if (listaPedidos.length === 0) {
        console.log("No hay pedidos.");
        menu();
        return;
    }

    mostrarPendientes();

    entrada.question("Seleccione el número del pedido: ", (numero) => {
        let posicion = Number(numero) - 1;
        if (
            posicion >= 0 &&
            posicion < listaPedidos.length 
        ){
            let pedido = listaPedidos[posicion];
            if (pedido.estado === "Pendiente") {
            notificar(pedido);
        }else {
            console.log("Pedido listo: " +
                pedido.estado);
        }
} else {
            console.log("Número de pedido no válido.");
}
menu();
}
);
}

function menu() {
    console.log("1. Agregar pedido");
    console.log("2. Mostrar pedidos");
    console.log("3. Pedidos pendientes");
    console.log("4. Pedido listo");
    console.log("5. Pedido cancelado");
    console.log("6. Salir");

    entrada.question("Seleccione una opción: ", function(opcion) {
        if (opcion === "1") {
            agregarPedido(notificar);
        } else if (opcion === "2") {
            mostrarPedidos();
            menu();
        } else if (opcion === "3") {
            mostrarPendientes();
            menu();
            } else if (opcion === "4") {
                seleccionarPedido(pedidoListo);
            
        } else if (opcion === "5") {
            seleccionarPedido(pedidoCancelado);

        } else if (opcion === "6") {
            console.log("Programa finalizado");
            entrada.close();
        } else {
            console.log("Opción no válida");
            menu();
        }
    });
}

return { iniciar: menu };

})(controlada);


// ==================================================================
// MENÚ PRINCIPAL (nuevo — une los 3 sistemas)
// ==================================================================
function menuPrincipal() {
    console.log(`
        ¿QUÉ SISTEMA DESEA EJECUTAR?
        1. Sistema de Pedidos 
        2. Sistema de Productos 
        3. Sistema de Caja
        4. Salir

        (Dentro de cualquier sistema, escriba "menu" en una
         pregunta para volver aquí)
    `);

    rl.question("Seleccione una opción: ", function(opcion) {
        if (opcion == "1") {
            Sistema1.iniciar();
        } else if (opcion == "2") {
            Sistema2.iniciar();
        } else if (opcion == "3") {
            Sistema3.iniciar();
        } else if (opcion == "4") {
            console.log("Saliendo");
            rl.close();
        } else {
            console.log("Opción inválida.");
            menuPrincipal();
        }
    });
}

menuPrincipal();