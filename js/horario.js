function init(){
    let horarioManana = document.getElementById("horarioManana");
    horarioManana.style.display = "none";
    let horarioTarde = document.getElementById("horarioTarde");
    horarioTarde.style.display = "none";
    alert("hola");
}

function mostrarHorarioManana(){
    let horarioManana = document.getElementById("horarioManana");
    if (horarioManana.style.display === "none") {
        horarioManana.style.display = "table";
    } else {
        horarioManana.style.display = "none";
    }
}

function mostrarHorarioTarde(){
    let horarioTarde = document.getElementById("horarioTarde");
    if (horarioTarde.style.display === "none") {
        horarioTarde.style.display = "table";
    } else {
        horarioTarde.style.display = "none";
    }
}