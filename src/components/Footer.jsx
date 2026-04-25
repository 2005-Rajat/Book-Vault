import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-[#111] border-t border-[#222] py-12 mt-20">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-gold-500 font-serif text-2xl mb-4">BookVault</h2>
                    <p className="text-gray-400 text-sm">
                        Discover premium ebooks for growth, business, finance and success. Your ultimate digital library.
                    </p>
                </div>
                
                <div>
                    <h3 className="text-white font-serif text-xl mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/" className="hover:text-gold-500 transition">Home</Link></li>
                        <li><Link to="/books" className="hover:text-gold-500 transition">Browse Books</Link></li>
                        <li><Link to="/cart" className="hover:text-gold-500 transition">Cart</Link></li>
                        <li><Link to="/login" className="hover:text-gold-500 transition">Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-serif text-xl mb-4">Categories</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><span className="cursor-pointer hover:text-gold-500 transition">Business & Finance</span></li>
                        <li><span className="cursor-pointer hover:text-gold-500 transition">Self-Help</span></li>
                        <li><span className="cursor-pointer hover:text-gold-500 transition">Productivity</span></li>
                        <li><span className="cursor-pointer hover:text-gold-500 transition">Psychology</span></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-serif text-xl mb-4">Newsletter</h3>
                    <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and updates.</p>
                    <div className="flex">
                        <input 
                            type="email" 
                            placeholder="Your email" 
                            className="bg-[#1a1a1a] border border-[#333] text-white px-4 py-2 rounded-l-md focus:outline-none focus:border-gold-500 w-full"
                        />
                        <button className="bg-gold-500 hover:bg-gold-600 text-[#111] font-medium px-4 py-2 rounded-r-md transition">
                            Join
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mt-12 pt-8 border-t border-[#222] text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} BookVault. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
