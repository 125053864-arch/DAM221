let readline = require('readline');
let teclado = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

let productos = [];

function mostrarMenu(){
    console.log(`
       MENU 
       1. agregar
       2. Editar
       3. Eliminar
       4. listar productos 
       5. Salir
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
        }else if (opcion == "5"){
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
            let producto = {
                nombre: nombre,
                precio: Number(precio)
            };
            productos.push(producto);

            console.log("producto agregado");
            mostrarMenu();

        
        });
    })
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
                mostrarMenu();

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

mostrarMenu();



