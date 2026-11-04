document.getElementById('formLogin').addEventListener('submit', async function(e) {
  e.preventDefault();

  const correo = document.getElementById('correo').value.trim();
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('loginError');
  const btnLogin = document.getElementById('btnLogin');

  errorDiv.hidden = true;
  btnLogin.disabled = true;
  btnLogin.textContent = 'Verificando...';

  try {
    const response = await fetch(CONFIG.SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'login',
        correo: correo,
        password: password
      })
    });

    const data = await response.json();

    if (data.status === 'success') {
      // Guardar sesión del usuario en localStorage
      localStorage.setItem('user_session', JSON.stringify({
        token: data.token,
        nombre: data.nombre,
        correo: data.correo,
        rol: data.rol // 'ADMIN' o 'COMERCIAL'
      }));

      // Redirigir al panel principal
      window.location.href = 'dashboard.html';
    } else {
      errorDiv.textContent = data.message || 'Credenciales incorrectas.';
      errorDiv.hidden = false;
    }
  } catch (err) {
    errorDiv.textContent = 'Error de conexión con el servidor.';
    errorDiv.hidden = false;
  } finally {
    btnLogin.disabled = false;
    btnLogin.textContent = 'Ingresar';
  }
});