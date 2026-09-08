import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (cost) => parseFloat(cost.replace('$', ''));

  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);

  const handleIncrement = (item) => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };
  const handleRemove = (item) => dispatch(removeItem(item.name));

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.name} className="cart-item">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.cost}</p>
          <div className="quantity-controls">
            <button onClick={() => handleDecrement(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrement(item)}>+</button>
          </div>
          <button onClick={() => handleRemove(item)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${calculateTotalAmount()}</h3>
      <button onClick={onContinueShopping}>Continue Shopping</button>
      <button onClick={() => alert('Coming soon!')}>Checkout</button>
    </div>
  );
}

export default CartItem;