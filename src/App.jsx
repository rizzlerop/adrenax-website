import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Products from './components/Products';
import Customizer from './components/Customizer';
import About from './components/About';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            {/* Embedding Products grid in home page to drive high engagement */}
            <Products setCurrentPage={setCurrentPage} />
          </>
        );
      case 'shop':
        return <Products setCurrentPage={setCurrentPage} />;
      case 'customizer':
        return <Customizer />;
      case 'about':
        return <About />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <CartSidebar />
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
