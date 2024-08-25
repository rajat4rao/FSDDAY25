import React from 'react';
import { useCart } from './CartContext';

const Header = () => {
  const { getTotalQuantity } = useCart();

  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className="cart-icon">
        <span className="material-icons">shopping_cart</span>
        <span className="cart-count">{getTotalQuantity()}</span>
      </div>
    </header>
  );
};

export default Header;