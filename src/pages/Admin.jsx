import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, BookOpen, ShoppingBag, DollarSign, Plus, Edit, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Admin() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // Dummy Data
    const stats = { users: 1250, books: 45, orders: 320, revenue: 15420.50 };
    const salesData = [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 2000 },
        { name: 'Apr', sales: 2780 },
        { name: 'May', sales: 1890 },
        { name: 'Jun', sales: 2390 },
    ];
    const recentBooks = [
        { _id: "1", title: "Atomic Habits", price: 15.99, stock: 100 },
        { _id: "2", title: "Deep Work", price: 12.99, stock: 50 },
    ];

    if (!user || !user.isAdmin) {
        return <div className="container py-20 text-center text-white">Not authorized as an admin.</div>;
    }

    return (
        <div className="container py-12 flex gap-8">
            {/* Sidebar */}
            <div className="w-64 shrink-0">
                <div className="bg-[#151515] border border-[#222] rounded-xl p-4 sticky top-24">
                    <h2 className="text-xl font-serif text-white mb-6 px-4">Admin Panel</h2>
                    <nav className="space-y-2">
                        <button 
                            onClick={() => setActiveTab('dashboard')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-gold-500 text-[#111] font-medium' : 'text-gray-400 hover:bg-[#222] hover:text-white'}`}
                        >
                            <DollarSign size={20} /> Dashboard
                        </button>
                        <button 
                            onClick={() => setActiveTab('books')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'books' ? 'bg-gold-500 text-[#111] font-medium' : 'text-gray-400 hover:bg-[#222] hover:text-white'}`}
                        >
                            <BookOpen size={20} /> Manage Books
                        </button>
                        <button 
                            onClick={() => setActiveTab('orders')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'orders' ? 'bg-gold-500 text-[#111] font-medium' : 'text-gray-400 hover:bg-[#222] hover:text-white'}`}
                        >
                            <ShoppingBag size={20} /> Orders
                        </button>
                        <button 
                            onClick={() => setActiveTab('users')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'users' ? 'bg-gold-500 text-[#111] font-medium' : 'text-gray-400 hover:bg-[#222] hover:text-white'}`}
                        >
                            <Users size={20} /> Users
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        <h1 className="text-3xl font-serif text-white">Dashboard Overview</h1>
                        
                        {/* Stat Cards */}
                        <div className="grid grid-cols-4 gap-6">
                            <div className="bg-[#151515] border border-[#222] rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-blue-500/10 p-3 rounded-lg text-blue-500"><Users size={24} /></div>
                                </div>
                                <h3 className="text-gray-400 text-sm mb-1">Total Users</h3>
                                <p className="text-2xl font-bold text-white">{stats.users}</p>
                            </div>
                            <div className="bg-[#151515] border border-[#222] rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500"><BookOpen size={24} /></div>
                                </div>
                                <h3 className="text-gray-400 text-sm mb-1">Total Books</h3>
                                <p className="text-2xl font-bold text-white">{stats.books}</p>
                            </div>
                            <div className="bg-[#151515] border border-[#222] rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-orange-500/10 p-3 rounded-lg text-orange-500"><ShoppingBag size={24} /></div>
                                </div>
                                <h3 className="text-gray-400 text-sm mb-1">Total Orders</h3>
                                <p className="text-2xl font-bold text-white">{stats.orders}</p>
                            </div>
                            <div className="bg-[#151515] border border-[#222] rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-green-500/10 p-3 rounded-lg text-green-500"><DollarSign size={24} /></div>
                                </div>
                                <h3 className="text-gray-400 text-sm mb-1">Total Revenue</h3>
                                <p className="text-2xl font-bold text-white">${stats.revenue.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-[#151515] border border-[#222] rounded-xl p-6">
                            <h3 className="text-xl font-serif text-white mb-6">Sales Analytics</h3>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="name" stroke="#666" />
                                        <YAxis stroke="#666" />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                                            itemStyle={{ color: '#d4af37' }}
                                        />
                                        <Bar dataKey="sales" fill="#d4af37" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'books' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-serif text-white">Manage Books</h1>
                            <button className="bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-2 px-4 rounded transition flex items-center gap-2">
                                <Plus size={18} /> Add Book
                            </button>
                        </div>
                        
                        <div className="bg-[#151515] border border-[#222] rounded-xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#111] text-gray-400 text-sm uppercase tracking-wider border-b border-[#333]">
                                        <th className="p-4 font-medium">ID</th>
                                        <th className="p-4 font-medium">Title</th>
                                        <th className="p-4 font-medium">Price</th>
                                        <th className="p-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-300 divide-y divide-[#222]">
                                    {recentBooks.map((book) => (
                                        <tr key={book._id} className="hover:bg-[#1a1a1a] transition">
                                            <td className="p-4 font-mono text-gray-500">{book._id}</td>
                                            <td className="p-4 text-white font-medium">{book.title}</td>
                                            <td className="p-4">${book.price}</td>
                                            <td className="p-4 text-right">
                                                <button className="text-blue-400 hover:text-blue-300 p-2"><Edit size={18} /></button>
                                                <button className="text-red-400 hover:text-red-300 p-2"><Trash2 size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;