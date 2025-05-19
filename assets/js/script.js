// Menú mobile (hamburguesa)
document.querySelector('.menu-mobile').addEventListener('click', function() {
  document.getElementById('mainNav').classList.toggle('active');
  this.querySelector('i').classList.toggle('fa-bars');
  this.querySelector('i').classList.toggle('fa-times');
});

// Submenús en móvil (al hacer clic)
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.parentElement.classList.toggle('active');
    }
  });
});

// Efecto de escritura
const typingText = "¡Bienvenido al torneo más grande de la comunidad! 🔥";
const typingElement = document.querySelector('.typing-text');
let i = 0;

function typeWriter() {
  if (i < typingText.length) {
    typingElement.textContent += typingText.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

// Efecto hover para tarjetas
document.querySelectorAll('.modo-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 15px 25px rgba(255, 184, 0, 0.3)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
  });
});

// Iniciar
document.addEventListener('DOMContentLoaded', function() {
  typeWriter();
});

// Evita recarga cuando se hace clic en el enlace activo
document.getElementById('current-page')?.addEventListener('click', function(e) {
  e.preventDefault(); // Detiene la recarga
  // Opcional: Feedback visual (animación CSS)
  this.classList.add('active-click');
  setTimeout(() => this.classList.remove('active-click'), 300);
});

// Función reutilizable para todos los rankings (VERSIÓN CORREGIDA)
function initRanking(datos, titulo) {
  // Actualiza el título si es necesario
  const tituloElement = document.querySelector('.ranking-titulo');
  if (tituloElement && titulo) {
    tituloElement.textContent = titulo.toUpperCase();
  }

  // Genera el selector de eventos
  const eventoContainer = document.getElementById('evento-container');
  if (eventoContainer) {
    eventoContainer.innerHTML = `
      <select id="evento" class="evento-dropdown">
        ${datos.eventos.map(evento => `
          <option value="${evento.id}">${evento.nombre}</option>
        `).join('')}
      </select>
    `;

    // Rellena la tabla (¡ESTA ES LA PARTE CLAVE!)
    const selectEvento = document.getElementById('evento');
    const actualizarTabla = () => {
      const eventoSeleccionado = datos.eventos.find(e => e.id === selectEvento.value);
      const tabla = document.getElementById('tabla-datos');
      
      if (eventoSeleccionado && tabla) {
        tabla.innerHTML = eventoSeleccionado.jugadores.map(jugador => `
          <tr>
            <td>${jugador.pos}</td>
            <td>${jugador.name || jugador.nick || 'Sin nombre'}</td> <!-- ¡Línea corregida! -->
            <td>${jugador.kills}</td>
            <td>${jugador.booyah}</td>
            <td>${jugador.puntos.toLocaleString()}</td>
          </tr>
        `).join('');
      }
    };

    selectEvento.addEventListener('change', actualizarTabla);
    actualizarTabla(); // Carga inicial
  }
}
