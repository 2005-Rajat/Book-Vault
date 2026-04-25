import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { booksData, categories } from '../data/books';

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            let filtered = booksData;
            
            if (keyword) {
                filtered = filtered.filter(b => b.title.toLowerCase().includes(keyword.toLowerCase()) || b.author.toLowerCase().includes(keyword.toLowerCase()));
            }
            
            if (selectedCategory) {
                filtered = filtered.filter(b => b.category === selectedCategory);
            }
            
            setBooks(filtered);
            setLoading(false);
        }, 400);
    }, [keyword, selectedCategory]);

    return (
        <div className="container py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-serif text-white mb-2">Library</h1>
                    <p className="text-gray-400">Discover your next great read</p>
                </div>
                
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow md:w-80">
                        <input 
                            type="text" 
                            placeholder="Search books or authors..." 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full bg-[#151515] border border-[#333] text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:border-gold-500 transition"
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    </div>
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-[#151515] border border-[#333] text-white px-4 py-3 rounded-md focus:outline-none focus:border-gold-500 transition cursor-pointer"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
                </div>
            ) : books.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl mb-4">No books found matching your criteria.</p>
                    <button onClick={() => {setKeyword(''); setSelectedCategory('');}} className="text-gold-500 hover:underline">Clear Filters</button>
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

export default Books;
