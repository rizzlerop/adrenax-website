import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Products from './components/Products';
import Customizer from './components/Customizer';
import About from './components/About';
import CartSidebar from './components/CartSidebar';
import LoginPage from './components/LoginPage';
import AdminPanel from './components/AdminPanel';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAdmin } = useAuth();

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
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return isAdmin ? (
          <AdminPanel setCurrentPage={setCurrentPage} />
        ) : (
          <LoginPage setCurrentPage={setCurrentPage} requiredRole="admin" />
        );
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
      {currentPage !== 'admin' ? <Footer setCurrentPage={setCurrentPage} /> : null}
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
