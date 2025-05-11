// // import React, { useState } from "react";
// // import { useCart } from "../context/CartProvider";

// // const CartPage = () => {
// //   const { cartItems, handleRemoveFromCart, clearCart } = useCart();
// //   const [showPaymentOptions, setShowPaymentOptions] = useState(false);
// //   const [selectedMethod, setSelectedMethod] = useState("");
// //   const [showConfirmation, setShowConfirmation] = useState(false);
// //   const [paymentDone, setPaymentDone] = useState(false);

// //   const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.specialPrice, 0);

// //   const handleCheckout = () => {
// //     setShowConfirmation(true);
// //   };

// //   const handleSelectMethod = (method) => {
// //     setSelectedMethod(method);
// //     setShowPaymentOptions(false);
// //   };

// //   const handleConfirmPayment = () => {
// //     setPaymentDone(true);
// //     setShowConfirmation(false);
// //     clearCart(); // Giỏ hàng sẽ được xóa
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

// // export default CartPage;
// import React, { useState } from "react";
// import { useCart } from "../context/CartProvider";

// const CartPage = () => {
//   const { cartItems, handleRemoveFromCart, clearCart } = useCart();
//   const [showPaymentOptions, setShowPaymentOptions] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [paymentDone, setPaymentDone] = useState(false);

//   const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.specialPrice, 0);

//   const handleCheckout = () => {
//     setShowConfirmation(true);
//   };

//   const handleSelectMethod = (method) => {
//     setSelectedMethod(method);
//     setShowPaymentOptions(false);
//   };

//   const handleConfirmPayment = () => {
//     setPaymentDone(true); // Đánh dấu thanh toán đã hoàn tất
//     setShowConfirmation(false); // Đóng modal xác nhận thanh toán
//     clearCart(); // Xóa giỏ hàng
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

// export default CartPage;
// src/components/CartPage.js
import React, { useState } from "react";
import { useCart } from "../context/CartProvider";

const CartPage = () => {
  const { cartItems, handleRemoveFromCart, clearCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.specialPrice, 0);

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPayment = () => {
    clearCart();              // Xóa giỏ hàng
    setShowConfirmation(false);
    setPaymentDone(true);     // Đánh dấu đã thanh toán xong
  };

  if (cartItems.length === 0 && !paymentDone) {
    return <div>Giỏ hàng của bạn hiện tại trống.</div>;
  }

  return (
    <section className="section-content bg-white padding-y">
      <div className="container">
        <h2 className="text-center mb-4">Giỏ Hàng Của Bạn</h2>

        {paymentDone && (
          <div className="alert alert-success text-center">
            <h4>Cảm ơn bạn đã mua hàng!</h4>
          </div>
        )}

        {cartItems.length > 0 && (
          <>
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
                  {cartItems.map(item => (
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
              <button className="btn btn-success" onClick={handleCheckout}>
                Thanh Toán
              </button>
            </div>
          </>
        )}

        {/* Modal xác nhận thanh toán */}
        {showConfirmation && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Xác nhận thanh toán</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowConfirmation(false)}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Bạn có chắc chắn muốn thanh toán đơn hàng trị giá{" "}
                    <strong>{totalAmount} $$</strong> không?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleConfirmPayment}
                  >
                    Xác nhận thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
