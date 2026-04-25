import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Cart() {
    const { cartItems, removeFromCart, cartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=/checkout');
        } else {
            navigate('/checkout');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="bg-[#1a1a1a] p-6 rounded-full mb-6 border border-[#333]">
                    <BookOpen className="text-gray-500" size={48} />
                </div>
                <h2 className="text-3xl font-serif text-white mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Looks like you haven't added any books to your cart yet.</p>
                <Link to="/books" className="bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-3 px-8 rounded-lg transition">
                    Browse Books
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-12">
            <h1 className="text-4xl font-serif text-white mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item, index) => (
                        <motion.div 
                            key={item.book._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#151515] border border-[#222] rounded-xl p-4 flex gap-6 items-center"
                        >
                            <img 
                                src={item.book.coverImage} 
                                alt={item.book.title} 
                                className="w-24 h-36 object-cover rounded shadow-md"
                            />
                            <div className="flex-grow">
                                <Link to={`/book/${item.book._id}`} className="text-xl font-serif text-white hover:text-gold-500 transition line-clamp-1 mb-1">
                                    {item.book.title}
                                </Link>
                                <p className="text-gray-400 text-sm mb-2">{item.book.author}</p>
                                <div className="text-lg font-bold text-white mb-4">${item.book.price}</div>
                                
                                <button 
                                    onClick={() => removeFromCart(item.book._id)}
                                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition"
                                >
                                    <Trash2 size={16} /> Remove
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-[#151515] border border-[#222] rounded-xl p-6 sticky top-24">
                        <h2 className="text-2xl font-serif text-white mb-6">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Tax (Estimated)</span>
                                <span>${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-[#333] pt-4 flex justify-between text-white font-bold text-xl">
                                <span>Total</span>
                                <span>${(cartTotal * 1.08).toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={checkoutHandler}
                            className="w-full bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-4 rounded-lg transition flex justify-center items-center gap-2"
                        >
                            Proceed to Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;