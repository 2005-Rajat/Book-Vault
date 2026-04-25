import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { booksData, categories } from '../data/books';

function Category() {
    const { slug } = useParams();
    const { addToCart } = useCart();
    
    const [books, setBooks] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Find category name from slug
        const categoryObj = categories.find(c => c.slug === slug);
        const name = categoryObj ? categoryObj.name : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        setCategoryName(name);

        setTimeout(() => {
            // Filter books by category
            const filteredBooks = booksData.filter(b => b.category === name);
            setBooks(filteredBooks);
            setLoading(false);
            window.scrollTo(0, 0);
        }, 400);
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
            </div>
        );
    }

    return (
        <div className="container py-12 min-h-screen">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-500 mb-8 transition">
                <ArrowLeft size={20} /> Back to Home
            </Link>

            <div className="mb-12 border-b border-[#222] pb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gold-500/10 p-2 rounded-lg text-gold-500">
                        <TrendingUp size={28} />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-serif text-white">{categoryName}</h1>
                </div>
                <p className="text-gray-400 text-lg mt-4">Showing all premium books in {categoryName}.</p>
            </div>

            {books.length === 0 ? (
                <div className="text-center py-20 text-gray-400 bg-[#151515] rounded-xl border border-[#222]">
                    <p className="text-xl mb-4">No books found in this category yet.</p>
                    <Link to="/books" className="text-gold-500 hover:underline">Explore other categories</Link>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                    {books.map((book) => (
                        <motion.div 
                            key={book._id} 
                            whileHover={{ y: -5 }}
                            className="glass-card rounded-xl p-4 flex flex-col h-full group"
                        >
                            <Link to={`/book/${book._id}`} className="block flex-grow">
                                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[2/3] bg-[#222]">
                                    <img 
                                        src={book.coverImage} 
                                        alt={book.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=Cover+Not+Found' }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm transform scale-90 group-hover:scale-100 transition-transform">Quick View</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-serif text-white line-clamp-1 group-hover:text-gold-500 transition">{book.title}</h3>
                                <p className="text-gray-400 text-sm mb-1">{book.author}</p>
                                <div className="flex items-center gap-1 text-gold-500">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm text-gray-300">{book.rating}</span>
                                </div>
                            </Link>
                            
                            <div className="flex justify-between items-center pt-4 mt-auto border-t border-[#222]">
                                <span className="text-lg font-bold text-white">${book.price}</span>
                                <button 
                                    onClick={() => addToCart(book)}
                                    className="bg-gold-500/10 hover:bg-gold-500 text-gold-500 hover:text-[#111] p-2 rounded-md transition transform hover:scale-110"
                                >
                                    <ShoppingCart size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default Category;
