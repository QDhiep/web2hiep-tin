import React, { useState, useEffect } from "react";
import { useCart } from "../context/Cart";
import { GET_ALL } from "../api/apiService";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import Fuse from "fuse.js";

function Header() {
  const { cartItems } = useCart();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GET_ALL("categories", { pageNumber: 0, pageSize: 10 })
      .then((response) => setCategories(response.content))
      .catch((error) => console.error("Failed to fetch categories:", error));

    GET_ALL("products", { pageNumber: 0, pageSize: 1000 })
      .then((res) => setAllProducts(res.content))
      .catch((err) => console.error("Error fetching products:", err));

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/Login");
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fuse = new Fuse(allProducts, {
      keys: ["productName"],
      threshold: 0.4,
    });

    const result = fuse.search(query);
    const matchedProducts = result.map((r) => r.item).slice(0, 5);

    setSuggestions(matchedProducts);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const fuse = new Fuse(allProducts, { keys: ["productName"], threshold: 0.4 });
    const result = fuse.search(searchQuery.trim());
    const matchedProducts = result.map((r) => r.item);

    navigate("/ListingGrid", {
      state: { searchQuery: searchQuery.trim(), matchedProducts: matchedProducts },
    });

    setSuggestions([]);
  };

  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-4 col-sm-4 col-md-3 col-lg-2">
              <Link to="/Home" className="brand-wrap">
                <img className="logo img-fluid" src={logo} alt="Logo" />
              </Link>
            </div>

            <div className="col-lg-8 col-md-6 position-relative">
              <form onSubmit={handleSearchSubmit} className="search-header">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <button type="submit" className="btn btn-primary">
                    Tìm kiếm
                  </button>
                </div>
              </form>

              {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 zindex-dropdown"
                style={{ top: "100%", left: 0, zIndex: 1050 }}>
                  {suggestions.map((product) => (
                    <li
                      key={product.productId}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        navigate(`/Detail?productId=${product.productId}`);
                        setSuggestions([]);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={`http://localhost:8080/api/public/products/image/${product.image}`}
                        alt={product.productName}
                        style={{ width: "40px", marginRight: "10px" }}
                      />
                      {product.productName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="col-lg-1 col-md-1">
              <Link to="/Cart" className="nav-link">
                <i className="fa fa-shopping-cart"></i>
                <span className="badge bg-primary">{cartItems.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="navbar navbar-main navbar-expand pl-0">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Danh mục
              </a>
              <ul className="dropdown-menu">
                {categories.map((row) => (
                  <li key={row.categoryId}>
                    <Link className="dropdown-item" to={`/ListingGrid?categoryId=${row.categoryId}`}>
                      {row.categoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {username ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {username}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Register">
                    Đăng ký
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">
                    Đăng nhập
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;