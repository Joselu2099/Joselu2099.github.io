const translations = {
  en: {
    header: "Welcome to my Portfolio",
    cv: "CV",
    about: "About Me",
    aboutText:
      "Software Developer specialized in Java, with a strong passion for emerging technologies. I am defined by motivation, ambition, and the constant pursuit of learning modern technologies and tools. Committed to my work, I possess strong adaptability and extensive experience in all types of development, both backend and frontend.",

    experience: "Experience",
    experienceText:
      "<div class='entry'><h3>Full Stack Developer & Analyst - NEORIS (March 2023 - Present)</h3><p>Development of web applications for the economy, employment, and environment departments of the Community of Madrid. Backend: Java, Spring Boot. Frontend: JavaScript, XHTML, JSP, CSS, Angular. Design and implementation of RESTful APIs, microservices-based architectures, and automated batch processes. Databases: Oracle, MySQL. Experience in team and project management, requirements gathering, technical analysis, incident resolution, maintenance, and migration processes. Task management through agile methodologies (SCRUM).</p></div>",

    projects: "Projects",
    projectsText:
      "<div class='entry'><h3><a href=''>BiwengerProManager</a></h3><p>Monolithic web application developed in PHP based on the Biwenger REST API (football game). Recreates its data model and adds features not available in the official site, allowing custom rules and enhancing the experience among friends.</p></div><div class='entry'><h3><a href='./utils.html'>Ultimate Utilities</a></h3><p>A collection of practical tools such as calculators, generators, encryptors, and other small programs for everyday tasks.</p></div><div class='entry'><h3><a href='https://github.com/Joselu2099/file2file/releases'>File2File</a></h3><p>Java application for the automated migration of shell scripts (bash, sh, csh), improving their portability and adaptability across environments.</p></div><div class='entry'><h3><a href=''>CoinScope</a></h3><p>Java + Angular REST API for building a cryptocurrency portfolio, centralizing multiple sources and offering advanced features like accumulation strategies and tax optimization, integrating data from exchanges and wallet explorers.</p></div>",  

    technologies: "Technologies",
    technologiesText:
      "<h3><strong>Languages:</strong></h3><div class='entry'>Java (Advanced)</div><div class='entry'>SQL / PLSQL (Advanced)</div><div class='entry'>JavaScript / TypeScript (High)</div><div class='entry'>HTML / CSS / SCSS / JSP / XHTML (Advanced)</div><div class='entry'>Python (High)</div><div class='entry'>PHP (High)</div><div class='entry'>Bash / SH / CSH (High)</div><div class='entry'>C / C++ (Intermediate)</div><div class='entry'>Pascal (Intermediate)</div><div class='entry'>Assembly (Intermediate)</div><br/><h3><strong>Frameworks:</strong></h3><div class='entry'>Spring Boot (High)</div><div class='entry'>Angular (Intermediate)</div><div class='entry'>Laravel (Intermediate)</div><br/><h3><strong>Repositories:</strong></h3><div class='entry'>Git (High)</div><div class='entry'>Subversion (High)</div><br/><h3><strong>DevOps:</strong></h3><div class='entry'>Jenkins</div><div class='entry'>SonarQube</div><div class='entry'>Docker</div><div class='entry'>Jira</div><br/><h3><strong>Tools & Environments:</strong></h3><div class='entry'>Android Studio</div><div class='entry'>IntelliJ IDEA</div><div class='entry'>Eclipse</div><div class='entry'>Visual Studio Code</div><div class='entry'>Postman</div><div class='entry'>Erwin Data Modeler</div><div class='entry'>Notion</div>",

    skills: "Skills",
    skillsText:
      "<li>Leadership & Responsibility</li><li>Creativity & Imagination</li><li>Problem Solving</li><li>Analytical Thinking</li><li>Self-taught</li><li>Client Requirements Gathering</li><li>Quality Focus</li><li>Adaptability</li>",

    languages: "Languages",
    languagesText:
      "<div class='entry'>Spanish (Native Speaker)</div><div class='entry'>English (B2 – Upper Intermediate)</div><div class='entry'>German (A1 – Beginner)</div>",
    
    education: "Education",
    educationText:
      "<div class='entry'><h3>Advanced Technician in Web Application Development</h3><p>CESUR (2021 - 2023)</p></div><div class='entry'><h3>Bachelor’s Degree in Computer Engineering</h3><p>University of Murcia (2017 - 2024)</p></div><div class='entry'><h3>Technological Baccalaureate</h3><p>Maristas High School (2015 - 2017)</p></div>",

    contact: "Contact",
    contactText: "Email",
  },
  es: {
    header: "Bienvenido a mi Portfolio",
    cv: "CV",
    about: "Sobre mí",
    aboutText:
      "Desarrollador de Software especializado en Java, con gran pasión por las tecnologías emergentes. Me definen la motivación, la ambición y la búsqueda constante de aprendizaje en tecnologías y herramientas modernas. Comprometido con mi trabajo, tengo una fuerte capacidad de adaptación y una amplia experiencia en todo tipo de desarrollos, tanto backend como frontend.",

    experience: "Experiencia",
    experienceText:
      "<div class='entry'><h3>Full Stack Developer & Analyst - NEORIS (Marzo 2023 - Actualidad)</h3><p>Desarrollo de aplicaciones web para las áreas de economía, empleo y medio ambiente de la Comunidad de Madrid. Backend: Java, Spring Boot. Frontend: JavaScript, XHTML, JSP, CSS, Angular. Diseño e implementación de APIs RESTful, arquitecturas basadas en microservicios y procesos batch automatizados. Bases de datos: Oracle, MySQL. Experiencia en gestión de equipos y proyectos, recogida de requisitos, análisis técnico, resolución de incidencias, mantenimiento y procesos de migración. Gestión de tareas mediante metodologías ágiles (SCRUM).</p></div>",

    education: "Educación",
    educationText:
      "<div class='entry'><h3>Técnico Superior en Desarrollo de Aplicaciones Web</h3><p>CESUR (2021 - 2023)</p></div><div class='entry'><h3>Grado en Ingeniería Informática</h3><p>Universidad de Murcia (2017 - 2024)</p></div><div class='entry'><h3>Bachillerato Tecnológico</h3><p>Colegio Maristas (2015 - 2017)</p></div>",

    technologies: "Tecnologías",
    technologiesText:
      "<h3><strong>Lenguajes:</strong></h3><div class='entry'>Java (Avanzado)</div><div class='entry'>SQL / PLSQL (Avanzado)</div><div class='entry'>JavaScript / TypeScript (Alto)</div><div class='entry'>HTML / CSS / SCSS / JSP / XHTML (Avanzado)</div><div class='entry'>Python (Alto)</div><div class='entry'>PHP (Alto)</div><div class='entry'>Bash / SH / CSH (Alto)</div><div class='entry'>C / C++ (Medio)</div><div class='entry'>Pascal (Medio)</div><div class='entry'>Ensamblador (Medio)</div><br/><h3><strong>Frameworks:</strong></h3><div class='entry'>Spring Boot (Alto)</div><div class='entry'>Angular (Medio)</div><div class='entry'>Laravel (Medio)</div><br/><h3><strong>Repositorios:</strong></h3><div class='entry'>Git (Alto)</div><div class='entry'>Subversion (Alto)</div><br/><h3><strong>DevOps:</strong></h3><div class='entry'>Jenkins</div><div class='entry'>SonarQube</div><div class='entry'>Docker</div><div class='entry'>Jira</div><br/><h3><strong>Herramientas y Entornos:</strong></h3><div class='entry'>Android Studio</div><div class='entry'>IntelliJ IDEA</div><div class='entry'>Eclipse</div><div class='entry'>Visual Studio Code</div><div class='entry'>Postman</div><div class='entry'>Erwin Data Modeler</div><div class='entry'>Notion</div>",

    skills: "Habilidades",
    skillsText:
      "<li>Liderazgo y Responsabilidad</li><li>Creatividad e Imaginación</li><li>Resolución de Problemas</li><li>Pensamiento Analítico</li><li>Autodidacta</li><li>Recolección de Requisitos del Cliente</li><li>Enfoque en la Calidad</li><li>Capacidad de Adaptación</li>",

    projects: "Proyectos",
    projectsText:
      "<div class='entry'><h3><a href=''>BiwengerProManager</a></h3><p>Aplicación web monolítica desarrollada en PHP a partir del API REST de Biwenger (juego de fútbol). Reproduce su modelo de datos y amplía funcionalidades no disponibles en la web oficial, permitiendo crear nuevas reglas de juego y mejorar la experiencia entre amigos.</p></div><div class='entry'><h3><a href='./utils.html'>Ultimate Utilities</a></h3><p>Colección de herramientas prácticas como calculadoras, generadores, encriptadores y otros mini programas útiles para tareas cotidianas.</p></div><div class='entry'><h3><a href='https://github.com/Joselu2099/file2file/releases'>File2File</a></h3><p>Aplicación Java para la migración automatizada de scripts de shell (bash, sh, csh), optimizando su adaptación y portabilidad entre distintos entornos.</p></div><div class='entry'><h3><a href=''>CoinScope</a></h3><p>API REST en Java + Angular para la creación de un portfolio de criptomonedas, capaz de centralizar múltiples fuentes y ofrecer funcionalidades avanzadas como estrategias de acumulación y optimización fiscal, integrando datos de exchanges y exploradores de wallets.</p></div>",

    languages: "Idiomas",
    languagesText:
      "<div class='entry'>Español (Nativo)</div><div class='entry'>Inglés (B2 – Intermedio alto)</div><div class='entry'>Alemán (A1 – Principiante)</div>",

    contact: "Contacto",
    contactText: "Correo",
  },
  de: {
    header: "Willkommen in meinem Portfolio",
    cv: "Lebenslauf",
    about: "Über mich",
    aboutText:
      "Softwareentwickler mit Spezialisierung auf Java und großer Leidenschaft für neue Technologien. Motivation, Ehrgeiz und der ständige Wunsch, moderne Tools und Technologien zu erlernen, zeichnen mich aus. Ich bin engagiert, anpassungsfähig und habe umfangreiche Erfahrung in der Backend- und Frontend-Entwicklung.",

    experience: "Berufserfahrung",
    experienceText:
      "<div class='entry'><h3>Full Stack Entwickler & Analyst – NEORIS (März 2023 – Heute)</h3><p>Entwicklung von Webanwendungen für die Bereiche Wirtschaft, Beschäftigung und Umwelt der Gemeinschaft Madrid. Backend: Java, Spring Boot. Frontend: JavaScript, XHTML, JSP, CSS, Angular. Entwurf und Implementierung von RESTful-APIs, Microservice-Architekturen und automatisierten Batch-Prozessen. Datenbanken: Oracle, MySQL. Erfahrung in Team- und Projektleitung, Anforderungserhebung, technischer Analyse, Fehlerbehebung, Wartung und Migrationsprozessen. Aufgabenmanagement mit agilen Methoden (SCRUM).</p></div>",

    education: "Ausbildung",
    educationText:
      "<div class='entry'><h3>Fachinformatiker für Webanwendungsentwicklung</h3><p>CESUR (2021 – 2023)</p></div><div class='entry'><h3>Bachelor in Informatik</h3><p>Universität Murcia (2017 – 2024)</p></div><div class='entry'><h3>Technisches Abitur</h3><p>Maristas Schule (2015 – 2017)</p></div>",

    technologies: "Technologien",
    technologiesText:
      "<h3><strong>Programmiersprachen:</strong></h3><div class='entry'>Java (Fortgeschritten)</div><div class='entry'>SQL / PLSQL (Fortgeschritten)</div><div class='entry'>JavaScript / TypeScript (Hoch)</div><div class='entry'>HTML / CSS / SCSS / JSP / XHTML (Fortgeschritten)</div><div class='entry'>Python (Hoch)</div><div class='entry'>PHP (Hoch)</div><div class='entry'>Bash / SH / CSH (Hoch)</div><div class='entry'>C / C++ (Mittel)</div><div class='entry'>Pascal (Mittel)</div><div class='entry'>Assembler (Mittel)</div><br/><h3><strong>Frameworks:</strong></h3><div class='entry'>Spring Boot (Hoch)</div><div class='entry'>Angular (Mittel)</div><div class='entry'>Laravel (Mittel)</div><br/><h3><strong>Versionsverwaltung:</strong></h3><div class='entry'>Git (Hoch)</div><div class='entry'>Subversion (Hoch)</div><br/><h3><strong>DevOps:</strong></h3><div class='entry'>Jenkins</div><div class='entry'>SonarQube</div><div class='entry'>Docker</div><div class='entry'>Jira</div><br/><h3><strong>Tools & Umgebungen:</strong></h3><div class='entry'>Android Studio</div><div class='entry'>IntelliJ IDEA</div><div class='entry'>Eclipse</div><div class='entry'>Visual Studio Code</div><div class='entry'>Postman</div><div class='entry'>Erwin Data Modeler</div><div class='entry'>Notion</div>",

    skills: "Fähigkeiten",
    skillsText:
      "<li>Führung & Verantwortung</li><li>Kreativität & Vorstellungskraft</li><li>Problemlösung</li><li>Analytisches Denken</li><li>Autodidakt</li><li>Anforderungsanalyse</li><li>Qualitätsorientierung</li><li>Anpassungsfähigkeit</li>",

    projects: "Projekte",
    projectsText:
      "<div class='entry'><h3><a href=''>BiwengerProManager</a></h3><p>Monolithische Webanwendung in PHP, basierend auf der Biwenger-REST-API (Fußballspiel). Repliziert das Datenmodell und erweitert Funktionen, die auf der offiziellen Website fehlen, um neue Spielregeln zu erstellen und das Erlebnis mit Freunden zu verbessern.</p></div><div class='entry'><h3><a href='./utils.html'>Ultimate Utilities</a></h3><p>Sammlung nützlicher Tools wie Rechner, Generatoren, Verschlüsselungsprogramme und anderer praktischer Minianwendungen für den Alltag.</p></div><div class='entry'><h3><a href='https://github.com/Joselu2099/file2file/releases'>File2File</a></h3><p>Java-Anwendung zur automatisierten Migration von Shell-Skripten (bash, sh, csh), zur Optimierung der Anpassung und Portabilität in verschiedenen Umgebungen.</p></div><div class='entry'><h3><a href=''>CoinScope</a></h3><p>Java + Angular REST-API zur Erstellung eines Kryptowährungs-Portfolios, die mehrere Quellen zentralisiert und fortschrittliche Funktionen wie Ansammlungsstrategien und steuerliche Optimierung bietet – durch Integration von Daten aus Börsen und Wallet-Scannern.</p></div>",
    
    languages: "Sprachen",
    languagesText:
      "<div class='entry'>Spanisch (Muttersprache)</div><div class='entry'>Englisch (B2 – Fortgeschrittene Mittelstufe)</div><div class='entry'>Deutsch (A1 – Anfänger)</div>",  

    contact: "Kontakt",
    contactText: "E-Mail",
  },
};
/*
particlesJS.load(
  "particles-js",
  "https://cdn.jsdelivr.net/gh/VincentGarreau/particles.js@master/demo/particles.json"
);
*/

