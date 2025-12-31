import './style.css';

// Elementos del DOM
const spotlight = document.getElementById('spotlight');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

/**
 * Efecto de cursor Spotlight
 * Actualiza la posición de la máscara radial siguiendo el mouse.
 */
document.addEventListener('mousemove', (e) => {
  if (spotlight) {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  }
});

/**
 * Scroll Spy usando IntersectionObserver
 * Mucho más eficiente que escuchar el evento 'scroll' directamente.
 */
const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -70% 0px', // Detectar cuando la sección está en el centro-norte de la pantalla
  threshold: 0
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      // Actualizar enlaces de navegación
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Caso especial: Si estamos al principio de la página, resaltar "Sobre mí"
  if (window.scrollY < 100) {
    navLinks.forEach(l => l.classList.remove('active'));
    navLinks[0].classList.add('active');
  }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

// Inicialización del portafolio
console.log('Portafolio inicializado correctamente.');

// Función para manejar menús desplegables (Popovers)
function setupPopover(triggerId, menuId) {
  const trigger = document.getElementById(triggerId);
  const menu = document.getElementById(menuId);

  if (!trigger || !menu) return;

  // Toggle al hacer click
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Cerrar otros menús abiertos
    document.querySelectorAll('.ui-popover-menu.show').forEach(openMenu => {
      if (openMenu !== menu) openMenu.classList.remove('show');
    });

    menu.classList.toggle('show');
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !trigger.contains(e.target)) {
      menu.classList.remove('show');
    }
  });

  // Cerrar al seleccionar una opción (si es un link o acción directa)
  menu.querySelectorAll('a, button').forEach(option => {
    option.addEventListener('click', () => {
      // Pequeño delay opcional o cierre inmediato
      setTimeout(() => menu.classList.remove('show'), 150);
    });
  });
}

// Inicializar Menús
setupPopover('btn-email-trigger', 'email-menu');
setupPopover('btn-cv-trigger', 'cv-menu');

// Lógica Específica del Menú Email (Acciones)
const btnCopy = document.getElementById('btn-copy-action');
const toastNotification = document.getElementById('toast-notification');

if (btnCopy) {
  btnCopy.addEventListener('click', () => {
    const email = 'matiaschamorro163@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast();
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  });
}

function showToast() {
  if (!toastNotification) return;

  toastNotification.classList.add('show');

  // Ocultar después de 3 segundos
  setTimeout(() => {
    toastNotification.classList.remove('show');
  }, 3000);
}
