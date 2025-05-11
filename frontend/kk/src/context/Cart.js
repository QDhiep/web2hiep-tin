// // // // import React, { createContext, useContext, useState, useEffect } from 'react';

// // // // const CartContext = createContext(); // Tạo context

// // // // export const useCart = () => useContext(CartContext);  // Tạo hook `useCart`

// // // // export const CartProvider = ({ children }) => {
// // // //   const [cartItems, setCartItems] = useState([]);

// // // //   // Lưu trữ giỏ hàng vào localStorage
// // // //   useEffect(() => {
// // // //     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
// // // //     setCartItems(savedCart);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     // Cập nhật giỏ hàng vào localStorage
// // // //     localStorage.setItem('cart', JSON.stringify(cartItems));
// // // //   }, [cartItems]);

// // // //   const handleAddToCart = (product) => {
// // // //     setCartItems((prevItems) => {
// // // //       const existingItem = prevItems.find(item => item.productId === product.productId);
// // // //       if (existingItem) {
// // // //         return prevItems.map(item =>
// // // //           item.productId === product.productId
// // // //             ? { ...item, quantity: item.quantity + 1 }
// // // //             : item
// // // //         );
// // // //       } else {
// // // //         return [...prevItems, { ...product, quantity: 1 }];
// // // //       }
// // // //     });
// // // //   };

// // // //   const handleRemoveFromCart = (productId) => {
// // // //     setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
// // // //   };

// // // //   return (
// // // //     <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart }}>
// // // //       {children}
// // // //     </CartContext.Provider>
// // // //   );
// // // // };

// // // // export { CartContext };  // Thêm dòng này để xuất CartContext
// // // import React, { createContext, useContext, useState } from "react";

// // // const CartContext = createContext();

// // // export const CartProvider = ({ children }) => {
// // //   const [cartItems, setCartItems] = useState([]);

// // //   const addToCart = (product, quantity) => {
// // //     setCartItems(prevItems => {
// // //       const existingItem = prevItems.find(item => item.productId === product.productId);
// // //       if (existingItem) {
// // //         return prevItems.map(item =>
// // //           item.productId === product.productId
// // //             ? { ...item, quantity: item.quantity + quantity }
// // //             : item
// // //         );
// // //       }
// // //       return [...prevItems, { ...product, quantity }];
// // //     });
// // //   };

// // //   const handleRemoveFromCart = (productId) => {
// // //     setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
// // //   };

// // //   return (
// // //     <CartContext.Provider value={{ cartItems, addToCart, handleRemoveFromCart }}>
// // //       {children}
// // //     </CartContext.Provider>
// // //   );
// // // };

// // // export const useCart = () => useContext(CartContext);
// // // src/components/Cart.js
// // import React, { useState } from "react";
// // import { useCart } from "../context/CartProvider"; // Import useCart từ CartProvider

// // const Cart = () => {
// //   const { cartItems, handleRemoveFromCart, clearCart } = useCart(); // Lấy giỏ hàng và các hàm
// //   const [showConfirmation, setShowConfirmation] = useState(false);
// //   const [paymentDone, setPaymentDone] = useState(false);
// //   const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.specialPrice, 0);

// //   const handleCheckout = () => {
// //     setShowConfirmation(true);
// //   };

// //   const handleConfirmPayment = () => {
// //     setPaymentDone(true);
// //     setShowConfirmation(false);
// //     clearCart(); // Gọi clearCart để xóa giỏ hàng sau khi thanh toán
// //   };

// //   if (cartItems.length === 0) {
// //     return <div>Giỏ hàng của bạn hiện tại trống.</div>;
// //   }

// //   if (paymentDone) {
// //     return (
// //       <div className="text-center mt-5">
// //         <h2>Cảm ơn bạn! Đơn hàng của bạn đã được thanh toán thành công 🎉</h2>
// //       </div>
// //     );
// //   }

// //   return (
// //     <section className="section-content bg-white padding-y">
// //       <div className="container">
// //         <h2 className="text-center mb-4">Giỏ Hàng Của Bạn</h2>
// //         <div className="table-responsive">
// //           <table className="table table-striped">
// //             <thead>
// //               <tr>
// //                 <th>Hình ảnh</th>
// //                 <th>Tên sản phẩm</th>
// //                 <th>Số lượng</th>
// //                 <th>Đơn giá</th>
// //                 <th>Thành tiền</th>
// //                 <th></th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {cartItems.map((item) => (
// //                 <tr key={item.productId}>
// //                   <td>
// //                     <img
// //                       src={`http://localhost:8080/api/public/products/image/${item.image}`}
// //                       alt={item.productName}
// //                       width="50"
// //                     />
// //                   </td>
// //                   <td>{item.productName}</td>
// //                   <td>{item.quantity}</td>
// //                   <td>{item.specialPrice} $$</td>
// //                   <td>{item.quantity * item.specialPrice} $$</td>
// //                   <td>
// //                     <button
// //                       className="btn btn-danger"
// //                       onClick={() => handleRemoveFromCart(item.productId)}
// //                     >
// //                       Xóa
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div className="text-right mt-4">
// //           <h3>Tổng cộng: {totalAmount} $$</h3>
// //         </div>

// //         <div className="text-right mt-3">
// //           <button className="btn btn-success" onClick={handleCheckout}>Thanh Toán</button>
// //         </div>

