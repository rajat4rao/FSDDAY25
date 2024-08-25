import React, { createContext, useContext, useState } from 'react';
import productsData from '../data/products.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(productsData.products.map(product => ({ ...product, quantity: 1 })));

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? newQuantity === 0
            ? null
            : { ...item, quantity: newQuantity }
          : item
      ).filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        updateQuantity,
        removeFromCart,
        getTotalQuantity,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);