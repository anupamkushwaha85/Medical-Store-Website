import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { normalizeProduct } from '../lib/productAdapter';

const CartContext = createContext(null);
const STORAGE_KEY = 'jaya-medical-cart';

const readStoredCart = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

export function CartProvider({ children }) {
    const [items, setItems] = useState(readStoredCart);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (product, quantity = 1) => {
        const norm = normalizeProduct(product);
        if (!norm) return;

        setItems((currentItems) => {
            const targetId = norm.id || norm._id;
            const existing = currentItems.find((item) => (item.id === targetId || item._id === targetId));
            if (existing) {
                return currentItems.map((item) =>
                    (item.id === targetId || item._id === targetId) ? { ...item, quantity: item.quantity + quantity } : item,
                );
            }

            return [...currentItems, { ...norm, quantity }];
        });
    };

    const setItemQuantity = (productId, quantity) => {
        if (quantity < 1) {
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) => ((item.id === productId || item._id === productId) ? { ...item, quantity } : item)),
        );
    };

    const removeFromCart = (productId) => {
        setItems((currentItems) => currentItems.filter((item) => (item.id !== productId && item._id !== productId)));
    };

    const clearCart = () => setItems([]);

    const cartCount = useMemo(
        () => items.reduce((total, item) => total + item.quantity, 0),
        [items],
    );

    const subtotal = useMemo(
        () => items.reduce((total, item) => total + (item.price || item.selling_price || 0) * item.quantity, 0),
        [items],
    );

    const cartProducts = useMemo(
        () => items,
        [items],
    );

    const value = {
        items,
        cartProducts,
        cartCount,
        subtotal,
        addToCart,
        setItemQuantity,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used inside CartProvider');
    }
    return context;
};