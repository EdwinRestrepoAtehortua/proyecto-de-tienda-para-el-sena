import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './FormularioPago.css';
import logoDeProyecto from './imagenes/logoProyecto.png';

function FormularioPago() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { getTotal } = useContext(CartContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/Categorias?search=${searchTerm}`);
  };

  const handlePayment = () => {
    const amount = getTotal();
    fetch('http://localhost/conexion.php/controlador/crud_funciones/mercado_pago_payment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        amount: amount.toString()
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        console.error('Error en la respuesta de Mercado Pago:', data.error);
        alert(`Error: ${data.error}`);
      } else {
        console.error('Error desconocido:', data);
        alert('Error desconocido al procesar el pago.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error en la solicitud de pago.');
    });
  };

  const handleNavigation = (path) => () => navigate(path);

  return (
    <div>
      <header className="Inicio-header">
        <div className="contenedor-general">
          <Link to="/">
            <img src={logoDeProyecto} className="carrito-logo" alt="Logo del Proyecto" />
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

      <main className="formulario-pago-main">
        <div className="formulario-pago">
          <h2 className="carrito-h2">Formulario de Pago</h2>
          <button onClick={handlePayment} className="carrito-boton-pago">Pagar</button>
        </div>
      </main>

      <Link to="/Carrito" className="carrito-return-button">⬅️</Link>

      <footer className="footerr">
        <p>Derechos de autor 2024 | Mi página web</p>
      </footer>
    </div>
  );
}

export default FormularioPago;
