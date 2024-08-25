import React from 'react';
import { CartProvider } from './components/CartContext';
import Header from './components/Header';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  return (
    <CartProvider>
      <div className="app">
        <Header />
          <Cart />
      </div>
    </CartProvider>
  );
};

export default App;