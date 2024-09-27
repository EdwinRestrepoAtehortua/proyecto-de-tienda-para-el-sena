import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import logoDeProyecto from './imagenes/logoProyecto.png';
import './Categorias.css';

function Categorias() {
  const [productos, setProductos] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [showProduct, setShowProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null); // Estado para el usuario autenticado
  const { addToCart } = useContext(CartContext);
  const navigateTo = useNavigate();

  // Obtener los productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/conexion.php/controlador/crud_funciones/productos.php');
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        const data = await response.json();
        setProductos(data);
        setFilteredProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchProducts();
  }, []);

  // Filtrar productos según la búsqueda
  useEffect(() => {
    const resultados = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProductos(resultados);
    setMensaje(resultados.length === 0 ? "Producto no encontrado" : "");
  }, [searchQuery, productos]);

  // Obtener el usuario autenticado desde localStorage
  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      setUser(JSON.parse(usuarioLogueado)); // Establecer el usuario si está logueado
    }
  }, []);

  // Agregar producto al carrito con validación de sesión iniciada
  const handleAddToCart = (producto) => {
    if (user) { // Verifica si el usuario está autenticado
      addToCart(producto, quantities[producto.id_producto] || 1);
      setCartCount(cartCount + 1);
      setMensaje(`${producto.nombre} agregado al carrito`);
      setShowProduct(producto);
      setTimeout(() => setShowProduct(null), 3000); // Mostrar mensaje temporal
    } else {
      setMensaje("Debes iniciar sesión para agregar productos al carrito.");
      navigateTo('/InicioSesion'); // Redirigir al inicio de sesión si no está autenticado
    }
  };

  // Manejar cambios en la cantidad de productos
  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + change),
    }));
  };

  // Navegación
  const handleNavigation = (path) => () => navigateTo(path);

  // Manejar búsqueda de productos
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.elements.search.value);
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
            <li className="carrito-contenedor">
              <button onClick={handleNavigation('/Carrito')} className="carrito-comprasre">🛒</button>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </li>
          </ul>
        </nav>

        <form className="Inicio-busqueda" onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="BUSCAR PRODUCTOS..." />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <section className="categorias">
        <h2 className="titulo-productos">PRODUCTOS</h2>
        {mensaje && <p className="mensaje">{mensaje}</p>}
        {showProduct && (
          <div className="product-popup">
            <img src={showProduct.imagen} alt={showProduct.nombre} className="popup-imagen" />
            <p>{showProduct.nombre} agregado al carrito</p>
          </div>
        )}
        <div className="productos-grid">
          {filteredProductos.map(producto => (
            <div key={producto.id_producto} className={`producto ${searchQuery && producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ? 'highlight' : ''}`}>
              <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p>Precio: ${producto.precio}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(producto.id_producto, -1)}>-</button>
                  <span>{quantities[producto.id_producto] || 1}</span>
                  <button onClick={() => handleQuantityChange(producto.id_producto, 1)}>+</button>
                </div>
                <button className="agregar" onClick={() => handleAddToCart(producto)}>Agregar al carrito</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footerc">
        <p>Derechos de autor 2024 | Mi página web</p>
      </footer>

      {/* Estilos en línea */}
      <style jsx="true">{`
        .carrito-contenedor {
          position: relative;
          display: inline-block;
        }

        .carrito-comprasre {
          background-color: transparent;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .cart-count {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: red;
          color: white;
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 50%;
        }

        .productos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .producto {
          border: 1px solid #ccc;
          padding: 16px;
          text-align: center;
        }

        .producto-imagen {
          width: 100%;
          height: auto;
        }

        .quantity-controls button {
          background-color: #f0f0f0;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .agregar {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Categorias;
