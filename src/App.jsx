import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Categorias from './Categorias';
import Inicio from './Index'; // Asegúrate de importar el componente correcto
import InicioSesion from './InicioSesion';
import Registro from './Registro';
import Contacto from './Contacto';
import { CartProvider } from './CartContext';
import Carrito from './Carrito';
import FormularioPago from './FormularioPago';
import PerfilUsuario from './PerfilUsuario'; // Importa correctamente el componente

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  React.useEffect(() => {
    let title = 'SUPERMERCADO: LA MANO DE DIOS'; // Título base de tu sitio

    switch (location.pathname) {
      case '/':
        title = 'Inicio';
        break;
      case '/Categorias':
        title = 'Categorías';
        break;
      case '/InicioSesion':
        title = 'Inicio de Sesión';
        break;
      case '/Registro':
        title = 'Registro de Usuarios';
        break;
      case '/PerfilUsuario':  // Cambia el título al navegar a PerfilUsuario
        title = 'Perfil del Usuario';
        break;
      case '/Contacto':
        title = 'Contacto';
        break;
      case '/FormularioPago':
        title = 'Formulario de Pago';
        break;
      default:
        title = 'SUPERMERCADO: LA MANO DE DIOS';
    }

    document.title = title;
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/Categorias" element={<Categorias />} />
      <Route path="/InicioSesion" element={<InicioSesion />} />
      <Route path="/Registro" element={<Registro />} />
      <Route path="/Contacto" element={<Contacto />} />
      <Route path="/Carrito" element={<Carrito />} />
      <Route path="/FormularioPago" element={<FormularioPago />} />
      <Route path="/PerfilUsuario" element={<PerfilUsuario />} /> {/* Nueva ruta agregada */}
    </Routes>
  );
}

export default App;
