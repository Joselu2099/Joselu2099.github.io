function calcularFCM(){
    let edad = document.getElementById("edadFCM").value==""? null:parseInt(document.getElementById("edadFCM").value);
    let sexo = document.getElementById("sexo").value==0? null:parseInt(document.getElementById("sexo").value);

    if(edad==null || sexo==null){
        document.getElementById("resultadoFCM").innerHTML = "";
        document.getElementById("clasificacionFCM").innerHTML = "";
        alert("No has escrito o seleccionado valores correctos en edad o sexo"); 
    }else{
        let resultado=NaN;
        if(sexo===1){
            resultado=220-edad;
        }else if(sexo===2){
            resultado=226-edad;
        }
        document.getElementById("resultadoFCM").innerHTML = resultado;
        document.getElementById("clasificacionFCM").innerHTML ="<fieldset><p id='fcm'>Zona de recuperación:<br><span>"+(resultado*0.6).toFixed(2)+"-"+(resultado*0.7).toFixed(2)+"</span></p>"
            +"<p id='fcm'>Zona de aeróbica:<br><span>"+(resultado*0.7).toFixed(2)+"-"+(resultado*0.8).toFixed(2)+"</span></p>"
            +"<p id='fcm'>Zona de anaeróbica:<br><span>"+(resultado*0.8).toFixed(2)+"-"+(resultado*0.9).toFixed(2)+"</span></p>"
            +"<p id='fcm'>Linea roja:<br><span>"+(resultado*0.9).toFixed(2)+"-"+(resultado).toFixed(2)+"</span></p></fieldset>";
    }
}