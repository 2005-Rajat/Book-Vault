import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Book, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

function Profile() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updateProfileHandler = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        // Mock update
        toast.success('Profile updated successfully');
        setPassword('');
        setConfirmPassword('');
    };

    // Dummy orders
    const myOrders = [
        { _id: "ORD-10023", date: "2026-04-20", total: 15.99, status: "Delivered", items: ["Atomic Habits"] },
        { _id: "ORD-10024", date: "2026-04-21", total: 27.98, status: "Delivered", items: ["Deep Work", "Psychology of Money"] },
    ];

    if (!user) {
        return <div className="container py-20 text-center text-white">Please login.</div>;
    }

    return (
        <div className="container py-12 max-w-6xl">
            <h1 className="text-4xl font-serif text-white mb-8">My Account</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Settings */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-[#151515] border border-[#222] rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#333]">
                            <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-500 text-2xl font-serif border border-gold-500/50">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                                <p className="text-gray-400 text-sm flex items-center gap-1">
                                    <Shield size={14} className={user.isAdmin ? "text-gold-500" : "text-gray-500"} /> 
                                    {user.isAdmin ? 'Administrator' : 'Standard User'}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={updateProfileHandler} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-[#111] border border-[#333] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-gold-500"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#111] border border-[#333] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-gold-500"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#333]">
                                <h3 className="text-white font-medium mb-4">Change Password</h3>
                                <div className="space-y-4">
                                    <input 
                                        type="password" 
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#111] border border-[#333] text-white px-4 py-2 rounded focus:outline-none focus:border-gold-500"
                                    />
                                    <input 
                                        type="password" 
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-[#111] border border-[#333] text-white px-4 py-2 rounded focus:outline-none focus:border-gold-500"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-2.5 rounded transition mt-4"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order History */}
                <div className="md:col-span-2">
                    <div className="bg-[#151515] border border-[#222] rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-[#333] flex justify-between items-center">
                            <h2 className="text-xl font-serif text-white">Order History</h2>
                            <span className="text-sm text-gray-400 bg-[#222] px-3 py-1 rounded-full flex items-center gap-1">
                                <Clock size={14} /> Recent
                            </span>
                        </div>
                        
                        {myOrders.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                You haven't placed any orders yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#111] text-gray-400 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-medium">Order ID</th>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Items</th>
                                            <th className="p-4 font-medium">Total</th>
                                            <th className="p-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-300 divide-y divide-[#222]">
                                        {myOrders.map((order) => (
                                            <tr key={order._id} className="hover:bg-[#1a1a1a] transition">
                                                <td className="p-4 font-mono text-gold-500">{order._id}</td>
                                                <td className="p-4">{order.date}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Book size={16} className="text-gray-500" />
                                                        {order.items.join(', ')}
                                                    </div>
                                                </td>
                                                <td className="p-4 font-bold text-white">${order.total}</td>
                                                <td className="p-4">
                                                    <span className="bg-green-500/10 text-green-500 px-2.5 py-1 rounded text-xs font-medium border border-green-500/20">
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
