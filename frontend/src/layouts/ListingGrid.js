// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useLocation, Link } from "react-router-dom";
// // // // // import Fuse from "fuse.js";

// // // // // function ListingGrid() {
// // // // //   // Nhận state được truyền từ Header (trong đó chứa searchQuery và matchedProducts)
// // // // //   const { state } = useLocation();
// // // // //   const { matchedProducts = [], searchQuery = "" } = state || {};
// // // // //   const [filteredProducts, setFilteredProducts] = useState(matchedProducts);

// // // // //   useEffect(() => {
// // // // //     // Nếu có sản phẩm được tìm kiếm (matchedProducts không rỗng)
// // // // //     if (matchedProducts.length > 0) {
// // // // //       const fuse = new Fuse(matchedProducts, {
// // // // //         keys: ["productName"],
// // // // //         threshold: 0.4,
// // // // //       });
// // // // //       // Lọc lại sản phẩm theo searchQuery
// // // // //       const result = fuse.search(searchQuery);
// // // // //       const finalProducts = result.map((r) => r.item);
      
// // // // //       // Ghi log URL của ảnh cho từng sản phẩm để kiểm tra
// // // // //       finalProducts.forEach((product) => {
// // // // //         console.log("Image URL:", product.imageUrl);
// // // // //       });
      
// // // // //       setFilteredProducts(finalProducts);
// // // // //     }
// // // // //   }, [matchedProducts, searchQuery]);

// // // // //   return (
// // // // //     <div className="container mt-4">
// // // // //       <h4 className="mb-4">
// // // // //         Kết quả tìm kiếm cho: <strong>{searchQuery}</strong>
// // // // //       </h4>
// // // // //       <div className="row">
// // // // //         {filteredProducts.length > 0 ? (
// // // // //           filteredProducts.map((product) => (
// // // // //             <div key={product.productId} className="col-md-3 col-sm-6 mb-4">
// // // // //               <Link
// // // // //                 to={`/Detail?productId=${product.productId}`}
// // // // //                 className="text-decoration-none text-dark"
// // // // //               >
// // // // //                 <div className="card h-100 shadow-sm">
// // // // //                 <img
// // // // //                     src={`http://localhost:8080/api/public/products/image/${product.image}`}
// // // // //                     alt={product.productName}
// // // // //                     className="img-fluid"
// // // // //                 />
// // // // //                   <div className="card-body d-flex flex-column">
// // // // //                     <h5 className="card-title">{product.productName}</h5>
// // // // //                     <p className="card-text" style={{ flex: 1 }}>
// // // // //                       {product.description}
// // // // //                     </p>
// // // // //                     {product.price && (
// // // // //                       <div className="mt-auto">
// // // // //                         <p className="text-primary fw-bold">
// // // // //                           Giá: {product.price.toLocaleString()} đ
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </Link>
// // // // //             </div>
// // // // //           ))
// // // // //         ) : (
// // // // //           <div className="col-12">
// // // // //             <p className="text-muted">Không có sản phẩm phù hợp với tìm kiếm.</p>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default ListingGrid;
// // // // import React, { useState, useEffect } from "react";
// // // // import { useLocation, Link } from "react-router-dom";
// // // // import { GET_ALL } from "../api/apiService";
// // // // import Fuse from "fuse.js";

// // // // function ListingGrid() {
// // // //   const location = useLocation();
// // // //   const queryParams = new URLSearchParams(location.search);
// // // //   const categoryId = queryParams.get("categoryId");

// // // //   const { matchedProducts = [], searchQuery = "" } = location.state || {};
// // // //   const [filteredProducts, setFilteredProducts] = useState([]);
// // // //   const [allProducts, setAllProducts] = useState([]);

// // // //   useEffect(() => {
// // // //     // Nếu có kết quả tìm kiếm, lọc theo searchQuery
// // // //     if (matchedProducts.length > 0) {
// // // //       const fuse = new Fuse(matchedProducts, {
// // // //         keys: ["productName"],
// // // //         threshold: 0.4,
// // // //       });
// // // //       const result = fuse.search(searchQuery.trim());
// // // //       const finalProducts = result.map((r) => r.item);
// // // //       setFilteredProducts(finalProducts);
// // // //     }
// // // //     // Nếu không, thì lọc theo categoryId nếu có
// // // //     else {
// // // //       GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
// // // //         .then((res) => {
// // // //           setAllProducts(res.content);
// // // //           if (categoryId) {
// // // //             const filtered = res.content.filter(
// // // //               (p) => p.category?.categoryId?.toString() === categoryId
// // // //             );
// // // //             setFilteredProducts(filtered);
// // // //           } else {
// // // //             setFilteredProducts(res.content);
// // // //           }
// // // //         })
// // // //         .catch((err) => console.error("Error fetching products:", err));
// // // //     }
// // // //   }, [categoryId, matchedProducts, searchQuery]);

