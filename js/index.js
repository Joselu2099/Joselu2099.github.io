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
});

function hideProyects() {
    // Obtener el ancho del elemento izquierdo y derecho
    const anchoImagen = 130;
    const leftItems = document.querySelectorAll('.project-item.left');
    const rightItems = document.querySelectorAll('.project-item.right');

    // Función para aplicar el estilo dinámico
    function adjustPosition(items, positionType) {
        items.forEach(item => {
            const itemWidth = item.offsetWidth;
            const positionValue = anchoImagen-itemWidth; // Ancho del objeto más 150px

            // Dependiendo de si es "left" o "right", aplicar la posición correcta
            if (positionType === 'left') {
                item.style.left = `${positionValue}px`;
            } else if (positionType === 'right') {
                item.style.right = `${positionValue}px`;
            }

            // Evento para cuando el ratón entre en el elemento
            item.addEventListener('mouseenter', function() {
                item.style.transition = 'all 1.5s ease';
                if (positionType === 'left') {
                    item.style.left = '0'; // Eliminar el desplazamiento izquierdo
                } else if (positionType === 'right') {
                    item.style.right = '0'; // Eliminar el desplazamiento derecho
                }
            });

            // Evento para cuando el ratón salga del elemento
            item.addEventListener('mouseleave', function() {
                item.style.transition = 'all 1.5s ease';
                if (positionType === 'left') {
                    item.style.left = `${positionValue}px`; // Volver a la posición original
                } else if (positionType === 'right') {
                    item.style.right = `${positionValue}px`; // Volver a la posición original
                }
            });
        });
    }

    // Ajustar posiciones para los elementos 'left' y 'right'
    adjustPosition(leftItems, 'left');
    adjustPosition(rightItems, 'right');
}

function showProyect(idProyect) {
    leftItem.style.left = `${0}px`;
    rightItem.style.right = `${0}px`;
}