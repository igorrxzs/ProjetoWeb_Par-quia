let slideAtual = 0;

document.addEventListener("DOMContentLoaded", function () {
  const navbar    = document.getElementById("navbar");
  const navLinks  = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  const slides    = document.querySelectorAll(".slide");
  const prevBtn   = document.getElementById("prevBtn");
  const nextBtn   = document.getElementById("nextBtn");
  const secoes    = document.querySelectorAll(".snap-section");

  /* ── Navbar scroll ── */
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });

  /* ── Hamburger ── */
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  /* ── Carousel ── */
  function mostrarSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    slides[n].classList.add("active");
  }

  if (slides.length > 0 && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", function () {
      slideAtual = (slideAtual + 1) % slides.length;
      mostrarSlide(slideAtual);
    });
    prevBtn.addEventListener("click", function () {
      slideAtual = (slideAtual - 1 + slides.length) % slides.length;
      mostrarSlide(slideAtual);
    });
    setInterval(function () {
      slideAtual = (slideAtual + 1) % slides.length;
      mostrarSlide(slideAtual);
    }, 5000);
  }

  /* ── Missas highlight ── */
  const linhasMissa = document.querySelectorAll(".missa-row:not(.header-row)");
  linhasMissa.forEach(function (linha) {
    linha.addEventListener("click", function () {
      linhasMissa.forEach(l => (l.style.background = ""));
      linha.style.background = "rgba(123, 28, 49, 0.16)";
    });
  });

  /* ── Chat WhatsApp ── */
  const wppClose  = document.getElementById("wppClose");
  const wppBubble = document.getElementById("wppBubble");
  if (wppClose && wppBubble) {
    wppClose.addEventListener("click", function () {
      wppBubble.classList.add("hidden");
    });
  }

  /* ════════════════════════════════════════════
     ZOOM POR SEÇÃO — Intersection Observer
     Scroll nativo funciona normalmente.
     Quando uma seção ocupa >= 50% da tela,
     ela recebe section-active e faz o zoom.
  ════════════════════════════════════════════ */

  const observador = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-active");
        } else {
          entry.target.classList.remove("section-active");
        }
      });
    },
    { threshold: 0.4 }   /* dispara quando 40% da seção está visível */
  );

  secoes.forEach(function (secao) {
    observador.observe(secao);
  });

  /* ── Modal história ── */
  const modal = document.getElementById("historiaModal");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) fecharHistoria();
    });
  }
});

/* ── Funções globais do modal ── */
function abrirHistoria(numero) {
  const modal  = document.getElementById("historiaModal");
  const titulo = document.getElementById("modalTitulo");
  const texto  = document.getElementById("modalTexto");

  if (numero === 1) {
    titulo.textContent = "Nosso Pároco";
    texto.textContent  =
      "A Paróquia São Cristóvão foi fundada há 30 anos com o sonho de " +
      "construir uma comunidade de fé sólida no bairro.";
  }
  if (numero === 2) {
    titulo.textContent = "Vigário Paroquial";
    texto.textContent  =
      "Nossa missão é evangelizar, acolher e servir. Inspirados por " +
      "São Cristóvão, buscamos ser ponte entre as pessoas e Deus.";
  }

  modal.classList.add("aberto");
}

function fecharHistoria() {
  document.getElementById("historiaModal").classList.remove("aberto");
}