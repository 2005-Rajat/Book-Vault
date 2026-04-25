import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowRight, BookOpen, Compass, TrendingUp, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { booksData, categories } from '../data/books';

function Home() {
    const { addToCart } = useCart();
    
    // Get featured/best selling books
    const featuredBooks = booksData.filter(book => book.isFeatured).slice(0, 4);
    const newArrivals = booksData.slice(0, 4); // Just using first 4 as dummy new arrivals

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="container relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <h1 className="text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">
                                Unlock Worlds <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600">
                                    Through Books
                                </span>
                            </h1>
                            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                                Discover a premium collection of digital books curated for entrepreneurs, thinkers, and lifelong learners. Elevate your mind today.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Link to="/books" className="bg-gold-500 hover:bg-gold-600 text-[#111] font-medium px-8 py-3 rounded-md transition flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                    Browse Collection <ArrowRight size={20} />
                                </Link>
                                <Link to="/register" className="bg-transparent border border-gray-600 hover:border-white text-white font-medium px-8 py-3 rounded-md transition">
                                    Join for Free
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="animate-float">
                                <img 
                                    src="https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=800&h=600" 
                                    alt="Reading" 
                                    className="rounded-2xl shadow-2xl shadow-gold-500/20 object-cover border border-white/10"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-[#151515] p-6 rounded-xl border border-[#333] shadow-xl glass backdrop-blur-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gold-500/20 p-3 rounded-full">
                                        <Star className="text-gold-500" size={24} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-xl">4.9/5</p>
                                        <p className="text-gray-400 text-sm">from 10k+ readers</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Popular Categories Strip */}
            <section className="py-12 bg-[#111] border-y border-[#222]">
                <div className="container">
                    <div className="flex items-center gap-2 mb-6">
                        <Compass className="text-gold-500" size={24} />
                        <h2 className="text-2xl font-serif text-white">Explore Categories</h2>
                    </div>
                    <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide hide-scroll">
                        {categories.map((category, index) => (
                            <Link 
                                key={index} 
                                to={`/category/${category.slug}`}
                                className="whitespace-nowrap bg-[#1a1a1a] border border-[#333] hover:border-gold-500 hover:text-gold-500 text-gray-300 px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="py-20 bg-[#0a0a0a]">
                <div className="container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="text-gold-500" size={24} />
                                <h2 className="text-3xl lg:text-4xl font-serif text-white">Best Sellers</h2>
                            </div>
                            <p className="text-gray-400">Our most popular and highly rated books.</p>
                        </div>
                        <Link to="/books" className="text-gold-500 hover:text-gold-400 hidden md:flex items-center gap-1 transition">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {featuredBooks.map((book) => (
                            <motion.div key={book._id} variants={itemVariants} className="glass-card rounded-xl p-4 group">
                                <Link to={`/book/${book._id}`}>
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
                                </Link>
                                
                                <div className="space-y-1">
                                    <h3 className="text-lg font-serif text-white truncate hover:text-gold-500 transition cursor-pointer">
                                        <Link to={`/book/${book._id}`}>{book.title}</Link>
                                    </h3>
                                    <p className="text-gray-400 text-sm">{book.author}</p>
                                    <div className="flex items-center gap-1 text-gold-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-sm">{book.rating}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-[#222] mt-2">
                                        <span className="text-xl font-bold text-white">${book.price}</span>
                                        <button 
                                            onClick={() => addToCart(book)}
                                            className="bg-[#222] hover:bg-gold-500 hover:text-[#111] p-2 rounded-md transition transform hover:scale-110"
                                        >
                                            <ShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="py-20 bg-[#111]">
                <div className="container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="text-gold-500" size={24} />
                                <h2 className="text-3xl lg:text-4xl font-serif text-white">New Arrivals</h2>
                            </div>
                            <p className="text-gray-400">Fresh content just added to the vault.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {newArrivals.map((book) => (
                            <div key={`new-${book._id}`} className="flex gap-4 bg-[#151515] p-4 rounded-xl border border-[#222] hover:border-gold-500/30 transition group">
                                <Link to={`/book/${book._id}`} className="shrink-0">
                                    <img 
                                        src={book.coverImage} 
                                        alt={book.title} 
                                        className="w-20 h-28 object-cover rounded shadow-md group-hover:scale-105 transition-transform"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=Cover+Not+Found' }}
                                    />
                                </Link>
                                <div className="flex flex-col justify-center">
                                    <Link to={`/book/${book._id}`} className="text-white font-serif hover:text-gold-500 transition line-clamp-2 mb-1">{book.title}</Link>
                                    <p className="text-gray-500 text-xs mb-2">{book.author}</p>
                                    <span className="text-gold-500 font-bold">${book.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories / Trust Section */}
            <section className="py-24 relative bg-[#0a0a0a]">
                <div className="container">
                    <div className="bg-[#151515] border border-[#222] rounded-2xl p-10 lg:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px]"></div>
                        
                        <h2 className="text-3xl lg:text-5xl font-serif text-white mb-6">Read Anywhere, Anytime</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
                            Your library syncs across all devices. Download PDFs or read directly in our premium online reader. Enjoy a distraction-free experience.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {[
                                { count: "10k+", label: "Active Readers" },
                                { count: "500+", label: "Premium Books" },
                                { count: "4.9", label: "Average Rating" },
                                { count: "24/7", label: "Support" },
                            ].map((stat, i) => (
                                <div key={i} className="p-4">
                                    <div className="text-3xl lg:text-4xl font-bold text-gold-500 mb-2">{stat.count}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;