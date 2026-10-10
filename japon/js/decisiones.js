/*
 * Datos de las decisiones del viaje. Es el único sitio que hay que tocar para añadir
 * o cambiar votaciones.
 *
 * mode:
 *   'one'   - Decidimos juntos, una sola opción (son incompatibles entre sí).
 *   'many'  - Decidimos juntos, se pueden elegir varias (son compatibles).
 *   'split' - Cada uno a lo suyo: cada viajero marca sí / si sobra tiempo / paso en cada opción.
 *
 * Mantener las decisiones ordenadas por día. Los ids de decisión y de opción no deben
 * cambiar una vez compartidos votos (los códigos exportados los usan).
 */
window.JAPON = {
    TRAVELERS: [
        { name: 'Jose Luis', color: '#00e5ff' },
        { name: 'Sarita', color: '#ff2d95' },
        { name: 'Adrian', color: '#b4ff39' },
        { name: 'Alejandro', color: '#ffb300' },
        { name: 'Fernando R.', color: '#a78bfa' },
        { name: 'Fernando L.', color: '#ff6e40' }
    ],
    DECISIONS: [
        { id: 'd0-ida', day: 0, mode: 'one', title: 'Murcia → Madrid',
          q: '¿Cómo vamos a Barajas el 2 de septiembre?',
          opts: [
            { id: 'ave', name: 'AVE + metro/Cercanías', desc: 'Sin coche ni parking. ~3h 30 de tren.' },
            { id: 'coche', name: 'Coche', desc: '~4h 30. Parking 18 días.', meta: 'cuesta el parking' } ] },

        { id: 'd2-akiba', day: 2, mode: 'split', title: 'Akihabara', time: '19:00 - 21:30',
          q: 'Cada uno marca lo que le apetece.',
          meet: 'Cenamos juntos a las 21:30 en Akihabara.',
          opts: [
            { id: 'retro', name: 'Retro gaming y arcades', desc: 'Super Potato, Radio Kaikan, GiGO.' },
            { id: 'steins', name: 'Ruta Steins;Gate', desc: 'A pie y gratis.', meta: '~1h 30' },
            { id: 'tiendas', name: 'Popurrí de tiendas', desc: 'Yodobashi, Don Quijote, Animate y más.' } ] },

        { id: 'd3-noche', day: 3, mode: 'split', title: 'Noche del Día 3', time: 'desde las 17:00',
          q: 'Tras Nakano, cada uno marca lo que quiere.',
          meet: 'Cada uno vuelve al hotel por su cuenta y avisa en el grupo.',
          opts: [
            { id: 'shibuya', name: 'Shibuya Sky + cena', desc: 'Cruce, Hachiko y mirador al atardecer.' },
            { id: 'jackson', name: 'Jackson Hole (Nana)', desc: 'Hamburguesas del bar de Nana, en Chōfu.', meta: '~40 min de tren desde Shinjuku' },
            { id: 'tiendeo', name: 'Tiendeo Shibuya / Shinjuku', desc: 'Grandes almacenes y tiendas.' },
            { id: 'nakano', name: 'Más Nakano', desc: 'Otra vuelta por las tiendas otaku.' } ] },

        { id: 'd4-kamakura', day: 4, mode: 'many', title: 'Excursión a Kamakura',
          q: 'Elige lo que quieras hacer; se pueden las dos.',
          opts: [
            { id: 'clasico', name: 'Kamakura clásico', desc: 'Gran Buda, Hase-dera y costa. Vuelta a las 15:00.' },
            { id: 'enoshima', name: 'Añadir Enoshima', desc: 'La isla, en tren Enoden.', meta: '+3 h, volvemos más tarde' } ] },

        { id: 'd10-nara', day: 10, mode: 'many', title: 'Nara y Uji',
          q: '¿Qué hacemos del día? Se pueden las dos.',
          opts: [
            { id: 'nara', name: 'Nara', desc: 'Ciervos y Gran Buda de Todai-ji.' },
            { id: 'uji', name: 'Uji', desc: 'Templo Byodoin y matcha.' } ] },

        { id: 'd11-libre', day: 11, mode: 'split', title: 'Tarde libre en Kioto', time: '13:00 - 17:00',
          q: 'Cada uno marca lo que le apetece.',
          meet: 'Cenamos juntos a las 19:00 en Kioto.',
          opts: [
            { id: 'manga', name: 'Museo Internacional del Manga', desc: 'Miles de tomos para leer.' },
            { id: 'toei', name: 'Toei Kyoto Studio Park', desc: 'Plató de época y samuráis.' },
            { id: 'zen', name: 'Templos zen', desc: 'Daitoku-ji, Nanzen-ji, Gio-ji.' },
            { id: 'compras', name: 'Compras y matcha', desc: 'Shijo/Karasuma y casa de té.' } ] },

        { id: 'd12-osaka', day: 12, mode: 'many', title: 'Tarde del Día 12 en Osaka',
          q: 'Elige lo que quieras; casi todo se puede encadenar.',
          opts: [
            { id: 'nipponbashi', name: 'Nipponbashi (Dende Town)', desc: 'Tiendas otaku: Jungle, A-Stop, Animate.' },
            { id: 'dotonbori', name: 'Dotonbori', desc: 'Canal, cartel Glico, takoyaki y okonomiyaki.' },
            { id: 'shinsaibashi', name: 'Compras en Shinsaibashi', desc: 'Galerías comerciales.' } ] },

        { id: 'd13-ruta', day: 13, mode: 'one', title: 'DECISIÓN CLAVE · Ruta al sur',
          q: 'Cambia hoteles y pases: hay que decidirla antes de reservar.',
          opts: [
            { id: 'base', name: 'Ruta actual', desc: 'Hiroshima y Miyajima; luego Himeji/Kobe y Castillo de Osaka (Días 14-15).' },
            { id: 'kyushu', name: 'Escapada a Kyushu', desc: 'Hakata, Hita (Shingeki no Kyojin) y Huis Ten Bosch (Thousand Sunny). Recorta Días 14 y 15.', meta: 'cambia hoteles y pases' } ] },

        { id: 'd14-himeji', day: 14, mode: 'many', title: 'Himeji y Kobe',
          q: 'Solo si vamos por la ruta actual. Elige lo que quieras.',
          opts: [
            { id: 'himeji', name: 'Castillo de Himeji', desc: '"La Garza Blanca". Mañana.' },
            { id: 'wagyu', name: 'Almuerzo de buey de Kobe', desc: 'Wagyu A5 en teppanyaki.', meta: 'plato caro' },
            { id: 'puerto', name: 'Puerto y Chinatown de Kobe', desc: 'Paseo de tarde.' } ] },

        { id: 'd15-osaka', day: 15, mode: 'split', title: 'Día 15 en Osaka',
          q: 'Cada uno marca lo que le apetece.',
          meet: 'Cenamos juntos en Osaka.',
          opts: [
            { id: 'castillo', name: 'Castillo de Osaka', desc: 'Jardines y foso.' },
            { id: 'shinsekai', name: 'Shinsekai', desc: 'Torre Tsutenkaku y kushikatsu.' },
            { id: 'umeda', name: 'Umeda Sky Building', desc: 'Mirador 360º y compras.' },
            { id: 'nipponbashi', name: 'Más Nipponbashi', desc: 'Segunda ronda de tiendas otaku.' } ] },

        { id: 'd16-fuji', day: 16, mode: 'one', title: 'Monte Fuji',
          q: '¿Qué hacemos con el Fuji el 18 de septiembre?',
          opts: [
            { id: 'fujigoko', name: 'Cinco Lagos', desc: 'Vistas al Fuji; menos turístico.' },
            { id: 'hakone', name: 'Hakone', desc: 'Teleférico, lago Ashi y onsen.' },
            { id: 'tokio', name: 'Saltar el Fuji', desc: 'Más tiempo en Tokio; el Fuji depende del clima.' } ] },

        { id: 'd16-tarde', day: 16, mode: 'split', title: 'Tarde del Día 16', time: 'desde las 15:00',
          q: 'Para quien vuelva a Tokio pronto.',
          meet: 'Cena de despedida juntos a las 19:00.',
          opts: [
            { id: 'odaiba', name: 'Odaiba — Gundam', desc: 'Unicorn 1:1 y Gundam Base.' },
            { id: 'donki', name: 'Don Quijote', desc: 'Recuerdos, snacks y cosmética.' },
            { id: 'mugiwara', name: 'Mugiwara Store (Tokyo Station)', desc: 'Más One Piece; confirmar sucursal.' } ] },

        { id: 'd17-man', day: 17, mode: 'split', title: 'Mañana del Día 17', time: '09:30 - 12:00',
          q: 'Último día completo en Tokio.',
          meet: 'Almorzamos juntos a las 12:00.',
          opts: [
            { id: 'suga', name: 'Escaleras de Your Name', desc: 'Santuario Suga, Yotsuya. Mejor temprano.', meta: '~1 h' },
            { id: 'compras', name: 'Últimas compras', desc: 'Akihabara, Shinjuku o Shibuya.' },
            { id: 'descanso', name: 'Descansar', desc: 'Preparar maletas con calma.' } ] },

        { id: 'd17-tarde', day: 17, mode: 'split', title: 'Tarde del Día 17', time: '13:00 - 19:00',
          q: 'Hay tiempo hasta las 19:00.',
          meet: 'Salimos juntos hacia Haneda a las 19:00.',
          opts: [
            { id: 'inazuma', name: 'Campo de Inazuma Eleven', desc: 'Ribera del Arakawa (Yatsugi). Ubicación sin confirmar.', meta: 'localizar antes' },
            { id: 'onsen', name: 'Onsen — Spa LaQua', desc: 'Relax antes del vuelo largo.' },
            { id: 'compras', name: 'Compras sueltas', desc: 'Lo que falte de recuerdos.' } ] },

        { id: 'd18-vuelta', day: 18, mode: 'one', title: 'Madrid → Murcia',
          q: 'Aterrizamos en Barajas el 20 a las 14:15. ¿Cuándo volvemos?',
          opts: [
            { id: 'mismo', name: 'Ese mismo día 20', desc: 'AVE o coche por la tarde; llegamos de noche.' },
            { id: 'noche', name: 'Dormir en Madrid, volver el 21', desc: 'Más descanso tras ~18 h de viaje.', meta: '+1 noche de hotel' } ] }
    ]
};
