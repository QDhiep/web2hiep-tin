// // // import React from 'react';
// // // import ReactDOM from 'react-dom';
// // // import './index.css';
// // // import App from './App';
// // // import reportWebVitals from './reportWebVitals';
// // // import { BrowserRouter } from 'react-router-dom';

// // // ReactDOM.render(
// // //   <BrowserRouter>
// // //   <App/>
// // //   </BrowserRouter>,
// // //   document.getElementById('root'),
// // // );


// // // reportWebVitals();
// // // index.js
// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import App from './App';
// // import { BrowserRouter } from 'react-router-dom';
// // import CartProvider from './context/Cart';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <BrowserRouter>
// //     <CartProvider>
// //       <App />
// //     </CartProvider>
// //   </BrowserRouter>
// // );
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { CartProvider } from "./context/Cart"; // Update path to your Cart context

// ReactDOM.render(
//   <CartProvider>
//     <App />
//   </CartProvider>,
//   document.getElementById("root")
// );
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./context/CartProvider"; // Đảm bảo đúng đường dẫn
import { BrowserRouter as Router } from "react-router-dom"; // Thêm Router

ReactDOM.render(
  <Router> {/* Bọc toàn bộ ứng dụng trong Router */}
    <CartProvider>
      <App />
    </CartProvider>
  </Router>,
  document.getElementById("root")
);
