import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoDeProyecto from './imagenes/logoProyecto.png';
import './InicioSesion.css';

function InicioSesion() {
  const [email, setEmail] = useState("");    
  const [password, setPassword] = useState("");  
  const [mensaje, setMensaje] = useState("");
  const [isRecovering, setIsRecovering] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const ENVIARDATOS = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/conexion.php/controlador/crud_funciones/inicio_controlador.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accion: isRecovering ? 'recuperar_clave' : 'iniciar_sesion',
          email,
          password
        }),
      });

      const textResponse = await response.text();
      let result;
      try {
        result = JSON.parse(textResponse);
      } catch (jsonError) {
        setMensaje('Error en la respuesta del servidor');
        return;
      }

      if (result.success) {
        // Almacenar los datos del usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(result.usuario));
        setMensaje('Se ha iniciado sesión correctamente');

        setTimeout(() => {
          navigate('/'); // Cambié la ruta a la página de inicio
        }, 2000);
      } else {
        setMensaje(result.error || 'Hubo un error al iniciar sesión');
      }
    } catch (error) {
      setMensaje('Error en la operación');
    }
  };

  const handleBusqueda = (e) => {
    e.preventDefault();
    navigate(`/Categorias?search=${busqueda}`);
  };

  const handleNavigation = (path) => () => navigate(path);

  return (
    <div>
      <header className="Inicio-header">
        <div className="contenedor-general">
        <Link to="/">
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

        <form onSubmit={handleBusqueda} className="Inicio-busqueda">
          <input 
            type="text" 
            placeholder="BUSCAR PRODUCTOS..." 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)} 
          />
          <button type="submit" >Buscar</button>
        </form>
      </header>

      {/* Main */}
      <main>
        <form onSubmit={ENVIARDATOS} method="post" className="formulario">
          <h3>{isRecovering ? "Recuperar Contraseña" : "Inicio de sesión"}</h3>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          {!isRecovering && (
            <>
              <label htmlFor="password">Clave:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </>
          )}

          {isRecovering ? (
            <button type="submit" className="submit-button">Enviar correo de recuperación</button>
          ) : (
            <>
              <div className="form-group">
                <input 
                  type="checkbox" 
                  id="terminos-condiciones" 
                  onClick={() => setIsRecovering(!isRecovering)}
                />
                <label htmlFor="terminos-condiciones">Olvidó usuario o clave</label>
              </div>
              <button type="submit" className="submit-button">Iniciar</button>
            </>
          )}
          {mensaje && <p className="mensaje">{mensaje}</p>}
        </form>
      </main>

      {/* Footer */}
      <footer className="footers">
        <p>Derechos de autor 2024 | Mi página web</p>
      </footer>
    </div>
  );
}

export default InicioSesion;
