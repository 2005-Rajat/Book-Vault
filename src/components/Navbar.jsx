import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User, LogOut, BookOpen, Menu } from "lucide-react";
import { useState } from "react";

function Navbar() {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-[#111]/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#222]">
            <div className="container py-4 flex justify-between items-center">
                <Link to="/" className="text-gold-500 font-serif text-2xl flex items-center gap-2">
                    <BookOpen size={28} />
                    BookVault
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/books" className="text-gray-300 hover:text-gold-500 transition font-medium">Browse</Link>
                    
                    <Link to="/cart" className="text-gray-300 hover:text-gold-500 transition relative">
                        <ShoppingCart size={24} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gold-500 text-[#111] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-gray-300 hover:text-gold-500 transition">
                                <User size={24} />
                                <span className="font-medium">{user.name}</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                                <div className="p-2 space-y-1">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#222] hover:text-white rounded">Profile</Link>
                                    <Link to="/library" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#222] hover:text-white rounded">My Library</Link>
                                    {user.isAdmin && (
                                        <Link to="/admin" className="block px-4 py-2 text-sm text-gold-500 hover:bg-[#222] rounded">Dashboard</Link>
                                    )}
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#222] rounded flex items-center gap-2">
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="text-gray-300 hover:text-white font-medium py-2">Login</Link>
                            <Link to="/register" className="bg-gold-500 hover:bg-gold-600 text-[#111] font-medium px-5 py-2 rounded-md transition shadow-[0_0_15px_rgba(212,175,55,0.3)]">Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-gray-300 hover:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#1a1a1a] border-t border-[#333] p-4 space-y-4">
                    <Link to="/books" className="block text-gray-300 hover:text-gold-500" onClick={() => setIsMenuOpen(false)}>Browse Books</Link>
                    <Link to="/cart" className="block text-gray-300 hover:text-gold-500" onClick={() => setIsMenuOpen(false)}>Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})</Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="block text-gray-300 hover:text-gold-500" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                            <Link to="/library" className="block text-gray-300 hover:text-gold-500" onClick={() => setIsMenuOpen(false)}>My Library</Link>
                            {user.isAdmin && <Link to="/admin" className="block text-gold-500" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>}
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block text-red-400 w-full text-left">Logout</button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2 pt-2 border-t border-[#333]">
                            <Link to="/login" className="block text-center text-gray-300 hover:text-white py-2 border border-[#333] rounded" onClick={() => setIsMenuOpen(false)}>Login</Link>
                            <Link to="/register" className="block text-center bg-gold-500 text-[#111] py-2 rounded" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;