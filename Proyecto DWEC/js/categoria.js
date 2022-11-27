function calcularCategoria(){
    let edad = parseInt(document.getElementById("edadCategoria").value);
    
    if(isNaN(edad)) alert("No has introducido la edad correctamente");
    else{
        if(edad<6) document.getElementById("resultadoCategoria").innerHTML = "Micro";
        if(edad>=6 && edad<8) document.getElementById("resultadoCategoria").innerHTML = "Pre benjamin";
        if(edad>=8 && edad<10) document.getElementById("resultadoCategoria").innerHTML = "Benjamin";
        if(edad>=10 && edad<12) document.getElementById("resultadoCategoria").innerHTML = "Alevin ";
        if(edad>=12 && edad<14) document.getElementById("resultadoCategoria").innerHTML = "Infantil ";
        if(edad>=14 && edad<16) document.getElementById("resultadoCategoria").innerHTML = "Cadete";
        if(edad>=16 && edad<19) document.getElementById("resultadoCategoria").innerHTML = "Juvenil";
        if(edad>=19 && edad<40) document.getElementById("resultadoCategoria").innerHTML = "Senior";
        if(edad>40) document.getElementById("resultadoCategoria").innerHTML = "Veterano ";
    }
}