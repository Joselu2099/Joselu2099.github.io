/* Asistente de votación: una decisión por pantalla. */
(function () {
    'use strict';
    var V = window.Votos, J = V.J, D = J.DECISIONS, esc = V.esc;
    var app = document.getElementById('app');
    var step = 'who';        // 'who' | índice de decisión | 'end'
    var fromEnd = false;     // true si se entró a editar desde el resumen final

    var entryHash = location.hash;  // se guarda: go() reescribe la URL
    function startStep() {
        var m = entryHash.match(/d=([\w-]+)/);
        entryHash = '';
        if (m) { var k = D.indexOf(V.dec(m[1])); if (k >= 0) return k; }
        for (var i = 0; i < D.length; i++) if (!V.answered(V.state.me, D[i])) return i;
        return 'end';
    }

    function go(s, fe) {
        step = s; fromEnd = !!fe;
        render();
        window.scrollTo(0, 0);
        try { history.replaceState(null, '', typeof s === 'number' ? '#d=' + D[s].id : location.pathname + location.search); } catch (e) {}
    }

    function render() {
        if (V.state.me === null || step === 'who') return renderWho();
        if (step === 'end') return renderEnd();
        return renderStep();
    }

    // ---------- ¿Quién eres? ----------
    function renderWho() {
        var h = '<section class="w-card slide"><span class="badge">VOTACIÓN</span><h1>¿Quién eres?</h1>' +
            '<p class="q">Son ' + D.length + ' pantallas, unos 2 minutos. Toca para elegir y puedes volver atrás cuando quieras.</p><div class="who-grid">';
        J.TRAVELERS.forEach(function (t, i) {
            var n = V.progress(i);
            h += '<button type="button" class="who" data-who="' + i + '" style="--c:' + t.color + '">' + V.avatar(i) +
                '<span class="who-name">' + esc(t.name) + '</span><span class="who-n">' + (n ? n + '/' + D.length : 'sin votar') + '</span></button>';
        });
        app.innerHTML = h + '</div></section>';
    }

    // ---------- Pantalla de decisión ----------
    function modeHint(d) {
        return d.mode === 'one' ? 'Elige una' : d.mode === 'many' ? 'Elige las que quieras' : 'Marca cada opción';
    }

    function optionsHTML(d) {
        var me = V.state.me, v = V.vote(me, d), h = '';
        if (d.mode === 'one') {
            d.opts.forEach(function (o) {
                h += '<button type="button" class="opt big' + (v === o.id ? ' on' : '') + '" data-opt="' + o.id + '" role="radio" aria-checked="' + (v === o.id) + '">' +
                    '<span class="mark radio"></span><span class="opt-body"><span class="opt-name">' + esc(o.name) + '</span>' +
                    '<span class="opt-desc">' + esc(o.desc) + '</span>' + (o.meta ? '<span class="opt-meta">' + esc(o.meta) + '</span>' : '') + '</span></button>';
            });
        } else if (d.mode === 'many') {
            d.opts.forEach(function (o, k) {
                var on = typeof v === 'string' && v.charAt(k) === 'y';
                h += '<button type="button" class="opt big' + (on ? ' on' : '') + '" data-k="' + k + '" role="checkbox" aria-checked="' + on + '">' +
                    '<span class="mark check"></span><span class="opt-body"><span class="opt-name">' + esc(o.name) + '</span>' +
                    '<span class="opt-desc">' + esc(o.desc) + '</span>' + (o.meta ? '<span class="opt-meta">' + esc(o.meta) + '</span>' : '') + '</span></button>';
            });
        } else {
            d.opts.forEach(function (o, k) {
                var c = typeof v === 'string' ? v.charAt(k) : '';
                h += '<div class="opt-row"><div class="opt-body"><span class="opt-name">' + esc(o.name) + '</span>' +
                    '<span class="opt-desc">' + esc(o.desc) + '</span>' + (o.meta ? '<span class="opt-meta">' + esc(o.meta) + '</span>' : '') + '</div>' +
                    '<div class="seg" role="group" aria-label="' + esc(o.name) + '">' +
                    seg(k, 'y', '✓ Quiero', c) + seg(k, 't', '⏱ Si sobra', c) + seg(k, 'n', '✕ Paso', c) + '</div></div>';
            });
        }
        return h;
    }
    function seg(k, lv, label, cur) {
        return '<button type="button" class="seg-b lv-' + lv + (cur === lv ? ' on' : '') + '" data-k="' + k + '" data-lv="' + lv + '" aria-pressed="' + (cur === lv) + '">' + label + '</button>';
    }

    function renderStep() {
        var d = D[step], me = V.state.me, t = J.TRAVELERS[me];
        var pct = Math.round(V.progress(me) / D.length * 100);
        var h = '<div class="w-top"><div class="w-prog"><i style="width:' + pct + '%"></i></div>' +
            '<div class="w-meta"><button type="button" class="chip-me" data-act="who" style="--c:' + t.color + '">' + V.avatar(me, true) + esc(t.name) + ' · cambiar</button>' +
            '<span class="w-count">' + (step + 1) + ' / ' + D.length + '</span></div></div>' +
            '<section class="w-card slide"><span class="badge' + (d.mode === 'split' ? ' split' : '') + '">' + V.modeLabel(d).toUpperCase() + '</span>' +
            '<h1>' + esc(d.title) + '</h1><div class="w-sub">Día ' + d.day + (d.time ? ' · ' + esc(d.time) : '') + ' · ' + modeHint(d) + '</div>' +
            '<p class="q">' + esc(d.q) + '</p>' +
            '<div id="opts" class="opts-list">' + optionsHTML(d) + '</div>' +
            (d.meet ? '<p class="meet">🤝 ' + esc(d.meet) + '</p>' : '') +
            '<details class="idea"' + (V.idea(me, d) ? ' open' : '') + '><summary>💡 Proponer otra idea</summary>' +
            '<textarea id="idea" maxlength="280" rows="3" placeholder="Escribe lo que te gustaría hacer...">' + esc(V.idea(me, d)) + '</textarea></details>' +
            '<a class="see-day" href="index.html#dia-' + d.day + '" target="_blank" rel="noopener">Ver el día en el itinerario ↗</a></section>' +
            '<footer class="w-bar"><button type="button" class="btn ghost" data-act="prev"' + (step === 0 && !fromEnd ? ' disabled' : '') + '>‹ Atrás</button>' +
            '<button type="button" class="btn ghost" data-act="pass">' + (d.mode === 'one' ? 'Me da igual' : 'Paso de todo') + '</button>' +
            '<button type="button" class="btn primary" data-act="next">' + (fromEnd ? 'Hecho' : step === D.length - 1 ? 'Terminar' : 'Siguiente ›') + '</button></footer>';
        app.innerHTML = h;
        refreshNext();
    }

    function refreshNext() {
        var b = app.querySelector('[data-act="next"]');
        if (b && typeof step === 'number') b.disabled = !V.answered(V.state.me, D[step]);
    }
    function refreshOptions() {
        document.getElementById('opts').innerHTML = optionsHTML(D[step]);
        refreshNext();
        var p = app.querySelector('.w-prog i');
        if (p) p.style.width = Math.round(V.progress(V.state.me) / D.length * 100) + '%';
    }
    function next() {
        if (fromEnd) return go('end');
        go(step + 1 < D.length ? step + 1 : 'end');
    }

    // ---------- Resumen final ----------
    function answerText(d) {
        var me = V.state.me, v = V.vote(me, d);
        if (v === undefined) return '<span class="warn">Sin responder</span>';
        if (d.mode === 'one') return v === V.ANY ? 'Me da igual' : esc(d.opts.filter(function (o) { return o.id === v; })[0].name);
        var parts = [];
        v.split('').forEach(function (c, k) { if (c === 'y') parts.push('✓ ' + esc(d.opts[k].name)); else if (c === 't') parts.push('⏱ ' + esc(d.opts[k].name)); });
        return parts.length ? parts.join(' · ') : 'Paso';
    }

    function renderEnd() {
        var me = V.state.me, t = J.TRAVELERS[me], n = V.progress(me), missing = D.length - n;
        var h = '<section class="w-card slide"><span class="badge">' + (missing ? 'CASI' : 'LISTO') + '</span>' +
            '<h1>' + (missing ? 'Faltan ' + missing + ' por responder' : '¡Listo, ' + esc(t.name) + '!') + '</h1>' +
            '<p class="q">Has votado ' + n + ' de ' + D.length + '. <b>Último paso:</b> envíanos tus votos al grupo para que se sumen al recuento.</p>' +
            '<div class="actions"><button type="button" class="btn primary big" data-act="wa">Enviar por WhatsApp</button>' +
            '<button type="button" class="btn big" data-act="copy">Copiar mis votos</button>' +
            '<a class="btn ghost big" href="resultados.html">Ver resultados</a></div>' +
            '<p class="hint" id="share-hint"></p>' +
            '<h2 class="sub">Tus respuestas</h2><ul class="summary-list">';
        D.forEach(function (d, i) {
            h += '<li><button type="button" class="sum-row" data-edit="' + i + '"><span class="sum-day">Día ' + d.day + '</span>' +
                '<span class="sum-main"><b>' + esc(d.title) + '</b><span>' + answerText(d) + '</span></span><span class="sum-edit">editar</span></button></li>';
        });
        app.innerHTML = h + '</ul><div class="actions foot"><button type="button" class="btn ghost" data-act="who">Cambiar de viajero</button>' +
            '<button type="button" class="btn ghost danger" data-act="clear">Borrar mis votos</button></div></section>';
        var hint = document.getElementById('share-hint');
        hint.textContent = V.shareUrl(V.state.me) ? 'Se enviará un enlace: quien lo abra importa tus votos automáticamente.' :
            'Estás en un archivo local: se enviará un código que hay que pegar en "Resultados".';
    }

    function shareText() {
        var me = V.state.me, url = V.shareUrl(me);
        return 'Mis votos para Japón 2027 (' + J.TRAVELERS[me].name + '): ' + (url || V.exportCode(me));
    }

    // ---------- Eventos ----------
    app.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.who !== undefined) { V.setMe(+b.dataset.who); return go(startStep()); }
        if (b.dataset.edit !== undefined) return go(+b.dataset.edit, true);
        var d = typeof step === 'number' ? D[step] : null;
        if (b.dataset.opt && d) {
            var first = !V.answered(V.state.me, d);
            V.setOne(d, b.dataset.opt); refreshOptions();
            if (first && !fromEnd && !app.querySelector('details.idea[open]')) setTimeout(function () { if (step === D.indexOf(d)) next(); }, 380);
            return;
        }
        if (b.dataset.lv && d) { V.setLevel(d, +b.dataset.k, b.dataset.lv); return refreshOptions(); }
        if (b.dataset.k !== undefined && d && d.mode === 'many') {
            var cur = V.vote(V.state.me, d), on = typeof cur === 'string' && cur.charAt(+b.dataset.k) === 'y';
            V.setLevel(d, +b.dataset.k, on ? 'n' : 'y'); return refreshOptions();
        }
        switch (b.dataset.act) {
            case 'who': return go('who');
            case 'prev': return fromEnd ? go('end') : go(step - 1);
            case 'next': return next();
            case 'pass': V.passAll(d); refreshOptions(); return next();
            case 'wa': window.open('https://wa.me/?text=' + encodeURIComponent(shareText()), '_blank', 'noopener'); return;
            case 'copy': return V.copy(shareText()).then(function (ok) { V.toast(ok ? 'Copiado. Pégalo en el grupo.' : 'No se pudo copiar automáticamente.'); });
            case 'clear': if (window.confirm('¿Borrar todos tus votos?')) { V.clearMine(); go(0); } return;
        }
    });
    app.addEventListener('input', function (e) {
        if (e.target.id === 'idea' && typeof step === 'number') V.setIdea(D[step], e.target.value);
    });

    go(V.state.me === null ? 'who' : startStep());
})();