// // // //   return (
// // // //     <div className="container mt-4">
// // // //       <h4 className="mb-4">
// // // //         {searchQuery
// // // //           ? `Kết quả tìm kiếm cho: "${searchQuery}"`
// // // //           : categoryId
// // // //           ? "Sản phẩm theo danh mục"
// // // //           : "Tất cả sản phẩm"}
// // // //       </h4>
// // // //       <div className="row">
// // // //         {filteredProducts.length > 0 ? (
// // // //           filteredProducts.map((product) => (
// // // //             <div key={product.productId} className="col-md-3 col-sm-6 mb-4">
// // // //               <Link
// // // //                 to={`/Detail?productId=${product.productId}`}
// // // //                 className="text-decoration-none text-dark"
// // // //               >
// // // //                 <div className="card h-100 shadow-sm">
// // // //                   <img
// // // //                     src={`http://localhost:8080/api/public/products/image/${product.image}`}
// // // //                     alt={product.productName}
// // // //                     className="img-fluid"
// // // //                   />
// // // //                   <div className="card-body d-flex flex-column">
// // // //                     <h5 className="card-title">{product.productName}</h5>
// // // //                     <p className="card-text" style={{ flex: 1 }}>
// // // //                       {product.description}
// // // //                     </p>
// // // //                     {product.price && (
// // // //                       <div className="mt-auto">
// // // //                         <p className="text-primary fw-bold">
// // // //                           Giá: {product.price.toLocaleString()} đ
// // // //                         </p>
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               </Link>
// // // //             </div>
// // // //           ))
// // // //         ) : (
// // // //           <div className="col-12">
// // // //             <p className="text-muted">Không có sản phẩm phù hợp.</p>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ListingGrid;
// // // import React, { useState, useEffect } from "react";
// // // import { useLocation, Link } from "react-router-dom";
// // // import { GET_ALL } from "../api/apiService";
// // // import Fuse from "fuse.js";

// // // function ListingGrid() {
// // //   const location = useLocation();
// // //   const queryParams = new URLSearchParams(location.search);
// // //   const categoryId = queryParams.get("categoryId");

// // //   const { matchedProducts = [], searchQuery = "" } = location.state || {};
// // //   const [filteredProducts, setFilteredProducts] = useState([]);
// // //   const [allProducts, setAllProducts] = useState([]);

// // //   useEffect(() => {
// // //     if (categoryId) {
// // //       // Ưu tiên lọc theo danh mục nếu có categoryId
// // //       GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
// // //         .then((res) => {
// // //           const products = res.content;
// // //           setAllProducts(products);
// // //           const filtered = products.filter(
// // //             (p) => p.category?.categoryId?.toString() === categoryId
// // //           );
// // //           setFilteredProducts(filtered);
// // //         })
// // //         .catch((err) => console.error("Error fetching products:", err));
// // //     } else if (matchedProducts.length > 0) {
// // //       // Nếu không có categoryId nhưng có matchedProducts từ search
// // //       const fuse = new Fuse(matchedProducts, {
// // //         keys: ["productName"],
// // //         threshold: 0.4,
// // //       });
// // //       const result = fuse.search(searchQuery.trim());
// // //       const finalProducts = result.map((r) => r.item);
// // //       setFilteredProducts(finalProducts);
// // //     } else {
// // //       // Không có categoryId cũng không phải search ⇒ load toàn bộ
// // //       GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
// // //         .then((res) => {
// // //           setAllProducts(res.content);
// // //           setFilteredProducts(res.content);
// // //         })
// // //         .catch((err) => console.error("Error fetching products:", err));
// // //     }
// // //   }, [categoryId, matchedProducts, searchQuery]);

