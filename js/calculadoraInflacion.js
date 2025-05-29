particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/gh/VincentGarreau/particles.js@master/demo/particles.json');

    let inflacionAnualActual = 0.022;
    let inflacionMedia5Anios = 0.025;

    fetch('https://api.estadistica.opendata.es/ipc')
      .then(response => response.json())
      .then(data => {
        inflacionAnualActual = data.actual / 100;
        inflacionMedia5Anios = data.media5 / 100;
        document.getElementById('ipcActual').textContent = (inflacionAnualActual * 100).toFixed(2) + '%';
        document.getElementById('ipcMedia').textContent = (inflacionMedia5Anios * 100).toFixed(2) + '%';
        calcularProducto();
        calcularHipoteca();
      })
      .catch(() => {
        document.getElementById('ipcActual').textContent = '2.2% (valor fijo)';
        document.getElementById('ipcMedia').textContent = '2.5% (valor fijo)';
      });

    const costeProducto = document.getElementById('costeProducto');
    const mesesProducto = document.getElementById('mesesProducto');
    const resultadoProducto = document.getElementById('resultadoProducto');

    const calcularProducto = () => {
      const total = parseFloat(costeProducto.value);
      const n = parseInt(mesesProducto.value);
      if (!total || !n) return resultadoProducto.textContent = '';
      const cuota = total / n;
      const inflacionMensual = Math.pow(1 + inflacionMedia5Anios, 1 / 12) - 1;
      let valorReal = 0;
      for (let i = 1; i <= n; i++) {
        valorReal += cuota / Math.pow(1 + inflacionMensual, i);
      }
      resultadoProducto.textContent = `Valor real ajustado por inflación: €${valorReal.toFixed(2)}`;
    };

    costeProducto.addEventListener('input', calcularProducto);
    mesesProducto.addEventListener('input', calcularProducto);

    const precioVivienda = document.getElementById('precioVivienda');
    const interesHipoteca = document.getElementById('interesHipoteca');
    const aniosHipoteca = document.getElementById('aniosHipoteca');
    const resultadoHipoteca = document.getElementById('resultadoHipoteca');

    const calcularHipoteca = () => {
      const P = parseFloat(precioVivienda.value);
      const r = parseFloat(interesHipoteca.value) / 100 / 12;
      const n = parseInt(aniosHipoteca.value) * 12;
      if (!P || isNaN(r) || !n) return resultadoHipoteca.textContent = '';
      const cuota = (P * r) / (1 - Math.pow(1 + r, -n));
      const inflacionMensual = Math.pow(1 + inflacionMedia5Anios, 1 / 12) - 1;
      let valorReal = 0;
      for (let i = 1; i <= n; i++) {
        valorReal += cuota / Math.pow(1 + inflacionMensual, i);
      }
      const totalPagado = cuota * n;
      resultadoHipoteca.textContent = `Cuota mensual: €${cuota.toFixed(2)}\nCoste total pagado: €${totalPagado.toFixed(2)}\nValor real ajustado por inflación: €${valorReal.toFixed(2)}`;
    };

    precioVivienda.addEventListener('input', calcularHipoteca);
    interesHipoteca.addEventListener('input', calcularHipoteca);
    aniosHipoteca.addEventListener('input', calcularHipoteca);