import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PerfilUsuario.css';
import logoDeProyecto from './imagenes/logoProyecto.png';
import fotoPerfilPredeterminada from './imagenes/fotoPredeterminada.jpg';

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      const datosUsuario = JSON.parse(usuarioLogueado);
      setUsuario(datosUsuario);

      setDireccion(datosUsuario.Direccion || '');
      setNombre(datosUsuario.nombre || '');
      setApellidos(datosUsuario.apellidos || '');
      setCorreo(datosUsuario.email || '');
      setTelefono(datosUsuario.telefono || '');
    } else {
      navigate('/InicioSesion');
    }
  }, [navigate]);

  const handleGuardarCambios = async () => {
    const datosActualizados = {
      id_usuario: usuario.id_usuario,
      nombre,
      apellidos,
      email: correo,
      telefono,
      Direccion: direccion,
    };

    try {
      const formData = new FormData();
      formData.append('id_usuario', datosActualizados.id_usuario);
      formData.append('nombre', datosActualizados.nombre);
      formData.append('apellidos', datosActualizados.apellidos);
      formData.append('email', datosActualizados.email);
      formData.append('telefono', datosActualizados.telefono);
      formData.append('Direccion', datosActualizados.Direccion);

      const response = await fetch('http://localhost/conexion.php/controlador/control_registro/actualizar_usuario.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('usuario', JSON.stringify(datosActualizados));
        alert('Datos actualizados correctamente');
        setEditMode(false);
      } else {
        alert(result.message || 'Error al actualizar datos');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/InicioSesion');
  };

  const handleEliminarCuenta = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      try {
        const formData = new FormData();
        formData.append('id_usuario', usuario.id_usuario);

        const response = await fetch('http://localhost/conexion.php/controlador/control_registro/eliminar_usuario.php', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          localStorage.removeItem('usuario');
          alert('Cuenta eliminada correctamente');
          navigate('/InicioSesion');
        } else {
          alert(result.message || 'Error al eliminar cuenta');
        }
      } catch (error) {
        console.error('Error al eliminar cuenta:', error);
      }
    }
  };

  if (!usuario) {
    return <p>Cargando...</p>;
  }

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

        <form onSubmit={(e) => { e.preventDefault(); navigate(`/Categorias?search=${searchTerm}`); }} className="Inicio-busqueda">
          <input 
            type="text" 
            placeholder="BUSCAR PRODUCTOS..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main className="perfil-container">
        <h2>Perfil de usuario</h2>
        <div className={`perfil-info ${editMode ? 'edit-mode' : ''}`}>
          <img src={fotoPerfilPredeterminada} alt="Foto de perfil" className="foto-perfil" />

          {!editMode && (
            <>
              <p><strong>Nombre:</strong> {nombre}</p>
              <p><strong>Apellidos:</strong> {apellidos}</p>
              <p><strong>Email:</strong> {correo}</p>
              <p><strong>Teléfono:</strong> {telefono}</p>
              <p><strong>Dirección:</strong> {direccion}</p>
            </>
          )}

          {editMode && (
            <>
              <p>Nombre:</p>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <p>Apellidos:</p>
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
              <p>Email:</p>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <p>Teléfono:</p>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <p>Dirección:</p>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </>
          )}
        </div>
    <div className='botones-container'>
        <button className="edit-button" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancelar' : 'Editar'}
        </button>
        
        {editMode && (
          <button className="edit-button" onClick={handleGuardarCambios}>Guardar cambios</button>
        )}
        
        <button className="logout-button" onClick={handleCerrarSesion}>Cerrar sesión</button>
        <button className="edit-button" onClick={handleEliminarCuenta}>Eliminar cuenta</button>
    </div>
      </main>

      <footer className="footerco">
        <p className="carrito-footer-p">Derechos de autor 2024 | Mi página web</p>
        <a href="https://wa.me/3001055840" target="_blank" rel="noopener noreferrer" className="carrito-whatsapp-link">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="carrito-whatsapp-logo" />
        </a>
      </footer>
    </div>
  );
}

export default PerfilUsuario;
