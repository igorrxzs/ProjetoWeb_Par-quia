let slideAtual = 0;

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  const links = document.querySelectorAll(".nav-link");

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  function mostrarSlide(numero) {
    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });

    slides[numero].classList.add("active");
  }

  nextBtn.addEventListener("click", function () {
    slideAtual++;

    if (slideAtual >= slides.length) {
      slideAtual = 0;
    }

    mostrarSlide(slideAtual);
  });

  prevBtn.addEventListener("click", function () {
    slideAtual--;

    if (slideAtual < 0) {
      slideAtual = slides.length - 1;
    }

    mostrarSlide(slideAtual);
  });

  setInterval(function () {
    slideAtual++;

    if (slideAtual >= slides.length) {
      slideAtual = 0;
    }

    mostrarSlide(slideAtual);
  }, 5000);

  const linhasMissa = document.querySelectorAll(".missa-row:not(.header-row)");

  linhasMissa.forEach(function (linha) {
    linha.addEventListener("click", function () {
      linhasMissa.forEach(function (item) {
        item.style.background = "";
      });

      linha.style.background = "rgba(123, 28, 49, 0.16)";
    });
  });

  const wppClose = document.getElementById("wppClose");
  const wppBubble = document.getElementById("wppBubble");

  wppClose.addEventListener("click", function () {
    wppBubble.classList.add("hidden");
  });

  const secoes = document.querySelectorAll(".snap-section");

  const zoom = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        secoes.forEach(function (secao) {
          secao.classList.remove("section-active");
        });

        entrada.target.classList.add("section-active");
      }
    });
  }, {
    threshold: 0.5
  });

  secoes.forEach(function (secao) {
    zoom.observe(secao);
  });

  const modal = document.getElementById("historiaModal");

  modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
      fecharHistoria();
    }
  });
});

function abrirHistoria(numero) {
  const modal = document.getElementById("historiaModal");
  const titulo = document.getElementById("modalTitulo");
  const texto = document.getElementById("modalTexto");

  if (numero === 1) {
    titulo.textContent = "Nosso Pároco";
    texto.textContent = "A Paróquia São Cristóvão foi fundada há 30 anos com o sonho de construir uma comunidade de fé sólida no bairro. Desde os primeiros passos, contou com a dedicação de famílias que acreditaram na força da oração e da união.";
  }

  if (numero === 2) {
    titulo.textContent = "Vigário Paroquial";
    texto.textContent = "Nossa missão é evangelizar, acolher e servir. Inspirados pelo exemplo de São Cristóvão, buscamos ser ponte entre as pessoas e Deus por meio das pastorais, missas e ações sociais.";
  }

  modal.classList.add("aberto");
}

function fecharHistoria() {
  const modal = document.getElementById("historiaModal");
  modal.classList.remove("aberto");
}