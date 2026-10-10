/* Barra de navegación común a todas las páginas. */
(function () {
    var page = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
    var links = [
        ['index', 'index.html', 'Itinerario', '🗺'],
        ['votar', 'votar.html', 'Votar', '🗳'],
        ['resultados', 'resultados.html', 'Resultados', '📊']
    ];
    var nav = document.createElement('nav');
    nav.className = 'topnav';
    nav.setAttribute('aria-label', 'Secciones');
    nav.innerHTML = '<span class="brand">JAPÓN 2027</span>' + links.map(function (l) {
        return '<a href="' + l[1] + '"' + (l[0] === page ? ' class="on" aria-current="page"' : '') + '><span aria-hidden="true">' + l[3] + '</span> ' + l[2] + '</a>';
    }).join('');
    document.body.insertBefore(nav, document.body.firstChild);
})();