const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach((section) => observer.observe(section));

function showPopup() {
  document.getElementById("popup").style.display = "block";
  setTimeout(() => {
    document.querySelector("#popup button").focus();
  }, 10);
}

function downloadCV(lang) {
  const url =
    lang === "es"
      ? "./files/CV-SanchezCarrasco-JoseLuis_es.pdf"
      : "./files/CV-SanchezCarrasco-JoseLuis_en.pdf";
  window.open(url, "_blank");
  document.getElementById("popup").style.display = "none";
}

function showLangPopup() {
  document.getElementById("langPopup").style.display = "block";
  setTimeout(() => {
    document.querySelector("#langPopup button").focus();
  }, 10);
}

function goUp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setLanguage(lang) {
  // Transición de opacidad para el main content
  const mainContent = document.body;
  mainContent.style.transition = "opacity 0.4s";
  mainContent.style.opacity = "0.3";
  setTimeout(() => {
    localStorage.setItem("language", lang);
    const t = translations[lang];
    document.querySelector("header").innerText = t.header;
    document.querySelector("#cv").innerText = t.cv;
    document.querySelector("a[href='#about'] span").innerText = t.about;
    document.querySelector("a[href='#experience'] span").innerText = t.experience;
    document.querySelector("a[href='#education'] span").innerText = t.education;
    document.querySelector("a[href='#technologies'] span").innerText =
      t.technologies;
    document.querySelector("a[href='#skills'] span").innerText = t.skills;
    document.querySelector("a[href='#projects'] span").innerText = t.projects;
    document.querySelector("a[href='#languages'] span").innerText = t.languages;
    document.querySelector("a[href='#contact'] span").innerText = t.contact;
    document.querySelector("#about h2").innerText = t.about;
    document.querySelector("#about p").innerText = t.aboutText;
    document.querySelector(
      "#experience"
    ).innerHTML = `<h2>${t.experience}</h2>${t.experienceText}`;
    document.querySelector(
      "#education"
    ).innerHTML = `<h2>${t.education}</h2>${t.educationText}`;
    document.querySelector(
      "#technologies"
    ).innerHTML = `<h2>${t.technologies}</h2>${t.technologiesText}`;
    document.querySelector(
      "#skills"
    ).innerHTML = `<h2>${t.skills}</h2><ul>${t.skillsText}</ul>`;
    document.querySelector(
      "#projects"
    ).innerHTML = `<h2>${t.projects}</h2>${t.projectsText}`;
    document.querySelector(
      "#languages"
    ).innerHTML = `<h2>${t.languages}</h2>${t.languagesText}`;
    document.querySelector("#contact h2").innerText = t.contact;
    document.querySelector("#contact #mail").innerHTML = t.contactText;
    document.getElementById("langPopup").style.display = "none";
    loadSounds();
    mainContent.style.opacity = "1";
  }, 250);
}

function loadSounds() {
  const clickSound = new Audio("sounds/click.mp3");
  const enterSound = new Audio("sounds/enter.mp3");
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
}

function playSound(sound) {
  const audio = new Audio(`sounds/${sound}.mp3`);
  audio.currentTime = 0;
  audio.play();
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);

  // --- ANIMACIÓN DE PARTÍCULAS ---
  function startParticles() {
    if (window.particlesJS) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: "#00ffee" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 120,
            color: "#00ffee",
            opacity: 0.2,
            width: 1,
          },
          move: { enable: true, speed: 2 },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    } else {
      setTimeout(startParticles, 100); // Espera y reintenta
    }
  }
  startParticles();

  // --- SONIDO EN ENLACES ---
  loadSounds();

  window.addEventListener("keydown", function(e) {
    const popup = document.querySelector(".popup[style*='block']");
    if (popup && (e.key === "Escape" || e.key === "Esc")) {
      popup.style.display = "none";
      // Devuelve el foco al botón que abrió el popup si es posible
      if (popup.id === "popup") document.getElementById("cv-download").focus();
      if (popup.id === "langPopup") document.querySelector(".lang-toggle").focus();
    }
  });
});

