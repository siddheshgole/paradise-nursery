import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => setShowProducts(true);

  if (showProducts) {
    return <ProductList />;
  }

  return (
    <div className="landing-page">
      <h1>Paradise Nursery</h1>
      <p>Where Green Meets Serenity</p>
      <button className="get-started-button" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default App;