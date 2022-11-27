function calcularIMC(){
    let peso = document.getElementById("peso").value==""? null:parseFloat(document.getElementById("peso").value);
    let altura = document.getElementById("altura").value==""? null:parseFloat(document.getElementById("altura").value);

    if(peso==null || altura==null) alert("No has escrito valores correctos en peso o altura");
    else{
        let resultado = (peso/Math.pow(altura,2)).toFixed(2);
        document.getElementById("resultadoIMC").innerHTML = resultado+"<br>";
        if(resultado<16.00) document.getElementById("clasificacionIMC").innerHTML = "<p>Infrapeso (delgadez severa)</p>";
        if(resultado>=16.00 && resultado<=16.99) document.getElementById("clasificacionIMC").innerHTML = "<p>Infrapeso (delgadez moderada)</p>";
        if(resultado>=17.00 && resultado<=18.49) document.getElementById("clasificacionIMC").innerHTML = "<p>Infrapeso (delgadez aceptable)</p>";
        if(resultado>=18.50 && resultado<=24.99) document.getElementById("clasificacionIMC").innerHTML = "<p>Peso normal</p>";
        if(resultado>=25.00 && resultado<=29.99) document.getElementById("clasificacionIMC").innerHTML = "<p>Sobrepeso</p>";
        if(resultado>=30.00 && resultado<=34.99) document.getElementById("clasificacionIMC").innerHTML = "<p>Obeso (Tipo I)</p>";
        if(resultado>=35.00 && resultado<=40.00) document.getElementById("clasificacionIMC").innerHTML = "<p>Obeso (Tipo II)</p>";
        if(resultado>40.00) document.getElementById("clasificacionIMC").innerHTML = "<p>Obeso (Tipo III)</p>";
    }
}