// // // // src/context/CartProvider.js
// // // import React, { createContext, useState, useEffect } from 'react';

// // // // Tạo context giỏ hàng
// // // export const CartContext = createContext();

// // // const CartProvider = ({ children }) => {
// // //   const [cartItems, setCartItems] = useState([]);

// // //   // Lưu trữ giỏ hàng vào localStorage khi thay đổi
// // //   useEffect(() => {
// // //     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
// // //     setCartItems(savedCart);
// // //   }, []);

// // //   useEffect(() => {
// // //     localStorage.setItem('cart', JSON.stringify(cartItems));
// // //   }, [cartItems]);

// // //   const handleAddToCart = (product) => {
// // //     setCartItems((prevItems) => {
// // //       const existingItem = prevItems.find(item => item.productId === product.productId);
// // //       if (existingItem) {
// // //         return prevItems.map(item =>
// // //           item.productId === product.productId
// // //             ? { ...item, quantity: item.quantity + 1 }
// // //             : item
// // //         );
// // //       } else {
// // //         return [...prevItems, { ...product, quantity: 1 }];
// // //       }
// // //     });
// // //   };

// // //   const handleRemoveFromCart = (productId) => {
// // //     setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
// // //   };

// // //   return (
// // //     <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart }}>
// // //       {children}
// // //     </CartContext.Provider>
// // //   );
// // // };

// // // export default CartProvider;
// // import React, { createContext, useState, useEffect } from 'react';

// // // Tạo context giỏ hàng
// // export const CartContext = createContext()  ;

// // const CartProvider = ({ children }) => {
// //   const [cartItems, setCartItems] = useState([]);

// //   // Lấy giỏ hàng từ localStorage khi component mount
// //   useEffect(() => {
// //     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
// //     setCartItems(savedCart);
// //   }, []);

// //   // Cập nhật localStorage mỗi khi giỏ hàng thay đổi
// //   useEffect(() => {
// //     localStorage.setItem('cart', JSON.stringify(cartItems));
// //   }, [cartItems]);

// //   // Thêm sản phẩm vào giỏ hàng
// //   const handleAddToCart = (product) => {
// //     setCartItems((prevItems) => {
// //       const existingItem = prevItems.find(item => item.productId === product.productId);
// //       if (existingItem) {
// //         return prevItems.map(item =>
// //           item.productId === product.productId
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         );
// //       } else {
// //         return [...prevItems, { ...product, quantity: 1 }];
// //       }
// //     });
// //   };

// //   // Xoá sản phẩm khỏi giỏ hàng
// //   const handleRemoveFromCart = (productId) => { 
// //     setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
// //   };

// //   // Xoá toàn bộ giỏ hàng
// //   const clearCart = () => {
// //     setCartItems([]);
// //   };

// //   return (
// //     <CartContext.Provider
// //       value={{
// //         cartItems,
// //         handleAddToCart,
// //         handleRemoveFromCart,
// //         clearCart
// //       }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export default CartProvider;
// import React, { createContext, useContext, useState } from "react";

// // Tạo Context cho Giỏ hàng
// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Hàm thêm sản phẩm vào giỏ hàng
//   const addToCart = (product, quantity) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.productId === product.productId);
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.productId === product.productId
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prevItems, { ...product, quantity }];
//     });
//   };

//   // Hàm xóa sản phẩm khỏi giỏ hàng
//   const handleRemoveFromCart = (productId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, handleRemoveFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Tạo hook sử dụng CartContext
// export const useCart = () => useContext(CartContext);
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]); // Đặt giỏ hàng về mảng rỗng
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, handleRemoveFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
