import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('adrenax_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from storage', e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('adrenax_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // For custom items, check if we have the exact same customization
      const existingItemIndex = prevItems.findIndex((item) => {
        if (item.id !== product.id) return false;
        if (item.size !== product.size) return false;
        if (item.color !== product.color) return false;
        if (item.isCustom !== product.isCustom) return false;
        
        if (product.isCustom) {
          return (
            item.customText === product.customText &&
            item.customTextColor === product.customTextColor &&
            item.customFont === product.customFont &&
            item.customLogo === product.customLogo &&
            item.customPosition === product.customPosition
          );
        }
        return true;
      });

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += product.quantity || 1;
        return newItems;
      }

      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
    
    // Automatically open the cart sidebar to give instant feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (uniqueId) => {
    // We use a generated uniqueKey or match parameters to remove
    setCartItems((prevItems) => prevItems.filter((item, idx) => {
      const itemKey = `${item.id}-${item.size}-${item.color}-${item.isCustom ? 'custom' : 'standard'}-${idx}`;
      return itemKey !== uniqueId;
    }));
  };

  const updateQuantity = (uniqueId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(uniqueId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item, idx) => {
        const itemKey = `${item.id}-${item.size}-${item.color}-${item.isCustom ? 'custom' : 'standard'}-${idx}`;
        if (itemKey === uniqueId) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
