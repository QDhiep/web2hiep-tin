import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GET_ID } from "../../api/apiService";
import { useCart } from "../../context/Cart";

const Detail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (productId) {
      GET_ID("products", productId)
        .then((response) => setProduct(response))
        .catch((error) => console.error("Failed to fetch product details:", error));
    }
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => addToCart(product, quantity);

  return (
    <section className="section-content bg-white padding-y">
      <div className="container">
        <div className="row">
          <aside className="col-md-6">
            <div className="card">
              <article className="gallery-wrap">
                <div className="img-big-wrap">
                  <div>
                    <a href="#">
                      <img
                        src={`http://localhost:8080/api/public/products/image/${product.image}`}
                        alt={product.productName}
                      />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </aside>
          <main className="col-md-6">
            <article className="product-info-aside">
              <h2 className="title mt-3">{product.productName}</h2>
              <div className="mb-3">
                <var className="price h5 mr-3">{product.specialPrice} $$</var>
                <del className="text-muted">{product.price} $$</del>
              </div>
              <p>{product.description}</p>
              <div className="form-row mt-4">
                <div className="col-md-8">
                  <div className="input-group mb-3 input-spinner">
                    <div className="input-group-prepend">
                      <button className="btn btn-light" type="button" onClick={handleDecrease}>−</button>
                    </div>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={quantity}
                      readOnly
                    />
                    <div className="input-group-append">
                      <button className="btn btn-light" type="button" onClick={handleIncrease}>+</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary" onClick={handleAddToCart}><i className="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Detail;