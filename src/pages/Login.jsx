import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await login(email, password);
        setIsLoading(false);
        
        if (result.success) {
            toast.success('Login successful');
            navigate(redirect);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="container py-20 min-h-[80vh] flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-[#151515] border border-[#222] p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-[40px] pointer-events-none"></div>
                
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-[#1a1a1a] p-3 rounded-full mb-4 border border-[#333]">
                        <BookOpen className="text-gold-500" size={32} />
                    </div>
                    <h1 className="text-3xl font-serif text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Enter your credentials to access your library</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#111] border border-[#333] text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-gold-500 transition"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-300">Password</label>
                            <Link to="/forgot-password" className="text-xs text-gold-500 hover:text-gold-400 transition">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#111] border border-[#333] text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-gold-500 transition"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-3 rounded-lg transition flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#111]"></div>
                        ) : (
                            <>Sign In <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-gold-500 hover:text-gold-400 transition font-medium">
                        Create an account
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;