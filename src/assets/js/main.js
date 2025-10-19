// assets/js/main.js

// Inject common partials if hosts exist
const PARTIALS = {
  nav: 'partials/nav.html',
  sidebar: 'partials/sidebar.html',
  cta: 'partials/cta.html',
  footer: 'partials/footer.html'
};

async function injectPartials() {
  await Promise.all(Object.entries(PARTIALS).map(async ([id, url]) => {
    const host = document.getElementById(id);
    if (!host || host.childElementCount) return;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (res.ok) host.innerHTML = await res.text();
    } catch (_) {}
  }));
}

// Sidebar controls, define once
(function () {
  function openSidebar() {
    const el = document.getElementById('mySidebar');
    if (el) el.style.display = 'block';
  }
  function closeSidebar() {
    const el = document.getElementById('mySidebar');
    if (el) el.style.display = 'none';
  }
  if (!window.w3_open) window.w3_open = openSidebar;
  if (!window.w3_close) window.w3_close = closeSidebar;

  document.addEventListener('click', (e) => {
    if (e.target.closest('#mySidebar a')) closeSidebar();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
})();

// Highlight active nav link
function highlightActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('#myNavbar a.w3-bar-item');
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop();
    if (file === current) a.classList.add('active');
  });
}

// Navbar shadow on scroll (expects .scrolled style in CSS)
function bindNavbarScroll() {
  const bar = document.getElementById('myNavbar');
  if (!bar) return;
  const onScroll = () => {
    if (window.scrollY > 10) bar.classList.add('scrolled');
    else bar.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Smooth scroll for same-page anchors
function bindSmoothAnchors() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await injectPartials();
  highlightActiveNav();
  bindNavbarScroll();
  bindSmoothAnchors();
});
// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}


// Toggle between showing and hiding the sidebar when clicking the menu icon
var mySidebar = document.getElementById("mySidebar");

function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
  } else {
    mySidebar.style.display = 'block';
  }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
}
// Nur Tooltip-Texte im Logo-Bereich dauerhaft einblenden
const logoScope2 = document.querySelector('#vision');
if (logoScope2) {
  logoScope2.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function () {
      const tooltipText = this.querySelector('.tooltip-text');
      if (tooltipText && !tooltipText.classList.contains('visible')) {
        tooltipText.classList.add('visible');
      }
      // Haus-Hotspots bleiben unberührt
    });
  });
}

document.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function () {
      const tooltip = this.querySelector('.tooltip-text');
      if (!tooltip.classList.contains('visible')) {
        tooltip.classList.add('visible');
      }
      // Danach passiert nichts mehr – bleibt dauerhaft sichtbar
    });
  });

  (function () {
  const descMap = {
    kamera: "Aussenkamera mit Bewegungserkennung – für Sicherheit rund ums Haus.",
    staubsauger: "Automatischer Saugroboter – hält Ihr Zuhause sauber, ganz automatisch.",
    fernseher: "Smart-TV – zentral gesteuert, mit Sprachsteuerung und Medienverwaltung.",
    solarpanels: "Solarpanels – Energieproduktion live überwachen und optimieren auch über das Handy.",
    tuerkamera: "Türkamera – sichere Eingangskontrolle mit Live-Stream und Aufzeichnung.",
    storen: "Storen – automatische Steuerung per App oder Zeitplan, alles sicher über den Server.",
    sensor: "Erkennt Bewegung, Temperatur und Lichtveränderungen – für mehr Komfort und Sicherheit.",
    tuere: "Elektronisches Türschloss – Zugang per Fingerabdruck oder App."
  };

  const items = document.querySelectorAll('.device-item');
  const box = document.getElementById('diagram-device-desc');
  if (!items.length || !box) return;

  items.forEach(item => {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      items.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const key = this.dataset.device;
      box.textContent = descMap[key] || '';
      box.classList.add('active');
    });
  });

  document.addEventListener('click', function (e) {
    const clickedInsideItem = e.target.closest('.device-item');
    const clickedInsideBox  = e.target.closest('#diagram-device-desc');
    if (!clickedInsideItem && !clickedInsideBox) {
      items.forEach(i => i.classList.remove('active'));
      box.classList.remove('active');
      box.textContent = '';
    }
  });
})();



(function(){
  const cards = document.querySelectorAll('.feature-card');
  if (!cards.length) return;

  function toggle(card){ card.classList.toggle('is-flipped'); }

  cards.forEach(card=>{
    card.addEventListener('click', e => toggle(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(card); }
    });
  });
})();

// Klick-Logik nur für den Logo-Bereich (#vision) und nur dortige .tooltip
const logoScope = document.querySelector('#vision');

if (logoScope) {
  // Klick auf Hotspot im Logo: genau EIN Tooltip öffnen
  logoScope.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function (e) {
      // alle Logo-Tooltips zurücksetzen
      logoScope.querySelectorAll('.tooltip').forEach(t => t.classList.remove('is-open'));
      // eigenen Tooltip öffnen (per Klasse, kein inline-style)
      const tt = this.querySelector('.tooltip');
      if (tt) tt.classList.add('is-open');
      e.stopPropagation();
    });
  });

  // Klick ausserhalb: Logo-Tooltips schliessen
  document.addEventListener('click', function () {
    logoScope.querySelectorAll('.tooltip').forEach(t => t.classList.remove('is-open'));
  });
  
}

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.w3-top');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  