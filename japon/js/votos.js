/*
 * Estado y lógica de votos compartida por votar.html y resultados.html.
 *
 * Formato de cada voto (state.data[viajero].votes[idDecision]):
 *   mode 'one'          -> id de la opción elegida, o '*' (me da igual)
 *   mode 'many'/'split' -> cadena con un carácter por opción:
 *                          'y' = sí, 't' = si sobra tiempo (solo split), 'n' = paso
 * Una decisión sin clave todavía no está respondida.
 */
(function (w) {
    'use strict';
    var J = w.JAPON;
    var KEY = 'japon2027-votos-v3';
    var ANY = '*';

    var state = load();

    function blank() { return { me: null, data: {} }; }
    function load() {
        try {
            var s = JSON.parse(localStorage.getItem(KEY));
            if (s && typeof s === 'object' && s.data) return s;
        } catch (e) {}
        return blank();
    }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function who(i) { return J.TRAVELERS[i]; }
    function bucket(i) {
        if (!state.data[i]) state.data[i] = { votes: {}, ideas: {} };
        return state.data[i];
    }
    function dec(id) { return J.DECISIONS.filter(function (d) { return d.id === id; })[0]; }
    function vote(i, d) { return state.data[i] ? state.data[i].votes[d.id] : undefined; }
    function answered(i, d) { return vote(i, d) !== undefined; }
    function progress(i) { return J.DECISIONS.filter(function (d) { return answered(i, d); }).length; }
    function idea(i, d) { return (state.data[i] && state.data[i].ideas[d.id]) || ''; }

    function setMe(i) { state.me = i; save(); }
    function setOne(d, optId) { bucket(state.me).votes[d.id] = optId; save(); }
    function setLevel(d, optIdx, level) {
        var b = bucket(state.me), cur = b.votes[d.id];
        var arr = (typeof cur === 'string' && cur.length === d.opts.length) ? cur.split('') : d.opts.map(function () { return 'n'; });
        arr[optIdx] = level;
        b.votes[d.id] = arr.join('');
        save();
    }
    function passAll(d) {
        bucket(state.me).votes[d.id] = d.mode === 'one' ? ANY : d.opts.map(function () { return 'n'; }).join('');
        save();
    }
    function setIdea(d, text) {
        var b = bucket(state.me);
        if (text.trim()) b.ideas[d.id] = text.slice(0, 280); else delete b.ideas[d.id];
        save();
    }
    function clearMine() { state.data[state.me] = { votes: {}, ideas: {} }; save(); }

    // Resultado de una decisión: por opción, qué viajeros dijeron sí (y) y si sobra tiempo (t)
    function tally(d) {
        var res = { opts: d.opts.map(function () { return { y: [], t: [] }; }), voters: [], any: [] };
        J.TRAVELERS.forEach(function (_, i) {
            var v = vote(i, d);
            if (v === undefined) return;
            res.voters.push(i);
            if (d.mode === 'one') {
                if (v === ANY) { res.any.push(i); return; }
                d.opts.forEach(function (o, k) { if (o.id === v) res.opts[k].y.push(i); });
            } else {
                String(v).split('').forEach(function (c, k) {
                    if (res.opts[k] && c === 'y') res.opts[k].y.push(i);
                    if (res.opts[k] && c === 't') res.opts[k].t.push(i);
                });
            }
        });
        return res;
    }

    // --- Compartir: cada viajero exporta SOLO sus votos como un código corto ---
    function b64enc(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
    function b64dec(s) {
        s = s.replace(/-/g, '+').replace(/_/g, '/');
        while (s.length % 4) s += '=';
        return decodeURIComponent(escape(atob(s)));
    }
    function exportCode(i) {
        var b = state.data[i] || { votes: {}, ideas: {} };
        return b64enc(JSON.stringify({ k: 3, i: i, v: b.votes, d: b.ideas }));
    }
    function shareUrl(i) {
        if (!/^https?:$/.test(location.protocol)) return null;
        var base = location.href.split('#')[0].replace(/[^\/]*$/, '');
        return base + 'resultados.html#v=' + exportCode(i);
    }

    // Acepta un enlace, un código suelto o varios pegados juntos. Devuelve [{ok, name, n}]
    function importText(text) {
        // Ignora las palabras del mensaje de WhatsApp: solo enlaces con v= o códigos largos
        var tokens = String(text).split(/\s+/).filter(function (t) { return /v=[A-Za-z0-9_\-]{20,}/.test(t) || /^[A-Za-z0-9_\-]{40,}$/.test(t); }), out = [];
        if (!tokens.length) return [{ ok: false, name: 'texto' }];
        tokens.forEach(function (tok) {
            var m = tok.match(/v=([A-Za-z0-9_\-]+)/);
            var code = m ? m[1] : tok;
            try {
                var p = JSON.parse(b64dec(code));
                if (p.k !== 3 || typeof p.i !== 'number' || p.i < 0 || p.i >= J.TRAVELERS.length) throw new Error('formato');
                var votes = {}, ideas = {};
                J.DECISIONS.forEach(function (d) {
                    var v = p.v && p.v[d.id];
                    if (typeof v !== 'string') return;
                    if (d.mode === 'one') {
                        if (v === ANY || d.opts.some(function (o) { return o.id === v; })) votes[d.id] = v;
                    } else if (v.length === d.opts.length && /^[ynt]+$/.test(v)) {
                        votes[d.id] = d.mode === 'many' ? v.replace(/t/g, 'n') : v;
                    }
                    if (p.d && typeof p.d[d.id] === 'string' && p.d[d.id].trim()) ideas[d.id] = p.d[d.id].slice(0, 280);
                });
                state.data[p.i] = { votes: votes, ideas: ideas };
                out.push({ ok: true, name: who(p.i).name, n: Object.keys(votes).length });
            } catch (e) {
                out.push({ ok: false, name: tok.slice(0, 12) + '…' });
            }
        });
        save();
        return out;
    }

    function copy(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return false; });
        }
        return Promise.resolve(false);
    }

    var toastTimer;
    function toast(msg) {
        var t = document.getElementById('toast');
        if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
        t.textContent = msg; t.classList.add('show');
        clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3000);
    }

    function avatar(i, small) {
        var t = who(i);
        return '<span class="av' + (small ? ' sm' : '') + '" style="background:' + t.color + '" title="' + esc(t.name) + '">' + esc(t.name.charAt(0).toUpperCase()) + '</span>';
    }
    function names(list) { return list.map(function (i) { return esc(who(i).name); }).join(', '); }
    function modeLabel(d) { return d.mode === 'split' ? 'Cada uno a lo suyo' : 'Decidimos juntos'; }

    w.Votos = {
        J: J, state: state, ANY: ANY, esc: esc, who: who, dec: dec, vote: vote, answered: answered,
        progress: progress, idea: idea, setMe: setMe, setOne: setOne, setLevel: setLevel,
        passAll: passAll, setIdea: setIdea, clearMine: clearMine, tally: tally, exportCode: exportCode,
        shareUrl: shareUrl, importText: importText, copy: copy, toast: toast, avatar: avatar,
        names: names, modeLabel: modeLabel, save: save
    };
})(window);
