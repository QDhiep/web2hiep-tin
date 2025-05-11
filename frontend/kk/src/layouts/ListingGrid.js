import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Fuse from "fuse.js";

function ListingGrid() {
  // Nhận state được truyền từ Header (trong đó chứa searchQuery và matchedProducts)
  const { state } = useLocation();
  const { matchedProducts = [], searchQuery = "" } = state || {};
  const [filteredProducts, setFilteredProducts] = useState(matchedProducts);

  useEffect(() => {
    // Nếu có sản phẩm được tìm kiếm (matchedProducts không rỗng)
    if (matchedProducts.length > 0) {
      const fuse = new Fuse(matchedProducts, {
        keys: ["productName"],
        threshold: 0.4,
      });
      // Lọc lại sản phẩm theo searchQuery
      const result = fuse.search(searchQuery);
      const finalProducts = result.map((r) => r.item);
      
      // Ghi log URL của ảnh cho từng sản phẩm để kiểm tra
      finalProducts.forEach((product) => {
        console.log("Image URL:", product.imageUrl);
      });
      
      setFilteredProducts(finalProducts);
    }
  }, [matchedProducts, searchQuery]);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">
        Kết quả tìm kiếm cho: <strong>{searchQuery}</strong>
      </h4>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.productId} className="col-md-3 col-sm-6 mb-4">
              <Link
                to={`/Detail?productId=${product.productId}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm">
                <img
                    src={`http://localhost:8080/api/public/products/image/${product.image}`}
                    alt={product.productName}
                    className="img-fluid"
                />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text" style={{ flex: 1 }}>
                      {product.description}
                    </p>
                    {product.price && (
                      <div className="mt-auto">
                        <p className="text-primary fw-bold">
                          Giá: {product.price.toLocaleString()} đ
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted">Không có sản phẩm phù hợp với tìm kiếm.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingGrid;