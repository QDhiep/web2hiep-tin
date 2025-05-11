// src/components/ProductCard.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartProvider';  // Import CartContext

const ProductCard = ({ product }) => {
  const { handleAddToCart } = useContext(CartContext);  // Sử dụng useContext để lấy handleAddToCart từ CartContext

  const handleAddClick = () => {
    handleAddToCart(product);  // Thêm sản phẩm vào giỏ hàng
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.productName} />
      <h5>{product.productName}</h5>
      <p>{product.price} $$</p>
      <button onClick={handleAddClick} className="btn btn-primary">
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductCard;