// //         {showConfirmation && (
// //           <div className="modal show d-block" tabIndex="-1" role="dialog">
// //             <div className="modal-dialog" role="document">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h5 className="modal-title">Xác nhận thanh toán</h5>
// //                   <button type="button" className="close" onClick={() => setShowConfirmation(false)}>
// //                     <span>&times;</span>
// //                   </button>
// //                 </div>
// //                 <div className="modal-body">
// //                   <p>Bạn có chắc chắn muốn thanh toán đơn hàng trị giá <strong>{totalAmount} $$</strong> không?</p>
// //                 </div>
// //                 <div className="modal-footer">
// //                   <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Hủy</button>
// //                   <button className="btn btn-success" onClick={handleConfirmPayment}>Xác nhận thanh toán</button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default Cart;
// import React, { useState } from "react";
// import { useCart } from "../context/CartProvider"; // Import useCart từ CartProvider

// const Cart = () => {
//   const { cartItems, handleRemoveFromCart, clearCart } = useCart(); // Lấy giỏ hàng và các hàm
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [paymentDone, setPaymentDone] = useState(false);
//   const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.specialPrice, 0);

//   const handleCheckout = () => {
//     setShowConfirmation(true);
//   };

//   const handleConfirmPayment = () => {
//     setPaymentDone(true);  // Đánh dấu thanh toán hoàn tất
//     setShowConfirmation(false);  // Đóng modal xác nhận thanh toán
//     clearCart(); // Gọi clearCart để xóa giỏ hàng sau khi thanh toán
//   };

//   if (cartItems.length === 0) {
//     return <div>Giỏ hàng của bạn hiện tại trống.</div>;
//   }

//   if (paymentDone) {
//     return (
//       <div className="text-center mt-5">
//         <h2>Cảm ơn bạn! Đơn hàng của bạn đã được thanh toán thành công 🎉</h2>
//       </div>
//     );
//   }

//   return (
//     <section className="section-content bg-white padding-y">
//       <div className="container">
//         <h2 className="text-center mb-4">Giỏ Hàng Của Bạn</h2>
//         <div className="table-responsive">
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Hình ảnh</th>
//                 <th>Tên sản phẩm</th>
//                 <th>Số lượng</th>
//                 <th>Đơn giá</th>
//                 <th>Thành tiền</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.productId}>
//                   <td>
//                     <img
//                       src={`http://localhost:8080/api/public/products/image/${item.image}`}
//                       alt={item.productName}
//                       width="50"
//                     />
//                   </td>
//                   <td>{item.productName}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.specialPrice} $$</td>
//                   <td>{item.quantity * item.specialPrice} $$</td>
//                   <td>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleRemoveFromCart(item.productId)}
//                     >
//                       Xóa
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="text-right mt-4">
//           <h3>Tổng cộng: {totalAmount} $$</h3>
//         </div>

//         <div className="text-right mt-3">
//           <button className="btn btn-success" onClick={handleCheckout}>Thanh Toán</button>
//         </div>

//         {showConfirmation && (
//           <div className="modal show d-block" tabIndex="-1" role="dialog">
//             <div className="modal-dialog" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Xác nhận thanh toán</h5>
//                   <button type="button" className="close" onClick={() => setShowConfirmation(false)}>
//                     <span>&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <p>Bạn có chắc chắn muốn thanh toán đơn hàng trị giá <strong>{totalAmount} $$</strong> không?</p>
//                 </div>
//                 <div className="modal-footer">
//                   <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Hủy</button>
//                   <button className="btn btn-success" onClick={handleConfirmPayment}>Xác nhận thanh toán</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Cart;
import React, { useState } from "react";
import { useCart } from "../context/CartProvider"; // Import useCart từ CartProvider

const Cart = () => {
  const { cartItems, handleRemoveFromCart, clearCart } = useCart(); // Lấy giỏ hàng và các hàm
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false); // Thêm state để hiển thị thông báo
  const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.specialPrice, 0);

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPayment = () => {
    setPaymentDone(true);  // Đánh dấu thanh toán hoàn tất
    setShowConfirmation(false);  // Đóng modal xác nhận thanh toán
    clearCart(); // Gọi clearCart để xóa giỏ hàng sau khi thanh toán
    setShowThankYouMessage(true); // Hiển thị thông báo cảm ơn
  };

  if (cartItems.length === 0) {
    return <div>Giỏ hàng của bạn hiện tại trống.</div>;
  }

  return (
    <section className="section-content bg-white padding-y">
      <div className="container">
        <h2 className="text-center mb-4">Giỏ Hàng Của Bạn</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <img
                      src={`http://localhost:8080/api/public/products/image/${item.image}`}
                      alt={item.productName}
                      width="50"
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.specialPrice} $$</td>
                  <td>{item.quantity * item.specialPrice} $$</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.productId)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right mt-4">
          <h3>Tổng cộng: {totalAmount} $$</h3>
        </div>

        <div className="text-right mt-3">
          <button className="btn btn-success" onClick={handleCheckout}>Thanh Toán</button>
        </div>

        {showConfirmation && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Xác nhận thanh toán</h5>
                  <button type="button" className="close" onClick={() => setShowConfirmation(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Bạn có chắc chắn muốn thanh toán đơn hàng trị giá <strong>{totalAmount} $$</strong> không?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Hủy</button>
                  <button className="btn btn-success" onClick={handleConfirmPayment}>Xác nhận thanh toán</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hiển thị thông báo cảm ơn */}
        {showThankYouMessage && (
          <div className="alert alert-success text-center mt-4">
            <h4>Cảm ơn bạn đã thanh toán! Đơn hàng của bạn đã được hoàn tất 🎉</h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
