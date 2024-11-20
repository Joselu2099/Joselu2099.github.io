// Cargar el historial de contraseñas desde localStorage, si existe
const historial = JSON.parse(localStorage.getItem('historialContrasenas')) || [];

function validatePassLenght() {
    const longitudInput = document.getElementById("passlength").value;
    if(longitudInput < 8) {
        document.getElementById("passlength").value = 8;
    }
}

// Función para generar una contraseña única
function generarContrasena() {
    const letras = "abcdefghijklmnopqrstuvwxyz";
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const caracteresEspeciales = "!@#$%^&*";

    let nuevaContrasena;

    // Obtener valores del formulario
    const concepto = document.getElementById("concept").value.trim();
    const longitudInput = document.getElementById("passlength").value;
    const incluirEspeciales = document.getElementById("specialCharacters").checked;
    const incluirMayusculas = document.getElementById("capitalLetters").checked;
    const longitud = longitudInput ? parseInt(longitudInput, 10) : 8; // Longitud predeterminada: 8

    // Número mínimo de letras (al menos la mitad de la longitud)
    const letrasMinimas = Math.ceil(longitud / 2);

    // Inicializar las variables
    let contrasenaArray = [];

    // Base para la contraseña
    let base = "";

    // Si hay un concepto, usarlo como base dinámica
    if (concepto) {
        base = concepto.replace(/[^a-zA-Z0-9]/g, ""); // Limpiar concepto
    }

    // Calcular el espacio restante para completar la longitud total de la contraseña
    let caracteresRestantes = longitud - base.length;
    let letrasGeneradas = 0;
    let numCount = 0;

    // Agregar letras (mínimo la mitad de la longitud)
    while (letrasGeneradas < letrasMinimas && caracteresRestantes > 0) {
        let pool = letras;
        if (incluirMayusculas && Math.random() < 0.5) {
            pool += mayusculas; // Añadir mayúsculas si está marcado
        }
        const randomChar = pool.charAt(Math.floor(Math.random() * pool.length));
        contrasenaArray.push(randomChar);
        letrasGeneradas++;
        caracteresRestantes--;
    }

    // Aseguramos que haya al menos un número
    if (caracteresRestantes > 0) {
        const randomNum = numeros.charAt(Math.floor(Math.random() * numeros.length));
        contrasenaArray.push(randomNum);
        numCount++;
        caracteresRestantes--;
    }

    // Aseguramos que haya un carácter especial si está marcado
    if (incluirEspeciales && caracteresRestantes > 0) {
        const randomEspecial = caracteresEspeciales.charAt(Math.floor(Math.random() * caracteresEspeciales.length));
        contrasenaArray.push(randomEspecial);
        caracteresRestantes--;
    }

    // Rellenar el resto con letras o números aleatorios
    while (caracteresRestantes > 0) {
        let pool = letras + numeros; // Se rellena con letras y números
        if (incluirMayusculas) pool += mayusculas; // Añadir mayúsculas si está marcado
        if (incluirEspeciales) pool += caracteresEspeciales; // Añadir especiales si está marcado

        const randomChar = pool.charAt(Math.floor(Math.random() * pool.length));
        contrasenaArray.push(randomChar);
        caracteresRestantes--;
    }

    // Si hay un concepto, incluirlo al inicio de la contraseña (si cabe)
    contrasenaArray = [...base.split(''), ...contrasenaArray];

    // Mezclar los caracteres de la contraseña
    nuevaContrasena = mezclarCaracteres(contrasenaArray);

    // Verificar que la longitud sea correcta
    if (nuevaContrasena.length === longitud && numCount >= 1) {
        // Agregar la contraseña al historial
        historial.push(nuevaContrasena);

        // Guardar el historial en localStorage
        localStorage.setItem('historialContrasenas', JSON.stringify(historial));

        // Mostrar la contraseña generada
        document.getElementById("contrasenia").innerText = nuevaContrasena;
    } else {
        // Si por alguna razón no cumple con las condiciones, volver a intentar
        generarContrasena();
    }
}

// Función para intercalar caracteres de manera variada
function mezclarCaracteres(contrasenaArray) {
    const mezcla = [];
    const totalLength = contrasenaArray.length;
    
    // Mientras haya caracteres para mezclar
    while (contrasenaArray.length) {
        const randomIndex = Math.floor(Math.random() * contrasenaArray.length);
        mezcla.push(contrasenaArray[randomIndex]);
        contrasenaArray.splice(randomIndex, 1); // Elimina el carácter del array original
    }

    return mezcla.join('');
}

// Función para verificar similitud con contraseñas previas
function esParecida(contrasena) {
    for (let previa of historial) {
        if (calcularSimilitud(contrasena, previa) > 0.6) { // Similitud > 60%
            return true;
        }
    }
    return false;
}

// Función para calcular similitud entre dos cadenas (proporción de caracteres iguales)
function calcularSimilitud(str1, str2) {
    const longitud = Math.min(str1.length, str2.length);
    let coincidencias = 0;

    for (let i = 0; i < longitud; i++) {
        if (str1[i] === str2[i]) {
            coincidencias++;
        }
    }

    return coincidencias / longitud;
}