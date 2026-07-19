import React, { createContext, useContext, useState } from 'react';
import {
  createStoreSeed,
  normalizeProduct,
} from '../data/storeDefaults';

const StoreContext = createContext();
const STORE_STORAGE_KEY = 'adrenax_store_data';

const readStoredState = () => {
  try {
    const savedState = localStorage.getItem(STORE_STORAGE_KEY);

    if (!savedState) {
      return createStoreSeed();
    }

    return {
      ...createStoreSeed(),
      ...JSON.parse(savedState),
    };
  } catch (error) {
    console.error('Unable to read store data from local storage.', error);
    return createStoreSeed();
  }
};

export const StoreProvider = ({ children }) => {
  const [storeData, setStoreData] = useState(readStoredState);

  const updateStoreData = (updater) => {
    let nextStateSnapshot;

    setStoreData((currentState) => {
      const nextState =
        typeof updater === 'function' ? updater(currentState) : updater;

      nextStateSnapshot = nextState;
      localStorage.setItem(STORE_STORAGE_KEY, JSON.stringify(nextState));
      return nextState;
    });

    return nextStateSnapshot;
  };

  const upsertProduct = (draft) => {
    let normalizedProduct;

    updateStoreData((currentState) => {
      const otherIds = currentState.products
        .filter((product) => product.id !== draft.id)
        .map((product) => product.id);

      normalizedProduct = normalizeProduct(draft, otherIds);
      const alreadyExists = currentState.products.some(
        (product) => product.id === normalizedProduct.id,
      );

      return {
        ...currentState,
        products: alreadyExists
          ? currentState.products.map((product) =>
              product.id === normalizedProduct.id ? normalizedProduct : product,
            )
          : [normalizedProduct, ...currentState.products],
      };
    });

    return normalizedProduct;
  };

  const deleteProduct = (productId) => {
    updateStoreData((currentState) => ({
      ...currentState,
      products: currentState.products.filter((product) => product.id !== productId),
    }));
  };

  const placeOrder = ({ items, totalAmount, customer }) => {
    const order = {
      id: `ADX-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customerName: customer?.name || 'Guest Checkout',
      customerEmail: customer?.email || 'guest@adrenax.local',
      customerRole: customer?.role || 'guest',
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      totalAmount: Number(totalAmount.toFixed(2)),
      items: items.map((item) => ({ ...item })),
    };

    updateStoreData((currentState) => ({
      ...currentState,
      orders: [order, ...currentState.orders],
    }));

    return order;
  };

  const addSubscriber = (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    let alreadySubscribed = false;

    updateStoreData((currentState) => {
      alreadySubscribed = currentState.subscribers.some(
        (subscriber) => subscriber.email === normalizedEmail,
      );

      if (alreadySubscribed) {
        return currentState;
      }

      return {
        ...currentState,
        subscribers: [
          {
            email: normalizedEmail,
            subscribedAt: new Date().toISOString(),
          },
          ...currentState.subscribers,
        ],
      };
    });

    return alreadySubscribed
      ? { ok: false, message: 'That address is already subscribed.' }
      : { ok: true, message: 'You are on the list for future drops.' };
  };

  const updateSiteContent = (nextSiteContent) => {
    updateStoreData((currentState) => ({
      ...currentState,
      siteContent: {
        ...currentState.siteContent,
        ...nextSiteContent,
      },
    }));
  };

  return (
    <StoreContext.Provider
      value={{
        products: storeData.products,
        orders: storeData.orders,
        subscribers: storeData.subscribers,
        siteContent: storeData.siteContent,
        upsertProduct,
        deleteProduct,
        placeOrder,
        addSubscriber,
        updateSiteContent,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
};
