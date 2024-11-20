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

    const popup = document.getElementById("popup");
    const popupDetails = document.getElementById("popup-details");
    const closePopupButton = document.querySelector(".close-popup");

    // Abrir popup
    document.querySelectorAll(".popup-trigger").forEach(trigger => {
        trigger.addEventListener("click", async (e) => {
            e.preventDefault();
            const projectName = trigger.dataset.project; // Nombre del proyecto
            const project = document.getElementById(projectName); // Referencia al project-item

            // Evitar que se oculte el project-item
            if (project) {
                project.classList.add("fixed"); // Añadimos clase para bloquear cambios de posición
            }

            // Cargar contenido HTML del archivo correspondiente
            try {
                const response = await fetch(`${projectName}.html`);
                if (!response.ok) throw new Error("No se pudo cargar el contenido del proyecto.");
                const content = await response.text();
                popupDetails.innerHTML = content; // Insertar el contenido cargado
                popup.classList.add("visible");
            } catch (error) {
                popupDetails.innerHTML = `<p>Error: ${error.message}</p>`;
                popup.classList.add("visible");
            }
        });
    });

    // Cerrar popup
    closePopupButton.addEventListener("click", () => {
        popup.classList.remove("visible");
        document.querySelectorAll(".project-item.fixed").forEach(item => item.classList.remove("fixed")); // Restaurar clases
    });

    // Cerrar popup al hacer clic fuera del contenido
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("visible");
            document.querySelectorAll(".project-item.fixed").forEach(item => item.classList.remove("fixed")); // Restaurar clases
        }
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

function validateLink(linkId) {
    // Evita el comportamiento predeterminado del enlace
    event.preventDefault();

    // Obtiene el elemento del enlace usando el ID
    const linkElement = document.getElementById(linkId);
    if (!linkElement) {
        alert("El enlace no está disponible actualmente.");
        return;
    }

    // Obtiene la URL del atributo href
    const linkUrl = linkElement.getAttribute("href");

    // Comprueba si el href está vacío
    if (!linkUrl || linkUrl.trim() === "") {
        alert("El enlace no está disponible actualmente.");
        return;
    }

    window.open(linkUrl, '_blank');

    /*
    // Valida si el enlace está disponible
    fetch(linkUrl, { method: "HEAD" })
        .then(response => {
            if (response.ok) {
                // Si está disponible, abre en una nueva pestaña
                window.open(linkUrl, '_blank');
            } else {
                // Si el enlace no está disponible, muestra un mensaje
                alert("El enlace no está disponible actualmente.");
            }
        })
        .catch(() => {
            // Muestra un mensaje en caso de error
            alert("Hubo un error al intentar validar el enlace. Por favor, inténtalo más tarde.");
        });
        */
}