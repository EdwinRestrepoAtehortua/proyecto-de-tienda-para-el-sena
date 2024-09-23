import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoDeProyecto from './imagenes/logoProyecto.png';
import './Index.css';
import imagen1 from './imagenes/imagen1.jpeg';
import imagen2 from './imagenes/Despensa.jpg';
import imagen3 from './imagenes/ProductoAseo.jpg';

function Inicio() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigateTo = useNavigate();

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

        <nav className="Inicio-nav">
          <ul>
            <li><button onClick={handleNavigation('/PerfilUsuario')} className="barra_navegacionin">Perfil</button></li>
            <li><button onClick={handleNavigation('/InicioSesion')} className="barra_navegacionin">Inicio</button></li>
            <li><button onClick={handleNavigation('/Registro')} className="barra_navegacionin">Registro</button></li>
            <li><button onClick={handleNavigation('/Contacto')} className="barra_navegacionin">Contacto</button></li>
            <li><button onClick={handleNavigation('/Carrito')} className="carrito-comprasre">🛒</button></li>
          </ul>
        </nav>

        <form onSubmit={handleSearchSubmit} className="Inicio-busqueda">
          <input 
            type="text" 
            placeholder="BUSCAR PRODUCTOS..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main className="Inicio-main">
        <h2>20% Descuentos En Productos Seleccionados</h2>
        <div className="Inicio-contenedor">
          <Link to="/Categorias" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="Inicio-producto">
              <img src={imagen1} alt="Producto 1" />
              <h3>FRUTAS Y VERDURAS</h3>
              <p>Descubre nuestra amplia selección de frutas y verduras frescas, seleccionadas con esmero para ofrecerte la mejor calidad.</p>
            </div>
          </Link>
          <Link to="/Categorias" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="Inicio-producto">
              <img src={imagen2} alt="Producto 2" />
              <h3>PRODUCTOS ALIMENTICIOS</h3>
              <p>Explora nuestra amplia variedad de productos alimenticios, seleccionados para satisfacer todas tus necesidades culinarias.</p>
            </div>
          </Link>
          <Link to="/Categorias" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="Inicio-producto">
              <img src={imagen3} alt="Producto 3" />
              <h3>PRODUCTOS DE ASEO</h3>
              <p>Mantén tu hogar limpio y fresco con nuestra variedad de productos de aseo de alta calidad.</p>
            </div>
          </Link>
        </div>
      </main>

      <footer className="footerin">
        <p>Derechos de autor 2024 | Mi página web</p>
      </footer>
    </div>
  );
}

export default Inicio;
