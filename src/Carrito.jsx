import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import logoDeProyecto from './imagenes/logoProyecto.png';
import './Carrito.css';

function Carrito() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { cart, getTotal, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/Categorias?search=${searchTerm}`);
  };

  const handleNavigation = (path) => () => navigate(path);

  return (
    <div>
      <header className="Inicio-header">
        <div className="contenedor-general">
          <Link to="/">
            <img src={logoDeProyecto} className="contenedor-logo" alt="Logo Proyecto" />
          </Link>
        </div>
        <nav className="Inicio-nav">
          <ul>
            <li><button onClick={handleNavigation('/PerfilUsuario')} className="barra_navegacionin">Perfil</button></li>
            <li><button onClick={handleNavigation('/InicioSesion')} className="barra_navegacionin">Inicio</button></li>
            <li><button onClick={handleNavigation('/Registro')} className="barra_navegacionin">Registro</button></li>
            <li><button onClick={handleNavigation('/Contacto')} className="barra_navegacionin">Contacto</button></li>
            <li><button onClick={handleNavigation('/FormularioPago')} className="carrito-comprasre">🛒 </button></li>
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

      <main className="carrito-main">
        <h2 className="carrito-h2">Carrito de compras</h2>
        <div className="carrito-productos-grid">
          {cart.map((product) => (
            <div key={product.id_producto} className="carrito-producto-item">
              <img src={product.imagen} alt={product.nombre} className="carrito-producto-imagen" />
              <div className="carrito-producto-detalles">
                <h3 className="carrito-producto-nombre">{product.nombre}</h3>
                <p className="carrito-producto-precio">Precio: ${product.precio}</p>
                <div className="carrito-producto-cantidad">
                  <button onClick={() => updateQuantity(product.id_producto, -1)} className="carrito-button">-</button>
                  <span className="carrito-cantidad">{product.quantity}</span>
                  <button onClick={() => updateQuantity(product.id_producto, 1)} className="carrito-button">+</button>
                </div>
                <button onClick={() => removeFromCart(product.id_producto)} className="carrito-button eliminar">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        <h3 className="carrito-total">Total: ${getTotal()}</h3>
        <Link to="/FormularioPago" className="carrito-boton-pago">Proceder al Pago</Link>
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

export default Carrito;
