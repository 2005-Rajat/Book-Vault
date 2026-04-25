import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, BookOpen, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { booksData } from '../data/books';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function BookDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const userInfo = localStorage.getItem('userInfo');

    useEffect(() => {
        setLoading(true);
        // Find the book from our dummy data based on the URL parameter ID
        setTimeout(() => {
            const foundBook = booksData.find(b => b._id === id);
            setBook(foundBook);
            setLoading(false);
            window.scrollTo(0, 0); // Reset scroll position when opening a new book
        }, 300);
    }, [id]);

    const handleAddToCart = () => {
        if (!userInfo) {
            toast.error("Please login to continue.", {
                icon: '🔒',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            navigate('/login');
            return;
        }
        addToCart(book, qty);
        toast.success(`${book.title} added to cart`);
    };

    const handleReadSample = () => {
        navigate(`/read/${book._id}?sample=true`);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
    );

    if (!book) return (
        <div className="container py-32 text-center text-white">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-3xl font-serif mb-4">Book Not Found</h2>
            <p className="text-gray-400 mb-8">The book you are looking for does not exist or has been removed.</p>
            <Link to="/books" className="bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-3 px-6 rounded-lg transition">
                Return to Library
            </Link>
        </div>
    );

    return (
        <div className="container py-12">
            <Link to="/books" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-500 mb-8 transition">
                <ArrowLeft size={20} /> Back to Browse
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                {/* Book Cover Image */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative max-w-md mx-auto md:mx-0 w-full"
                >
                    <div className="absolute inset-0 bg-gold-500/20 blur-[60px] rounded-full pointer-events-none"></div>
                    <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        className="relative z-10 w-full rounded-lg shadow-2xl border border-[#333] bg-[#111]"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=Cover+Not+Found' }}
                    />
                </motion.div>

                {/* Book Info */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col justify-center"
                >
                    <div className="mb-2">
                        <Link to={`/category/${book.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-gold-500 hover:text-gold-400 font-medium tracking-wider uppercase text-sm transition">
                            {book.category}
                        </Link>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-serif text-white mb-2">{book.title}</h1>
                    <p className="text-xl text-gray-400 mb-6">by {book.author}</p>
                    
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center text-gold-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill={i < Math.floor(book.rating) ? "currentColor" : "none"} className={i >= Math.floor(book.rating) ? "text-gray-600" : ""} />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">({book.numReviews} Reviews)</span>
                    </div>

                    <div className="text-3xl font-bold text-white mb-6">${book.price}</div>
                    
                    <p className="text-gray-300 leading-relaxed mb-8">{book.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                        <div className="bg-[#151515] p-4 rounded-lg border border-[#222]">
                            <div className="text-gray-500 mb-1">Print Length</div>
                            <div className="text-white font-medium">{book.pages} pages</div>
                        </div>
                        <div className="bg-[#151515] p-4 rounded-lg border border-[#222]">
                            <div className="text-gray-500 mb-1">Language</div>
                            <div className="text-white font-medium">{book.language}</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={handleAddToCart}
                            className="flex-1 bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 transform active:scale-95"
                        >
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                        <button 
                            onClick={handleReadSample}
                            className="flex-1 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 transform active:scale-95"
                        >
                            <BookOpen size={20} /> Read Sample
                        </button>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 justify-center">
                        <Check size={16} className="text-green-500" /> Instant access after purchase
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default BookDetails;
