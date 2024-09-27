import React, { createContext, useState } from 'react';
import apiUrl from './apiConfig';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product, quantity = 1) => {
    const existingProduct = cart.find(p => p.id_producto === product.id_producto);
    if (existingProduct) {
      setCart(prevCart =>
        prevCart.map(p =>
          p.id_producto === product.id_producto
            ? { ...p, quantity: p.quantity + quantity }
            : p
        )
      );
    } else {
      const productWithQuantity = { ...product, quantity };
      setCart(prevCart => [...prevCart, productWithQuantity]);
    }

    await fetch(`${apiUrl}carrito.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_producto: product.id_producto,
        id_usuario: 1, // Reemplaza con el ID del usuario autenticado
        cantidad: quantity
      })
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(product => product.id_producto !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(prevCart =>
      prevCart.map(product =>
        product.id_producto === id
          ? { ...product, quantity: Math.max(1, product.quantity + quantity) }
          : product
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((acc, product) => acc + product.precio * product.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
