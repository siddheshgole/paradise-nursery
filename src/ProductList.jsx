import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://via.placeholder.com/150', cost: '$15' },
      { name: 'Spider Plant', image: 'https://via.placeholder.com/150', cost: '$12' },
      { name: 'Peace Lily', image: 'https://via.placeholder.com/150', cost: '$20' },
    ],
  },
  {
    category: 'Succulents',
    plants: [
      { name: 'Aloe Vera', image: 'https://via.placeholder.com/150', cost: '$10' },
      { name: 'Echeveria', image: 'https://via.placeholder.com/150', cost: '$14' },
      { name: 'Jade Plant', image: 'https://via.placeholder.com/150', cost: '$18' },
    ],
  },
];

function Navbar({ onHome, onPlants, onCartClick }) {
  return (
    <nav className="navbar">
      <span onClick={onHome} style={{ cursor: 'pointer', marginRight: '20px' }}>Home</span>
      <span onClick={onPlants} style={{ cursor: 'pointer', marginRight: '20px' }}>Plants</span>
      <span onClick={onCartClick} style={{ cursor: 'pointer' }}>Cart</span>
    </nav>
  );
}

function ProductList({ onHome }) {
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
      <Navbar
        onHome={onHome}
        onPlants={() => setShowCart(false)}
        onCartClick={() => setShowCart(true)}
      />
      <div className="cart-icon" onClick={() => setShowCart(true)}>
        🛒 Cart ({totalQuantity})
      </div>
      {plantsArray.map((category) => (
        <div key={category.category}>
          <h2>{category.category}</h2>
          <div className="product-grid">
            {category.plants.map((plant) => (
              <div key={plant.name} className="product-card">
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>{plant.cost}</p>
                <button onClick={() => handleAddToCart(plant)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;