
//Codigo Original Pegado de Cocina.js 


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
                .then(function){
                    return prepararProducto(nombre);
                })
                .then(function(){

                    let producto = {
                nombre: nombre,
                precio: Number(precio),
                Categoria: categorias
                    
                };
                
            productos.push(producto);

            console.log("producto agregado");
            mostrarMenu();

        })
            .catch(function(error){
                console.log(error);
            
            if(error()=="falta ingrediente"){
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
    return new promiseHooks(function(rosolver, rechazar){
        let numero = Math.floor(Math.random()* 10)+1;

        if(numero == 1){
            rechazar("Falta ingrediente");

        }else{
            resolver();
        }
    });
}

prepararProducto(){
    return new promise(function)
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

mostrarMenu();

// Parte de Codigo pegado hecho en Trabajo.Unido 

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
//Ya apartir de aqui es donde lo deje 
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

let promesa = new Promise((resolver, rechazar)=>{

    resolver("si se pudo ")
})

