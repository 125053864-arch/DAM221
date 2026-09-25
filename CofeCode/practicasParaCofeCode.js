let readline = require('readline');

let teclado = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

let manzanas = [
    { color: "roja", cantidad: 5 },
    { color: "verde", cantidad: 8 },
    { color: "amarilla", cantidad: 3 },
    { color: "rosa", cantidad: 6 }
];
let cafe= [];



function revisarManzanas() {
    return new Promise((resolve, reject) => {

        console.log("Revisando manzanas...");

        setTimeout(() => {
        console.log("Pasaron 3 segundos");

        if (manzanas.length > 0) {
                resolve(manzanas);
            } else {
                reject("No hay manzanas");
            }


    }, 3000);


            

        
    });
}


revisarManzanas()

    .then((resultado) => {
        console.log("¡Revisión terminada!");
        console.log(resultado);
    })
    .catch((error) => {
        console.log("Ocurrió un error:", error);
    });




function randomaizer(){
let numero = Math.floor(Math.random() * 2) + 1;
    
if (numero === 1) {
    console.log("Salió uno");
}

if (numero === 2) {
    console.log("Salió dos");

}

}

randomaizer();

function PreparandoCafe(){
    return new Promise((siCafe,Nocafe)=>{

        teclado.question("Que cafe es ", function(intentocafe){

        let cafes= {
            producto: intentocafe,
            precio: 10

        };

        cafe.push(cafes);
        

    
        console.log("haciendo cafe")

        if(cafe.length>0){
            siCafe(cafe);
        }else {
            Nocafe("No hay cafe");
        }
    });
 });

}

PreparandoCafe()
    .then((resultado1) => {
        console.log("¡Revisión terminada!",
        resultado1);
        
    })
    .catch((error1) => {
        console.log("Ocurrió un error:", error1);
    });

    
