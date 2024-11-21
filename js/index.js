document.addEventListener("DOMContentLoaded", () => {
    AOS.init();

    const toggleButton = document.getElementById("toggle-description");
    const descriptionSection = document.getElementById("description");

    hideProjects();

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
        event.preventDefault();

        const fileUrl = downloadLink.getAttribute("href");

        fetch(fileUrl, { method: "HEAD" })
            .then(response => {
                if (response.ok) {
                    window.open(fileUrl, '_blank');

                    const tempLink = document.createElement('a');
                    tempLink.href = fileUrl;
                    tempLink.download = '';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                } else {
                    alert("En estos momentos, el documento no está disponible para descargar.");
                }
            })
            .catch(() => {
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
            const projectName = trigger.dataset.project; 
            const project = document.getElementById(projectName); 

            // Evitar hover y touch temporalmente
            if (project) {
                project.classList.add("no-hover"); 
            }

            try {
                const response = await fetch(`${projectName}.html`);
                if (!response.ok) throw new Error("No se pudo cargar el contenido del proyecto.");
                const content = await response.text();
                popupDetails.innerHTML = content; 
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
        restoreProjectItems();
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("visible");
            restoreProjectItems();
        }
    });

    function restoreProjectItems() {
        document.querySelectorAll('.project-item').forEach(item => {
            item.classList.remove("fixed", "no-hover");
        });
        hideProjects();
    }
});

function hideProjects() {
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
    const positionValue = anchoImagen - itemWidth;

    if (positionType === 'left') {
        item.style.left = `${positionValue}px`;
    } else if (positionType === 'right') {
        item.style.right = `${positionValue}px`;
    }

    item.addEventListener('mouseenter', function () {
        if (!item.classList.contains("no-hover")) {
            item.style.transition = 'all 1.5s ease';
            updateProjectItem(item, positionType, '0');
        }
    });
    item.addEventListener('mouseleave', function () {
        if (!item.classList.contains("no-hover")) {
            item.style.transition = 'all 2s ease';
            updateProjectItem(item, positionType, `${positionValue}px`);
        }
    });

    item.addEventListener('touchstart', function () {
        if (!item.classList.contains("no-hover")) {
            item.style.transition = 'all 1.5s ease';
            updateProjectItem(item, positionType, '0');
        }
    });
    item.addEventListener('touchend', function () {
        if (!item.classList.contains("no-hover")) {
            item.style.transition = 'all 2s ease';
            updateProjectItem(item, positionType, `${positionValue}px`);
        }
    });
}

function updateProjectItem(item, positionType, positionValue) {
    if (positionType === 'left') {
        item.style.left = positionValue;
    } else if (positionType === 'right') {
        item.style.right = positionValue;
    }
}