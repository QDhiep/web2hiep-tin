import Header from './layouts/Header';
import './assets/sass/app.scss';
import Footer from './layouts/Footer';
import Main from './layouts/Main';
import { CartProvider } from './context/Cart';

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
