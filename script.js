// ---------- Config ----------
const WHATSAPP_NUMBER = "5511978333945"; // +55 11 97833-3945

// ---------- Cerejas caindo no fundo ----------
function criarCerejasFlutuantes() {
  const prefereReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const campo = document.getElementById("cherryField");
  if (!campo || prefereReduzido) return;

  const quantidade = window.innerWidth < 600 ? 8 : 14;

  for (let i = 0; i < quantidade; i++) {
    const cereja = document.createElement("div");
    cereja.className = "falling-cherry";
    cereja.innerHTML = `
      <svg width="${18 + Math.random() * 14}" height="${18 + Math.random() * 14}" viewBox="0 0 24 24">
        <circle cx="8" cy="16" r="6" fill="#D62839" opacity="0.55"/>
        <circle cx="16" cy="16" r="6" fill="#8C1C3A" opacity="0.5"/>
        <path d="M12 2 C 10 8, 14 10, 12 15" stroke="#5B8C3E" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>
    `;
    cereja.style.left = Math.random() * 100 + "vw";
    cereja.style.animationDuration = 9 + Math.random() * 10 + "s";
    cereja.style.animationDelay = Math.random() * 12 + "s";
    campo.appendChild(cereja);
  }
}

// ---------- Revelar seções ao rolar ----------
function ativarRevelacaoAoRolar() {
  const secoes = document.querySelectorAll(".photo-section, .details, .rsvp, .thanks");
  secoes.forEach((s) => s.classList.add("reveal"));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  secoes.forEach((s) => observador.observe(s));
}

// ---------- Confirmação via WhatsApp ----------
function configurarFormularioRSVP() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const quantidade = document.getElementById("qtd").value;
    const recado = document.getElementById("msg").value.trim();

    let mensagem = `Olá! Aqui é ${nome}. 🍒\nConfirmando presença na festa de 8 aninhos da Lorena!\nVamos ${quantidade} pessoa(s).`;
    if (recado) {
      mensagem += `\n\nRecado: ${recado}`;
    }

    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  criarCerejasFlutuantes();
  ativarRevelacaoAoRolar();
  configurarFormularioRSVP();
});
