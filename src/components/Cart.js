import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const [customQuantity, setCustomQuantity] = useState(item.quantity);
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    setCustomQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '10+') {
      setShowCustomInput(true);
    } else {
      updateQuantity(item.id, Number(value));
    }
  };

  const handleCustomQuantityUpdate = () => {
    const quantity = Number(customQuantity);
    if (quantity >= 0) {
      if (quantity === 0) {
        removeFromCart(item.id);
      } else {
        updateQuantity(item.id, quantity);
        if (quantity <= 9) {
          setShowCustomInput(false);
        }
      }
    }
  };

  const handleCustomInputChange = (e) => {
    setCustomQuantity(e.target.value);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img src={item.image} alt={item.title} className="cart-item-image" />
      </div>
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="price">${item.price.toFixed(2)}</p>
        <p className="description">{item.description}</p>
        <p className="category">Category: {item.category}</p>
        <p className="rating">Rating: {item.rating.rate} ({item.rating.count} reviews)</p>
        <div className="quantity-controls">
          {!showCustomInput ? (
            <select value={item.quantity} onChange={handleQuantityChange}>
              <option value="0">0 (Delete)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
              <option value="10+">10+</option>
            </select>
          ) : (
            <div className="custom-quantity">
              <input
                type="number"
                value={customQuantity}
                onChange={handleCustomInputChange}
                onFocus={() => setCustomQuantity('')}
                min="0"
              />
              {customQuantity !== '' && customQuantity !== item.quantity.toString() && (
                <button onClick={handleCustomQuantityUpdate}>Update</button>
              )}
            </div>
          )}
          <button className="delete-button" onClick={() => removeFromCart(item.id)}>
            <span className="material-icons">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalQuantity, getTotalAmount } = useCart();

  const subtotal = getTotalAmount();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="cart">
      <h2>Your Cart ({getTotalQuantity()} items)</h2>
      {cart.map((item) => (
        <CartItem 
          key={item.id} 
          item={item} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart}
        />
      ))}
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span className="free-shipping">FREE</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;