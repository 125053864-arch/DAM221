let readline = require('readline');
let teclado = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

let productos = [];
let pedidos = [];

function mostrarMenu(){
    console.log(`
        Sistema de cocina

        1. Gestionar productos
        2. Consultar productos
        3. Crear pedido 
        4. Mostrar pedidos del cliente
        5. Salir

    `);
    teclado.question("Seleccione una opcion: ", function(opcion)  {
        if (opcion == "1"){
            menuProductos();

        }else if (opcion == "2"){

            listarProductos();
            mostrarMenu();

        }else if (opcion == "3"){
            crearPedido();

        }else if (opcion == "4") {
            mostrarPedidos();
        }else if (opcion == "5"){
            console.log("Saliendo del sistema");
            teclado.close();
        }else {
            console.log("Opcion invalida");
            mostrarMenu();
        }
    });
}
function menuProductos(){
    console.log(`
        GESTION DE PRODUCTOS 
        1. AGREGAR
        2. Editar
        3. Eliminar
        4. Listar Producto
        5. Regresar
        `);

        teclado.question("Seleccione una opcion: ", function(opcion){
        if(opcion =="1"){
            agregarProducto();

        }else if(opcion=="2"){
            editarProducto();

        }else if(opcion=="3"){
            eliminarProducto();

        }else if(opcion=="4"){
            listarProductos();
            menuProductos();

        }else if(opcion=="5"){
            mostrarMenu();
        }else {

            console.log("Opcion invalida");
            menuProductos();
        }
        });
        
}



function agregarProducto(){
    teclado.question("Nombre del producto: ", function(nombre){
        teclado.question("precio deel producto: ",function(precio){
            let producto = {
                nombre: nombre,
                precio: Number(precio)
            };
            productos.push(producto);

            console.log("producto agregado");
            menuProductos();

        
        });
    });
}

function editarProducto(){
    listarProductos();

    teclado.question("Ingres el numero del producto a editar: ", function(numero) {

        let indice = numero -1;
       
        teclado.question("NUEVO nombre: ", function(nombre) {
            teclado.question("Nuevo precio: ", function(precio){

                productos[indice].nombre = nombre;
                productos[indice].precio = Number(precio);

                console.log("Producto editado.");
                menuProductos();

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
        menuProductos();
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
}function crearPedido(){
    listarProductos();

    if(productos.length== 0){
        mostrarMenu();
    return;

    }

    teclado.question("Nombre del cliente: ", function(cliente){
        teclado.question("Seleccione un producto: ",function(numero){

            let indice = numero -1;
            let producto = productos[indice];

        
        
        teclado.question("ingresela la cantidad: ", function(cantidad){
            cantidad = Number(cantidad);

            let pedido ={
                cliente: cliente,
                producto: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad,
                total: producto.precio * cantidad
            };
            pedidos.push(pedido);

            console.log(`
                PEDIDO GUARDADO
                Cliente: ${pedido.cliente}
                Producto: ${pedido.producto}
                precio: ${producto.precio}
                Cantidad: $${pedido.cantidad}
                Total: $${pedido.total}

                 `);

                 mostrarMenu();

        });
                
        });
        
    });
}
function mostrarPedidos(){
    if(pedidos.length ==0){
        console.log("No hay pedidos registrados.");

    } else {
        console.log(`
            PEDIDOS DEL CLIENTE
            `);
            for (let i = 0; i< pedidos.length; i++){
                console.log(`
                    pedido${i + 1}
                    Cliente: ${pedidos[i].cliente}
                    Producto: ${pedidos[i].producto}
                    precio: ${pedidos[i].precio}
                    Cantidad: ${pedidos[i].cantidad}
                    Total: $${pedidos[i].total}
                    `);
            }
    }

}

mostrarMenu();



