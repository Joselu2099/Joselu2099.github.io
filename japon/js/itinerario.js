/* Itinerario: añade a cada día un aviso discreto de lo que se vota ese día. */
(function () {
    var days = document.querySelectorAll('.timeline .day');
    window.JAPON.DECISIONS.forEach(function (d) {
        var host = days[d.day] && days[d.day].querySelector('.day-content');
        if (!host) return;
        var wrap = host.querySelector('.vote-links');
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.className = 'vote-links';
            host.appendChild(wrap);
        }
        var a = document.createElement('a');
        a.className = 'vote-chip' + (d.mode === 'split' ? ' split' : '');
        a.href = 'votar.html#d=' + d.id;
        a.textContent = '🗳 Se vota: ' + d.title;
        wrap.appendChild(a);
    });
    if (location.hash && document.querySelector(location.hash)) document.querySelector(location.hash).scrollIntoView();
})();
