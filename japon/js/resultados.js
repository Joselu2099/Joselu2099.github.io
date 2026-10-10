/* Resultados: recuento por decisión, quién va dónde, ideas y plan en texto. */
(function () {
    'use strict';
    var V = window.Votos, J = V.J, D = J.DECISIONS, esc = V.esc;
    var filter = 'all';

    function importFrom(text) {
        var r = V.importText(text);
        var ok = r.filter(function (x) { return x.ok; });
        if (ok.length) V.toast('Importado: ' + ok.map(function (x) { return x.name; }).join(', '));
        if (r.length - ok.length) V.toast('Hay ' + (r.length - ok.length) + ' código(s) no válido(s).');
        render();
    }

    function peopleHTML() {
        return J.TRAVELERS.map(function (t, i) {
            var n = V.progress(i), done = n === D.length;
            return '<div class="person' + (done ? ' done' : '') + '" style="--c:' + t.color + '">' + V.avatar(i) +
                '<span class="p-name">' + esc(t.name) + '</span><span class="p-n">' + (done ? '✓ completo' : n + '/' + D.length) + '</span>' +
                '<span class="p-bar"><i style="width:' + Math.round(n / D.length * 100) + '%"></i></span></div>';
        }).join('');
    }

    function leaders(d, t) {
        var max = 0;
        t.opts.forEach(function (o) { max = Math.max(max, o.y.length); });
        return max ? t.opts.map(function (o, k) { return o.y.length === max ? k : -1; }).filter(function (k) { return k >= 0; }) : [];
    }
    function majority(t) {
        return t.opts.map(function (o, k) { return t.voters.length && o.y.length * 2 > t.voters.length ? k : -1; }).filter(function (k) { return k >= 0; });
    }

    function cardHTML(d) {
        var t = V.tally(d), nv = t.voters.length;
        var h = '<article class="res"><div class="res-head"><span class="badge' + (d.mode === 'split' ? ' split' : '') + '">' + V.modeLabel(d).toUpperCase() + '</span>' +
            '<span class="res-day">Día ' + d.day + '</span></div><h3>' + esc(d.title) + '</h3>';
        if (!nv) h += '<p class="hint">Sin votos todavía.</p>';
        else if (d.mode === 'split') {
            d.opts.forEach(function (o, k) {
                var r = t.opts[k];
                h += '<div class="res-opt"><div class="res-name">' + esc(o.name) + '</div>' +
                    '<div class="res-who">' + (r.y.length ? '<span class="yes">✓ ' + V.names(r.y) + '</span>' : '<span class="none">Nadie</span>') +
                    (r.t.length ? '<span class="maybe">⏱ si sobra: ' + V.names(r.t) + '</span>' : '') + '</div></div>';
            });
            if (d.meet) h += '<p class="meet">🤝 ' + esc(d.meet) + '</p>';
        } else {
            var lead = d.mode === 'one' ? leaders(d, t) : majority(t);
            d.opts.forEach(function (o, k) {
                var r = t.opts[k], pct = Math.round(r.y.length / nv * 100);
                h += '<div class="res-opt' + (lead.indexOf(k) >= 0 ? ' lead' : '') + '"><div class="res-name">' + esc(o.name) +
                    '<span class="res-n">' + r.y.length + '/' + nv + '</span></div><div class="bar"><i style="width:' + pct + '%"></i></div>' +
                    '<div class="res-who">' + (r.y.length ? V.names(r.y) : '') + '</div></div>';
            });
            if (t.any.length) h += '<p class="hint">Les da igual: ' + V.names(t.any) + '</p>';
            if (d.mode === 'one' && lead.length > 1) h += '<p class="warn">Empate: ' + lead.map(function (k) { return esc(d.opts[k].name); }).join(' y ') + '</p>';
        }
        if (nv && nv < J.TRAVELERS.length) h += '<p class="hint">Han votado ' + nv + ' de ' + J.TRAVELERS.length + '.</p>';
        return h + '</article>';
    }

    function ideasHTML() {
        var rows = [];
        D.forEach(function (d) {
            J.TRAVELERS.forEach(function (_, i) {
                var x = V.idea(i, d);
                if (x) rows.push('<li>' + V.avatar(i, true) + '<span><b>' + esc(V.who(i).name) + '</b> · Día ' + d.day + ' · ' + esc(d.title) + '<br>' + esc(x) + '</span></li>');
            });
        });
        return '<section class="panel"><h2>💡 Ideas propuestas</h2>' + (rows.length ? '<ul class="ideas">' + rows.join('') + '</ul>' : '<p class="hint">Todavía no hay ideas.</p>') + '</section>';
    }

    function planText() {
        var lines = ['PLAN JAPÓN 2027 (según votos)'];
        D.forEach(function (d) {
            var t = V.tally(d), line;
            if (!t.voters.length) line = 'sin votos';
            else if (d.mode === 'split') line = d.opts.map(function (o, k) {
                var r = t.opts[k]; if (!r.y.length && !r.t.length) return null;
                return o.name + ' [' + r.y.map(function (i) { return V.who(i).name; }).join(', ') + (r.t.length ? ' | si sobra: ' + r.t.map(function (i) { return V.who(i).name; }).join(', ') : '') + ']';
            }).filter(Boolean).join('; ') || 'nadie';
            else {
                var ks = d.mode === 'one' ? leaders(d, t) : majority(t);
                line = ks.length ? ks.map(function (k) { return d.opts[k].name + ' (' + t.opts[k].y.length + '/' + t.voters.length + ')'; }).join(d.mode === 'one' ? ' / EMPATE: ' : ' + ') : 'sin mayoría';
            }
            lines.push('Día ' + d.day + ' · ' + d.title + ': ' + line);
        });
        return lines.join('\n');
    }

    function render() {
        document.getElementById('people').innerHTML = peopleHTML();
        var list = document.getElementById('list');
        if (filter === 'ideas') { list.innerHTML = ideasHTML(); return; }
        var h = '';
        D.forEach(function (d) {
            if (filter === 'juntos' && d.mode === 'split') return;
            if (filter === 'split' && d.mode !== 'split') return;
            h += cardHTML(d);
        });
        list.innerHTML = '<div class="res-grid">' + h + '</div>' + (filter === 'all' ? ideasHTML() : '');
    }

    document.getElementById('btn-import').addEventListener('click', function () {
        var ta = document.getElementById('paste');
        if (!ta.value.trim()) return V.toast('Pega primero un enlace o código.');
        importFrom(ta.value); ta.value = '';
    });
    document.getElementById('btn-plan').addEventListener('click', function () {
        V.copy(planText()).then(function (ok) { V.toast(ok ? 'Plan copiado.' : 'No se pudo copiar automáticamente.'); });
    });
    document.querySelector('.tabs').addEventListener('click', function (e) {
        var b = e.target.closest('.tab'); if (!b) return;
        filter = b.dataset.f;
        document.querySelectorAll('.tab').forEach(function (x) { x.classList.toggle('on', x === b); });
        render();
    });

    if (/v=/.test(location.hash)) {
        var h = location.hash;
        try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
        importFrom(h);
    } else render();
})();
