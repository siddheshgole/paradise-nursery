import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  { name: 'Snake Plant', image: 'https://via.placeholder.com/150', cost: '$15' },
  { name: 'Aloe Vera', image: 'https://via.placeholder.com/150', cost: '$10' },
  { name: 'Peace Lily', image: 'https://via.placeholder.com/150', cost: '$20' },
];

function ProductList() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = React.useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => dispatch(addItem(plant));

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div className="product-list">
      <div className="cart-icon" onClick={() => setShowCart(true)}>
        🛒 Cart ({totalQuantity})
      </div>
      <h2>Our Plants</h2>
      <div className="product-grid">
        {plantsArray.map((plant) => (
          <div key={plant.name} className="product-card">
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.cost}</p>
            <button onClick={() => handleAddToCart(plant)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;