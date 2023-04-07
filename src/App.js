import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';

import { Home, SingleProduct, Cart, Checkout, Error, About, Products, PrivateRoute, AuthWrapper } from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        {/* Navbar & Sidebar */}
        <Navbar />
        <Sidebar />

        {/* Page */}

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/product/:id' element={<SingleProduct />} />

          <Route exact path='/checkout' component={PrivateRoute} element={<Checkout />} />
          <Route path='*' element={<Error />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
