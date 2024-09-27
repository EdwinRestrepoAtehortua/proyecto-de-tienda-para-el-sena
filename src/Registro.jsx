import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoDeProyecto from './imagenes/logoProyecto.png';
import './Registro.css';
import apiConfig from './apiConfig';

function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [foto, setFoto] = useState(null); // Almacenar la foto cargada
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const ENVIARDATOS = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Utilizar FormData para enviar archivos
    formData.append("accion", "crear_usuario");
    formData.append("nombre", nombre);
    formData.append("apellidos", apellidos);
    formData.append("email", email);
    formData.append("telefono", telefono);
    formData.append("password", password);
    formData.append("direccion", direccion);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const response = await fetch(`${apiConfig.apiUrl}registro_controlador.php`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      console.log('Respuesta del servidor:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        throw new Error('Error al analizar JSON: ' + jsonError.message);
      }

      console.log(result);

      if (result.success) {
        alert(result.success);
        navigate('/InicioSesion'); // Redirigir a la página de inicio de sesión
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con el registro. Inténtalo de nuevo más tarde.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/Categorias?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleNavigation = (path) => () => navigate(path);

  return (
    <div>
      <header className="Inicio-header">
        <div className="contenedor-general">
          <Link to="/" onClick={handleNavigation('/')}>
            <img src={logoDeProyecto} className="contenedor-logo" alt="Encabezado" />
          </Link>
        </div>

        <nav className="Inicio-nav">
          <ul>
            <li><button onClick={handleNavigation('/PerfilUsuario')} className="barra_navegacionin">Perfil</button></li>
            <li><button onClick={handleNavigation('/InicioSesion')} className="barra_navegacionin">Inicio</button></li>
            <li><button onClick={handleNavigation('/Registro')} className="barra_navegacionin">Registro</button></li>
            <li><button onClick={handleNavigation('/Contacto')} className="barra_navegacionin">Contacto</button></li>
            <li><button onClick={handleNavigation('/Carrito')} className="carrito-comprasre">🛒 </button></li>
          </ul>
        </nav>

        <form className="Inicio-busqueda" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="BUSCAR PRODUCTOS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        <form onSubmit={ENVIARDATOS} className="formulario" encType="multipart/form-data">
          <h3>Formulario de registro</h3>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label>Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Telefono:</label>
          <input
            type="tel"
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
          {/*<label>Foto de Perfil:</label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
          />*/}
          <div className="terminos-condiciones">
            <input type="checkbox" id="terminos-condiciones" required />
            <label htmlFor="terminos-condiciones">Acepto términos y condiciones</label>
          </div>
          <input type="submit" value="Registrarse" />
        </form>
      </main>

      <footer className="footerr">
        <p>Derechos de autor 2024 | Mi página web</p>
      </footer>
    </div>
  );
}

export default Registro;
