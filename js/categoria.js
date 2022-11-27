var categorias = ["Micro", 
    "Pre benjamin", 
    "Benjamin", 
    "Alevin",
    "Infantil",
    "Cadete",
    "Juvenil",
    "Senior",
    "Veterano"];

function calcularCategoria(){
    let edad = parseInt(document.getElementById("edadCategoria").value);
    
    if(isNaN(edad) || edad<0){
        document.getElementById("resultadoCategoria").innerHTML = "";
        document.getElementById("listaCategorias").innerHTML = "";
        alert("No has introducido la edad correctamente");
    }else{
        let index=0;
        switch(true){
            case edad<6:
                index=0;
                break;
            case edad>=6 && edad<8:
                index=1;
                break;
            case edad>=8 && edad<10:
                index=2;
                break;
            case edad>=10 && edad<12:
                index=3;
                break;
            case edad>=12 && edad<14:
                index=4;
                break;
            case edad>=14 && edad<16:
                index=5;
                break;
            case edad>=16 && edad<19:
                index=6;
                break;
            case edad>=19 && edad<40:
                index=7;
                break;
            case edad>40:
                index=8;
                break;
            default:
                index=-1;
                break;
        }

        document.getElementById("resultadoCategoria").innerHTML = (index>=0)? categorias[index]:"Error: Sin Categoría";
    
        let listadoCategorias = "<fieldset>";
        categorias.forEach(function(categoria, indice, array) {
            if(indice==index){
                listadoCategorias += "<p style='font-style: italic;'>"+categoria+"</p>";
            }else listadoCategorias += "<p style='color: white !important;'>"+categoria+"</p>";
        });
        listadoCategorias += "</fieldset>";
        console.log(listadoCategorias);

        document.getElementById("listaCategorias").innerHTML = listadoCategorias;
    }
}