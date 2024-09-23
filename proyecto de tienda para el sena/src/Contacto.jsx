import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoDeProyecto from './imagenes/logoProyecto.png';
import contactese from './imagenes/contacte_con_nosotros.jpg';
import './Contacto.css';
import apiConfig from './apiConfig';

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Añade este estado
  const navigateTo = useNavigate();

  const ENVIARDATOS = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiConfig.apiUrl}contacto_controlador.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accion: 'enviar_contacto',
          nombre,
          apellido,
          email,
          mensaje
        }),
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
        setNombre("");
        setApellido("");
        setEmail("");
        setMensaje("");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con el envío del mensaje. Inténtalo de nuevo más tarde.');
    }
  };

  const handleNavigation = (path) => () => navigateTo(path);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateTo(`/Categorias?search=${searchTerm}`);
  };

  return (
    <div>
      <header className="Inicio-header">
        <div className="contenedor-general">
          <Link to="/" onClick={handleNavigation('/')}>
            <img src={logoDeProyecto} className="contenedor-logo" alt="Encabezado" />
          </Link>
        </div>
        
        <nav>
        <ul>
            <li><button onClick={handleNavigation('/PerfilUsuario')} className="barra_navegacionin">Perfil</button></li>
            <li><button onClick={handleNavigation('/InicioSesion')} className="barra_navegacionin">Inicio</button></li>
            <li><button onClick={handleNavigation('/Registro')} className="barra_navegacionin">Registro</button></li>
            <li><button onClick={handleNavigation('/Contacto')} className="barra_navegacionin">Contacto</button></li>
            <li><button onClick={handleNavigation('/Carrito')} className="carrito-comprasre">🛒 </button></li>
          </ul>
        </nav>

        <form className="Inicio-busqueda" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="BUSCAR PRODUCTOS..."
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <div className="contenedor">
        <div className="formulario_contacto">
          <img src={contactese} className="imagen-contacto" alt="Contactese con nosotros" />
          <p>Teléfono: 3001055840</p>
          <p>Email: restrepoedwi172819@gmail.com</p>
          <p>Sitio web: Superlamanodedios.com</p>
        </div>

        <div className="formulario_registro">
          <form onSubmit={ENVIARDATOS}>
            <h2 className="h21">Escribanos</h2 >
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              id="message"
              name="message"
              placeholder="Mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
      
      <footer className="footerr">
        <p>Derechos de autor 2024 | Mi página web</p>
      </footer>
    </div>
  );
}

export default Contacto;
