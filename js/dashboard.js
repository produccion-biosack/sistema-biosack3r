document.addEventListener('DOMContentLoaded', () => {
  // 1. Verificar si hay sesión activa
  const sessionData = localStorage.getItem('user_session');

  if (!sessionData) {
    window.location.href = 'index.html'; // Redirigir al login si no está autenticado
    return;
  }

  const user = JSON.parse(sessionData);

  // 2. Cargar datos del usuario en la interfaz
  document.getElementById('userNombre').textContent = user.nombre;
  const badge = document.getElementById('userRolBadge');
  badge.textContent = user.rol;
  badge.classList.add(`badge-${user.rol}`);

  // 3. Control de Acceso por Rol (Mostrar/Ocultar secciones Admin)
  if (user.rol === 'ADMIN') {
    document.querySelectorAll('.admin-only').forEach(el => el.hidden = false);
  }

  // 4. Navegación entre pestañas
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Remover activo de botones y secciones
      navButtons.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // Activar el seleccionado
      btn.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // 5. Cierre de Sesión
  document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('user_session');
    window.location.href = 'index.html';
  });
});