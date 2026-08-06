/* =====================================================
   CONFIGURACIÓN — edita aquí los datos reales
===================================================== */
const CONFIG = {
  // Fecha y hora objetivo para la cuenta regresiva (ceremonia).
  // Formato: 'AAAA-MM-DDTHH:MM:SS'
  targetDate: '2026-11-15T17:00:00',
};

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------
     1) Chispas doradas flotando en el fondo del intro
  --------------------------------------------------- */
  const sparkleWrap = document.querySelector('.intro__sparkles');
  if (sparkleWrap && !reduceMotion) {
    const TOTAL = 22;
    for (let i = 0; i < TOTAL; i++) {
      const s = document.createElement('span');
      s.style.left = Math.random() * 100 + '%';
      s.style.top = 40 + Math.random() * 50 + '%';
      s.style.animationDelay = (Math.random() * 5) + 's';
      s.style.animationDuration = (4 + Math.random() * 3) + 's';
      sparkleWrap.appendChild(s);
    }
  }

  /* ---------------------------------------------------
     2) Apertura del sobre (sello -> solapa -> carta)
  --------------------------------------------------- */
  const envelope   = document.getElementById('envelope');
  const seal       = document.getElementById('seal');
  const introHint  = document.getElementById('introHint');
  const intro      = document.getElementById('intro');
  const main       = document.getElementById('main');
  const openBtn    = document.getElementById('openInviteBtn');

  function openEnvelope() {
    if (envelope.classList.contains('is-open')) return;
    seal.classList.add('is-cracked');
    introHint.classList.add('is-hidden');
    const delay = reduceMotion ? 0 : 320;
    setTimeout(() => envelope.classList.add('is-open'), delay);
  }

  envelope.addEventListener('click', openEnvelope);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  /* ---------------------------------------------------
     3) Entrar al sitio principal
  --------------------------------------------------- */
  const heroReveals = document.querySelectorAll('.hero .reveal');

  function enterSite() {
    intro.classList.add('is-hidden');
    main.classList.add('is-visible');
    main.removeAttribute('aria-hidden');

    setTimeout(() => { intro.style.display = 'none'; }, reduceMotion ? 0 : 950);

    setTimeout(() => {
      heroReveals.forEach((el) => el.classList.add('is-visible'));
    }, reduceMotion ? 0 : 260);
  }

  openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    enterSite();
  });

  /* ---------------------------------------------------
     4) Cuenta regresiva
  --------------------------------------------------- */
  const target = new Date(CONFIG.targetDate);
  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');
  const caption = document.getElementById('countdownCaption');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tickCountdown() {
    const diff = target.getTime() - Date.now();

    if (diff <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMins.textContent = '00';
      elSecs.textContent = '00';
      caption.textContent = '¡Hoy es el gran día!';
      clearInterval(timer);
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    elDays.textContent  = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(mins);
    elSecs.textContent  = pad(secs);
  }

  tickCountdown();
  const timer = setInterval(tickCountdown, 1000);

  /* ---------------------------------------------------
     5) Revelado al hacer scroll (iglesia / recepción / footer)
  --------------------------------------------------- */
  const scrollReveals = document.querySelectorAll('.locations .reveal, .footer.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    scrollReveals.forEach((el) => observer.observe(el));
  } else {
    scrollReveals.forEach((el) => el.classList.add('is-visible'));
  }

});