import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Library() {
    const { user } = useAuth();
    
    const [purchasedBooks, setPurchasedBooks] = useState(() => {
        const saved = localStorage.getItem('myLibrary');
        return saved ? JSON.parse(saved) : [];
    });

    if (!user) {
        return <div className="container py-20 text-center text-white">Please login to view your library.</div>;
    }

    if (purchasedBooks.length === 0) {
        return (
            <div className="container py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="bg-[#1a1a1a] p-6 rounded-full mb-6 border border-[#333]">
                    <BookOpen className="text-gray-500" size={48} />
                </div>
                <h2 className="text-3xl font-serif text-white mb-4">Your library is empty</h2>
                <p className="text-gray-400 mb-8">You haven't purchased any books yet.</p>
                <Link to="/books" className="bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-3 px-8 rounded-lg transition">
                    Explore Store
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-12">
            <h1 className="text-4xl font-serif text-white mb-2">My Library</h1>
            <p className="text-gray-400 mb-12">Welcome back, {user.name}. Pick up where you left off.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {purchasedBooks.map((book) => (
                    <div key={book._id} className="bg-[#151515] border border-[#222] rounded-xl overflow-hidden group hover:border-gold-500/50 transition">
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img 
                                src={book.coverImage} 
                                alt={book.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Link 
                                    to={`/read/${book._id}`}
                                    className="bg-gold-500 text-[#111] w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition"
                                >
                                    <Play size={24} className="ml-1" />
                                </Link>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <h3 className="text-lg font-serif text-white truncate mb-1">{book.title}</h3>
                            <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                            
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>{book.progress}% completed</span>
                                    {book.progress === 100 && <span className="text-gold-500">Finished</span>}
                                </div>
                                <div className="w-full bg-[#222] rounded-full h-1.5">
                                    <div 
                                        className="bg-gold-500 h-1.5 rounded-full" 
                                        style={{ width: `${book.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Library;