// // //   return (
// // //     <div className="container mt-4">
// // //       <h4 className="mb-4">
// // //         {categoryId
// // //           ? "Sản phẩm theo danh mục"
// // //           : searchQuery
// // //           ? `Kết quả tìm kiếm cho: "${searchQuery}"`
// // //           : "Tất cả sản phẩm"}
// // //       </h4>
// // //       <div className="row">
// // //         {filteredProducts.length > 0 ? (
// // //           filteredProducts.map((product) => (
// // //             <div key={product.productId} className="col-md-3 col-sm-6 mb-4">
// // //               <Link
// // //                 to={`/Detail?productId=${product.productId}`}
// // //                 className="text-decoration-none text-dark"
// // //               >
// // //                 <div className="card h-100 shadow-sm">
// // //                   <img
// // //                     src={`http://localhost:8080/api/public/products/image/${product.image}`}
// // //                     alt={product.productName}
// // //                     className="img-fluid"
// // //                   />
// // //                   <div className="card-body d-flex flex-column">
// // //                     <h5 className="card-title">{product.productName}</h5>
// // //                     <p className="card-text" style={{ flex: 1 }}>
// // //                       {product.description}
// // //                     </p>
// // //                     {product.price && (
// // //                       <div className="mt-auto">
// // //                         <p className="text-primary fw-bold">
// // //                           Giá: {product.price.toLocaleString()} đ
// // //                         </p>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </Link>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <div className="col-12">
// // //             <p className="text-muted">Không có sản phẩm phù hợp.</p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ListingGrid;
// // import React, { useState, useEffect } from "react";
// // import { useLocation, Link } from "react-router-dom";
// // import { GET_ALL } from "../api/apiService";
// // import Fuse from "fuse.js";

// // function ListingGrid() {
// //   const location = useLocation();
// //   const queryParams = new URLSearchParams(location.search);
// //   const categoryId = queryParams.get("categoryId");

// //   const { matchedProducts = [], searchQuery = "" } = location.state || {};
// //   const [filteredProducts, setFilteredProducts] = useState([]);
// //   const [allProducts, setAllProducts] = useState([]);

// //   useEffect(() => {
// //     if (categoryId) {
// //       // Ưu tiên lọc theo danh mục nếu có categoryId
// //       GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
// //         .then((res) => {
// //           const products = res.content;
// //           setAllProducts(products);

// //           // Lọc theo categoryId nếu có
// //           const filtered = products.filter(
// //             (p) => p.category?.categoryId?.toString() === categoryId
// //           );
// //           setFilteredProducts(filtered);
// //         })
// //         .catch((err) => console.error("Error fetching products:", err));
// //     } else if (matchedProducts.length > 0) {
// //       // Nếu không có categoryId nhưng có matchedProducts từ search
// //       const fuse = new Fuse(matchedProducts, {
// //         keys: ["productName"],
// //         threshold: 0.4,
// //       });
// //       const result = fuse.search(searchQuery.trim());
// //       const finalProducts = result.map((r) => r.item);
// //       setFilteredProducts(finalProducts);
// //     } else {
// //       // Không có categoryId cũng không phải search ⇒ load toàn bộ
// //       GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
// //         .then((res) => {
// //           setAllProducts(res.content);
// //           setFilteredProducts(res.content);
// //         })
// //         .catch((err) => console.error("Error fetching products:", err));
// //     }
// //   }, [categoryId, matchedProducts, searchQuery]);

// //   return (
// //     <div className="container mt-4">
// //       <h4 className="mb-4">
// //         {categoryId
// //           ? "Sản phẩm theo danh mục"
// //           : searchQuery
// //           ? `Kết quả tìm kiếm cho: "${searchQuery}"`
// //           : "Tất cả sản phẩm"}
// //       </h4>
// //       <div className="row">
// //         {filteredProducts.length > 0 ? (
// //           filteredProducts.map((product) => (
// //             <div key={product.productId} className="col-md-3 col-sm-6 mb-4">
// //               <Link
// //                 to={`/Detail?productId=${product.productId}`}
// //                 className="text-decoration-none text-dark"
// //               >
// //                 <div className="card h-100 shadow-sm">
// //                   <img
// //                     src={`http://localhost:8080/api/public/products/image/${product.image}`}
// //                     alt={product.productName}
// //                     className="img-fluid"
// //                   />
// //                   <div className="card-body d-flex flex-column">
// //                     <h5 className="card-title">{product.productName}</h5>
// //                     <p className="card-text" style={{ flex: 1 }}>
// //                       {product.description}
// //                     </p>
// //                     {product.price && (
// //                       <div className="mt-auto">
// //                         <p className="text-primary fw-bold">
// //                           Giá: {product.price.toLocaleString()} đ
// //                         </p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </Link>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="col-12">
// //             <p className="text-muted">Không có sản phẩm phù hợp.</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ListingGrid;
// import React, { useState, useEffect } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { GET_ALL } from "../api/apiService";
// import Fuse from "fuse.js";

// function ListingGrid() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const categoryId = queryParams.get("categoryId");

//   const { matchedProducts = [], searchQuery = "" } = location.state || {};
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);

//   useEffect(() => {
//     console.log("CategoryId:", categoryId); // Debug: Kiểm tra categoryId
//     console.log("Search Query:", searchQuery); // Debug: Kiểm tra searchQuery
//     console.log("Matched Products:", matchedProducts); // Debug: Kiểm tra matchedProducts

