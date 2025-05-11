import React, { useState } from "react";
import { useCart } from "../../context/Cart";

const CartPage = () => {
  const { cartItems, handleRemoveFromCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.specialPrice,
    0
  );

  const handlePlaceOrder = () => {
    // Hiển thị hộp thoại xác nhận
    const confirmOrder = window.confirm(
      "Bạn có chắc chắn muốn đặt hàng không?"
    );

    if (confirmOrder) {
      // Xóa toàn bộ sản phẩm trong giỏ (nếu context không có hàm clearCart, có thể cần bổ sung)
      cartItems.length = 0;
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="text-center mt-5">
        <h2>Cảm ơn bạn đã mua hàng!</h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <div className="text-center mt-5">Giỏ hàng của bạn hiện tại trống.</div>;
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
          <h4>Tổng cộng: {totalAmount} $$</h4>
          <button className="btn btn-success mt-2" onClick={handlePlaceOrder}>
            Mua hàng
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;