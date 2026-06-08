document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentSlide = 0;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    setActiveLink();
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("click", e => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  function setActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 80;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach(link => {
      link.classList.remove("active-link");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active-link");
      }
    });
  }

  const revealTargets = document.querySelectorAll(
    ".card, .missa-row:not(.header-row), .contato-info, .mapa, .stats div, .video-grid video"
  );

  revealTargets.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  const whatsappBtn = document.getElementById("whatsappBtn");

  whatsappBtn.addEventListener("click", e => {
    e.preventDefault();

    const phone = "5511999999999";
    const message = encodeURIComponent(
      "Olá! Gostaria de mais informações sobre a Paróquia São Cristóvão."
      
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  });

  document.querySelectorAll(".missa-row:not(.header-row)").forEach(row => {
    row.addEventListener("click", () => {
      document.querySelectorAll(".missa-row").forEach(r => {
        r.style.background = "";
      });

      row.style.background = "rgba(123, 28, 49, 0.16)";
    });
  });
}); 

document.getElementById('wppClose').addEventListener('click', function () {
  document.getElementById('wppBubble').classList.add('hidden');
});// MODAL DE HISTÓRIAS
const historias = {
  1: {
    titulo: "Nosso Pároco",
    texto: "A Paróquia São Cristóvão foi fundada há 30 anos com o sonho de construir uma comunidade de fé sólida no bairro. Desde os primeiros passos, contou com a dedicação de famílias que acreditaram na força da oração e da união. Hoje, essa história continua viva em cada celebração e em cada rosto que passa por nossas portas."
  },
  2: {
    titulo: "Vigário Paroquial",
    texto: "Nossa missão é evangelizar, acolher e servir. Inspirados pelo exemplo de São Cristóvão, que carregou o próximo em seus ombros, buscamos ser ponte entre as pessoas e Deus. Por meio das pastorais, missas e ações sociais, levamos esperança e amor a mais de 2 mil famílias da nossa comunidade."
  } 
};

function abrirHistoria(num) {
  document.getElementById('modalTitulo').textContent = historias[num].titulo;
  document.getElementById('modalTexto').textContent = historias[num].texto;
  document.getElementById('historiaModal').classList.add('aberto');
}

function fecharHistoria() {
  document.getElementById('historiaModal').classList.remove('aberto');
}

// Fechar clicando fora do modal
document.getElementById('historiaModal').addEventListener('click', function(e) {
  if (e.target === this) fecharHistoria();
});

// Fechar balão do WhatsApp
document.getElementById('wppClose').addEventListener('click', function () {
  document.getElementById('wppBubble').classList.add('hidden');
});