//     if (categoryId) {
//       // Ưu tiên lọc theo danh mục nếu có categoryId
//       GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
//         .then((res) => {
//           console.log("All products:", res.content); // Debug: Kiểm tra dữ liệu sản phẩm từ API
//           const products = res.content;
//           setAllProducts(products);
//           const filtered = products.filter(
//             (p) => p.category?.categoryId?.toString() === categoryId
//           );
//           console.log("Filtered products by category:", filtered); // Debug: Kiểm tra sản phẩm sau khi lọc
//           setFilteredProducts(filtered);
//         })
//         .catch((err) => console.error("Error fetching products:", err));
//     } else if (matchedProducts.length > 0) {
//       // Nếu không có categoryId nhưng có matchedProducts từ search
//       const fuse = new Fuse(matchedProducts, {
//         keys: ["productName"],
//         threshold: 0.4,
//       });
//       const result = fuse.search(searchQuery.trim());
//       const finalProducts = result.map((r) => r.item);
//       console.log("Filtered products from search:", finalProducts); // Debug: Kiểm tra sản phẩm sau khi tìm kiếm
//       setFilteredProducts(finalProducts);
//     } else {
//       // Không có categoryId cũng không phải search ⇒ load toàn bộ
//       GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
//         .then((res) => {
//           console.log("All products loaded:", res.content); // Debug: Kiểm tra dữ liệu sản phẩm từ API
//           setAllProducts(res.content);
//           setFilteredProducts(res.content);
//         })
//         .catch((err) => console.error("Error fetching products:", err));
//     }
//   }, [categoryId, matchedProducts, searchQuery]);

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-4">
//         {categoryId
//           ? "Sản phẩm theo danh mục"
//           : searchQuery
//           ? `Kết quả tìm kiếm cho: "${searchQuery}"`
//           : "Tất cả sản phẩm"}
//       </h4>
//       <div className="row">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div key={product.productId} className="col-md-3 col-sm-6 mb-4">
//               <Link
//                 to={`/Detail?productId=${product.productId}`}
//                 className="text-decoration-none text-dark"
//               >
//                 <div className="card h-100 shadow-sm">
//                   <img
//                     src={`http://localhost:8080/api/public/products/image/${product.image}`}
//                     alt={product.productName}
//                     className="img-fluid"
//                   />
//                   <div className="card-body d-flex flex-column">
//                     <h5 className="card-title">{product.productName}</h5>
//                     <p className="card-text" style={{ flex: 1 }}>
//                       {product.description}
//                     </p>
//                     {product.price && (
//                       <div className="mt-auto">
//                         <p className="text-primary fw-bold">
//                           Giá: {product.price.toLocaleString()} đ
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <div className="col-12">
//             <p className="text-muted">Không có sản phẩm phù hợp.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ListingGrid;
// src/pages/ListingGrid.js
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { GET_ALL } from "../api/apiService";
import Fuse from "fuse.js";

const ListingGrid = () => {
  const { search, state } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryId = queryParams.get("categoryId") || null;
  const { matchedProducts = [], searchQuery = "" } = state || {};

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchByCategory = () => {
      // gọi API categories/{id}/products
      GET_ALL(`categories/${categoryId}/products`, {
        pageNumber: 0,
        pageSize: 1000,
      })
        .then(res => setProducts(res.content))
        .catch(err => console.error("Lỗi khi tải sản phẩm theo danh mục:", err));
    };

    const fetchAll = () => {
      GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
        .then(res => setProducts(res.content))
        .catch(err => console.error("Lỗi khi tải tất cả sản phẩm:", err));
    };

    if (categoryId) {
      fetchByCategory();
    } else if (matchedProducts.length > 0) {
      // nếu có state.matchedProducts (từ tìm kiếm)
      // ép matchedProducts về products
      setProducts(matchedProducts);
    } else {
      fetchAll();
    }
  }, [categoryId, matchedProducts]);

  // Nếu có searchQuery, áp dụng Fuse.js trên tập products đang có
  const displayed = React.useMemo(() => {
    if (searchQuery.trim()) {
      const fuse = new Fuse(products, {
        keys: ["productName"],
        threshold: 0.4,
      });
      return fuse.search(searchQuery.trim()).map(r => r.item);
    }
    return products;
  }, [products, searchQuery]);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">
        {categoryId
          ? "Sản phẩm theo danh mục"
          : searchQuery
          ? `Kết quả tìm kiếm: "${searchQuery}"`
          : "Tất cả sản phẩm"}
      </h4>
      <div className="row">
        {displayed.length > 0 ? (
          displayed.map(product => (
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
            <p className="text-muted">Không có sản phẩm phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingGrid;
