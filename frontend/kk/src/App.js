// import Header from './layouts/Header';
// import './assets/sass/app.scss';
// import Footer from './layouts/Footer';
// import Main from './layouts/Main';

// function App() {
//   return (
//    <div>
//     <Header/>
//     <Main/>
//     <Footer/>
//    </div>
//   );
// }

// export default App;
import Header from './layouts/Header';
import './assets/sass/app.scss';
import Footer from './layouts/Footer';
import Main from './layouts/Main';
import { CartProvider } from './context/CartProvider'; // 👈 import CartProvider



function App() {
  return (
    <CartProvider>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;