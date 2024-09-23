const API_URL = "http://localhost/conexion.php/controlador/crud_funciones/actualizar_perfil.php"; // Cambia la URL según tu backend

const authService = {
  obtenerPerfil: async () => {
    const response = await fetch(`${API_URL}/obtener_perfil.php`, {
      credentials: 'include', // Incluir cookies para verificar sesión
    });
    return await response.json();
  },

  actualizarPerfil: async (usuario) => {
    const response = await fetch(`${API_URL}/actualizar_perfil.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
      credentials: 'include',
    });
    return await response.json();
  },
};

export default authService;
