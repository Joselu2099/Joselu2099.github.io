document.addEventListener("DOMContentLoaded", () => {
    AOS.init();

    const toggleButton = document.getElementById("toggle-description");
    const descriptionSection = document.getElementById("description");

    hideProyects();

    toggleButton.addEventListener("click", () => {
        if (descriptionSection.style.display === "block") {
            descriptionSection.style.display = "none";
            toggleButton.innerHTML = '<span class="flecha-desc">&#x25BC;</span>';
        } else {
            descriptionSection.style.display = "block";
            toggleButton.innerHTML = '<span class="flecha-desc">&#x25B2;</span>';
        }
    });

    window.addEventListener("scroll", () => {
        const rect = descriptionSection.getBoundingClientRect();
        if (rect.bottom < 0 && descriptionSection.style.display === "block") {
            descriptionSection.style.display = "none";
            toggleButton.innerHTML = '<span class="flecha-desc">&#x25BC;</span>';
        }
    });

    const downloadLink = document.getElementById("download-link");

    downloadLink.addEventListener("click", (event) => {
        event.preventDefault(); // Evita la acción predeterminada del enlace

        const fileUrl = downloadLink.getAttribute("href");

        // Verifica si el archivo está disponible
        fetch(fileUrl, { method: "HEAD" })
            .then(response => {
                if (response.ok) {
                    // Abrir en una nueva pestaña
                    window.open(fileUrl, '_blank');

                    // Crear un enlace de descarga manualmente
                    const tempLink = document.createElement('a');
                    tempLink.href = fileUrl;
                    tempLink.download = ''; // Asigna un nombre de archivo si es necesario
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                } else {
                    // Si no está disponible, muestra un mensaje
                    alert("En estos momentos, el documento no está disponible para descargar.");
                }
            })
            .catch(() => {
                // Muestra un mensaje si hay un error en la solicitud
                alert("Hubo un problema al intentar descargar el documento. Por favor, inténtalo más tarde.");
            });
    });
});

function hideProyects() {
    // Obtener el ancho del elemento izquierdo y derecho
    const leftItems = document.querySelectorAll('.project-item.left');
    const rightItems = document.querySelectorAll('.project-item.right');

    leftItems.forEach(leftItem => {
        adjustPosition(leftItem, 'left');
    });
    
    rightItems.forEach(rightItem => {
        adjustPosition(rightItem, 'right');
    });
}

function adjustPosition(item, positionType) {
    const anchoImagen = 130;
    const itemWidth = item.offsetWidth;
    const positionValue = anchoImagen-itemWidth; // Ancho del objeto más 150px

    // Dependiendo de si es "left" o "right", aplicar la posición correcta
    if (positionType === 'left') {
        item.style.left = `${positionValue}px`;
    } else if (positionType === 'right') {
        item.style.right = `${positionValue}px`;
    }

    // Eventos para ratón
    item.addEventListener('mouseenter', function() {
        item.style.transition = 'all 1.5s ease';
        updateProjectItem(item, positionType, '0');
    });
    item.addEventListener('mouseleave', function() {
        item.style.transition = 'all 2s ease';
        updateProjectItem(item, positionType, `${positionValue}px`);
    });

    // Eventos para pantallas táctiles
    item.addEventListener('touchstart', function() {
        item.style.transition = 'all 1.5s ease';
        updateProjectItem(item, positionType, '0');
    });
    item.addEventListener('touchend', function() {
        item.style.transition = 'all 2s ease';
        updateProjectItem(item, positionType, `${positionValue}px`);
    });
}

function updateProjectItem(item, positionType, positionValue) {
    if (positionType === 'left') {
        item.style.left = positionValue; 
    } else if (positionType === 'right') {
        item.style.right = positionValue;
    }
}