let slideAtual = 0;

document.addEventListener("DOMContentLoaded", function () {
  // Elementos da página
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const secoes = document.querySelectorAll(".snap-section");
  const wppClose = document.getElementById("wppClose");
  const wppBubble = document.getElementById("wppBubble");
  const modal = document.getElementById("historiaModal");


  // ==============================
  // Navbar: efeito ao rolar a página
  // ==============================
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });


  // ==============================
  // Menu hambúrguer (mobile)
  // ==============================
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Fecha menu ao clicar em um link
    document.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }


  // ==============================
  // Carrossel de imagens
  // ==============================
  function mostrarSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    slides[n].classList.add("active");
  }

  if (slides.length > 0 && nextBtn && prevBtn) {
    // Próximo slide
    nextBtn.addEventListener("click", function () {
      slideAtual = (slideAtual + 1) % slides.length;
      mostrarSlide(slideAtual);
    });

    // Slide anterior
    prevBtn.addEventListener("click", function () {
      slideAtual = (slideAtual - 1 + slides.length) % slides.length;
      mostrarSlide(slideAtual);
    });

    // Troca automática a cada 5 segundos
    setInterval(function () {
      slideAtual = (slideAtual + 1) % slides.length;
      mostrarSlide(slideAtual);
    }, 5000);
  }


  // ==============================
  // Chat WhatsApp: fechar bolha
  // ==============================
  if (wppClose && wppBubble) {
    wppClose.addEventListener("click", function () {
      wppBubble.classList.add("hidden");
    });
  }


  // ==============================
  // Zoom nas seções ao aparecer na tela
  // ==============================
  const observadorZoom = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("section-active", entry.isIntersecting);
      });
    },
    { threshold: 0.4 } // Ativa quando 40% da seção estiver visível
  );

  secoes.forEach(function (secao) {
    observadorZoom.observe(secao);
  });


  // ==============================
  // Modal: fechar ao clicar fora
  // ==============================
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) fecharHistoria();
    });
  }

}); // Fim do DOMContentLoaded


// ==============================
// Funções do Modal de História
// ==============================
function abrirHistoria(numero) {
  const modal = document.getElementById("historiaModal");
  const titulo = document.getElementById("modalTitulo");
  const texto = document.getElementById("modalTexto");

  if (numero === 1) {
    titulo.textContent = "Nosso Pároco";
    texto.textContent =
      "A Paróquia São Cristóvão foi fundada há 30 anos com o sonho de " +
      "construir uma comunidade de fé sólida no bairro.";
  }

  if (numero === 2) {
    titulo.textContent = "Vigário Paroquial";
    texto.textContent =
      "Nossa missão é evangelizar, acolher e servir. Inspirados por " +
      "São Cristóvão, buscamos ser ponte entre as pessoas e Deus.";
  }

  modal.classList.add("aberto");
}

function fecharHistoria() {
  document.getElementById("historiaModal").classList.remove("aberto");
}


// ==============================
// Navegação por teclado (setas cima/baixo)
// ==============================
const secoesTela = document.querySelectorAll(".snap-section");
let indiceAtual = 0;

function irParaSecao(indice) {
  if (indice < 0 || indice >= secoesTela.length) return;
  indiceAtual = indice;

  secoesTela[indice].scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Detecta teclas pressionadas
window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    irParaSecao(indiceAtual + 1);
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    irParaSecao(indiceAtual - 1);
  }
});

// Atualiza índice da seção atual ao rolar
const observadorTeclado = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        indiceAtual = [...secoesTela].indexOf(entry.target);
      }
    });
  },
  { threshold: 0.7 } // Define seção atual quando 70% dela estiver visível
);

secoesTela.forEach(secao => {
  observadorTeclado.observe(secao);
});