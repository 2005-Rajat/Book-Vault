import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = localStorage.getItem('cartItems');
        if (items) {
            setCartItems(JSON.parse(items));
        }
    }, []);

    const addToCart = (book, qty = 1) => {
        setCartItems(prevItems => {
            const existItem = prevItems.find(x => x.book._id === book._id);
            let newItems;
            if (existItem) {
                newItems = prevItems.map(x =>
                    x.book._id === existItem.book._id ? { ...x, qty: x.qty + qty } : x
                );
            } else {
                newItems = [...prevItems, { book, qty }];
            }
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => {
            const newItems = prevItems.filter(x => x.book._id !== id);
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.book.price * item.qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
