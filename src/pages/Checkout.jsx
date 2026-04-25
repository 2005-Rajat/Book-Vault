import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
    CheckCircle, CreditCard, Lock, ShieldCheck, Ticket, 
    QrCode, Smartphone, Building, Download, ChevronRight, FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    
    // Payment State
    const [paymentMethod, setPaymentMethod] = useState('upi'); // 'card', 'upi', 'netbanking'
    const [upiApp, setUpiApp] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [orderId, setOrderId] = useState('');

    const tax = (cartTotal - discount) * 0.08;
    const total = (cartTotal - discount) + tax;

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            navigate('/cart');
        }
    }, [cartItems, isSuccess, navigate]);

    const applyCoupon = (e) => {
        e.preventDefault();
        if (couponCode.toUpperCase() === 'LAUNCH20') {
            setDiscount(cartTotal * 0.20);
            toast.success('20% discount applied!');
        } else {
            toast.error('Invalid coupon code');
            setDiscount(0);
        }
    };

    const handlePayment = (e) => {
        if(e) e.preventDefault();
        
        if (paymentMethod === 'upi' && !upiApp && !e.target.vpa?.value) {
            toast.error('Please enter a UPI ID or select an app');
            return;
        }
        if (paymentMethod === 'netbanking' && !selectedBank) {
            toast.error('Please select a bank');
            return;
        }

        setIsProcessing(true);
        
        // Simulate Stripe/Gateway Processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
            
            // Add to My Library (localStorage for simulation)
            const newPurchases = cartItems.map(item => ({
                ...item.book,
                progress: 0,
                purchasedAt: new Date().toISOString()
            }));
            const existingLibrary = JSON.parse(localStorage.getItem('myLibrary') || '[]');
            
            // Filter out duplicates if bought again
            const filteredLibrary = existingLibrary.filter(book => 
                !newPurchases.find(newBook => newBook._id === book._id)
            );
            
            localStorage.setItem('myLibrary', JSON.stringify([...filteredLibrary, ...newPurchases]));

            clearCart();
            toast.success('Payment successful!');
        }, 3000);
    };

    if (isSuccess) {
        return (
            <div className="container py-12 max-w-4xl mx-auto">
                <div className="bg-[#151515] rounded-2xl border border-[#222] shadow-2xl overflow-hidden relative">
                    {/* Success Header */}
                    <div className="bg-gradient-to-br from-green-500/20 to-transparent p-10 text-center border-b border-[#222]">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-green-500 p-4 rounded-full inline-block mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                        >
                            <CheckCircle className="text-[#111]" size={48} />
                        </motion.div>
                        <h2 className="text-4xl font-serif text-white mb-2">Payment Successful</h2>
                        <p className="text-green-400 font-medium tracking-wide mb-1">Your books have been added to My Library.</p>
                        <p className="text-gray-500 text-sm">Order ID: {orderId}</p>
                    </div>

                    {/* Invoice Details */}
                    <div className="p-10">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#222]">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <FileText size={20} className="text-gold-500" /> Official Invoice
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-400">Amount Paid</p>
                                <p className="text-3xl font-bold text-white">${total.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="bg-[#0a0a0a] rounded-lg p-6 mb-8 border border-[#222]">
                            <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Items Purchased</h4>
                            <div className="space-y-4">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-500">{item.qty}x</span>
                                            <span className="text-white">{item.book.title}</span>
                                        </div>
                                        <span className="text-gray-400">${(item.book.price * item.qty).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                            <button 
                                onClick={() => navigate('/library')}
                                className="bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-3 px-8 rounded-lg transition flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={18} /> Go to My Library
                            </button>
                            <button 
                                onClick={() => window.print()}
                                className="bg-[#222] hover:bg-[#333] text-white font-medium py-3 px-8 rounded-lg transition flex items-center justify-center gap-2 border border-[#444]"
                            >
                                <Download size={18} /> Download Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-12 max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-10 text-gray-400">
                <ShieldCheck className="text-[#635BFF]" size={24} />
                <span className="text-sm font-medium tracking-wide uppercase">Secure Payment Gateway</span>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Left Column: Payment Gateway Tabs */}
                <div className="lg:col-span-3">
                    <div className="bg-[#151515] rounded-xl border border-[#222] shadow-2xl overflow-hidden">
                        {/* Tab Headers */}
                        <div className="flex border-b border-[#222] bg-[#0a0a0a]">
                            <button 
                                onClick={() => setPaymentMethod('upi')}
                                className={`flex-1 py-4 text-sm font-medium transition flex justify-center items-center gap-2 ${paymentMethod === 'upi' ? 'text-[#635BFF] border-b-2 border-[#635BFF] bg-[#151515]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <QrCode size={18} /> UPI / QR
                            </button>
                            <button 
                                onClick={() => setPaymentMethod('card')}
                                className={`flex-1 py-4 text-sm font-medium transition flex justify-center items-center gap-2 ${paymentMethod === 'card' ? 'text-[#635BFF] border-b-2 border-[#635BFF] bg-[#151515]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <CreditCard size={18} /> Card
                            </button>
                            <button 
                                onClick={() => setPaymentMethod('netbanking')}
                                className={`flex-1 py-4 text-sm font-medium transition flex justify-center items-center gap-2 ${paymentMethod === 'netbanking' ? 'text-[#635BFF] border-b-2 border-[#635BFF] bg-[#151515]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Building size={18} /> Netbanking
                            </button>
                        </div>

                        {/* Payment Forms */}
                        <div className="p-8 relative min-h-[400px]">
                            {/* Loading Overlay */}
                            <AnimatePresence>
                                {isProcessing && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-10 bg-[#151515]/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-b-xl"
                                    >
                                        <div className="w-16 h-16 border-4 border-[#222] border-t-[#635BFF] rounded-full animate-spin mb-4"></div>
                                        <p className="text-white font-medium">Processing Payment...</p>
                                        <p className="text-gray-400 text-sm mt-1">Please do not close this window</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* UPI Flow */}
                            {paymentMethod === 'upi' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                                        <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-gray-100">
                                            {/* Dummy QR Code */}
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=bookstore@upi&pn=BookVault&am=100.00&cu=INR" alt="UPI QR Code" className="w-40 h-40" />
                                            <p className="text-center text-[#111] font-bold mt-2 text-sm">Scan to Pay</p>
                                        </div>
                                        <div className="flex flex-col gap-4 w-full md:w-auto">
                                            <h3 className="text-white text-center md:text-left font-medium mb-2">Or select your app</h3>
                                            <div className="grid grid-cols-3 gap-3">
                                                <button onClick={() => setUpiApp('gpay')} className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition ${upiApp === 'gpay' ? 'bg-[#222] border-blue-500' : 'bg-[#0a0a0a] border-[#333] hover:border-[#444]'}`}>
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xs">G</div>
                                                    <span className="text-xs text-gray-300">GPay</span>
                                                </button>
                                                <button onClick={() => setUpiApp('phonepe')} className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition ${upiApp === 'phonepe' ? 'bg-[#222] border-purple-500' : 'bg-[#0a0a0a] border-[#333] hover:border-[#444]'}`}>
                                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">पे</div>
                                                    <span className="text-xs text-gray-300">PhonePe</span>
                                                </button>
                                                <button onClick={() => setUpiApp('paytm')} className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition ${upiApp === 'paytm' ? 'bg-[#222] border-sky-500' : 'bg-[#0a0a0a] border-[#333] hover:border-[#444]'}`}>
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sky-500 font-bold text-[10px]">Paytm</div>
                                                    <span className="text-xs text-gray-300">Paytm</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative mt-8">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-[#333]"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-4 bg-[#151515] text-gray-500">OR ENTER UPI ID</span>
                                        </div>
                                    </div>

                                    <form id="upi-form" onSubmit={handlePayment} className="flex gap-2">
                                        <input 
                                            name="vpa"
                                            type="text" 
                                            placeholder="username@bank" 
                                            className="flex-grow bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 rounded focus:outline-none focus:border-[#635BFF] transition"
                                        />
                                        <button type="submit" className="bg-[#635BFF] hover:bg-[#5b54eb] text-white px-6 py-3 rounded font-medium transition">
                                            Verify & Pay
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Card Flow */}
                            {paymentMethod === 'card' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <form id="card-form" onSubmit={handlePayment} className="space-y-5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white font-medium flex items-center gap-2">
                                                Credit / Debit Card
                                            </span>
                                            <div className="flex gap-1">
                                                <div className="w-8 h-5 bg-[#222] rounded flex items-center justify-center text-[10px] text-white/70 font-bold border border-[#333]">VISA</div>
                                                <div className="w-8 h-5 bg-[#222] rounded flex items-center justify-center text-[10px] text-white/70 font-bold border border-[#333]">MC</div>
                                                <div className="w-8 h-5 bg-[#222] rounded flex items-center justify-center text-[10px] text-white/70 font-bold border border-[#333]">AMEX</div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Card Information</label>
                                            <div className="border border-[#333] rounded-lg bg-[#0a0a0a] overflow-hidden focus-within:border-[#635BFF] transition focus-within:ring-1 focus-within:ring-[#635BFF]">
                                                <div className="border-b border-[#333] p-3 flex items-center gap-2">
                                                    <CreditCard size={16} className="text-gray-500" />
                                                    <input 
                                                        type="text" 
                                                        placeholder="0000 0000 0000 0000" 
                                                        required
                                                        className="w-full bg-transparent text-white focus:outline-none tracking-widest placeholder:tracking-normal"
                                                    />
                                                </div>
                                                <div className="flex">
                                                    <div className="w-1/2 border-r border-[#333] p-3">
                                                        <input 
                                                            type="text" 
                                                            placeholder="MM / YY" 
                                                            required
                                                            className="w-full bg-transparent text-white focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="w-1/2 p-3">
                                                        <input 
                                                            type="text" 
                                                            placeholder="CVC" 
                                                            required
                                                            className="w-full bg-transparent text-white focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Name on Card</label>
                                            <input 
                                                type="text" 
                                                defaultValue={user?.name || ''}
                                                required
                                                placeholder="John Doe"
                                                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition"
                                            />
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* Netbanking Flow */}
                            {paymentMethod === 'netbanking' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <h3 className="text-white font-medium mb-4">Popular Banks</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['HDFC', 'SBI', 'ICICI', 'Axis'].map(bank => (
                                            <button 
                                                key={bank}
                                                onClick={() => setSelectedBank(bank)}
                                                className={`py-4 rounded-xl border flex flex-col items-center gap-2 transition ${selectedBank === bank ? 'bg-[#635BFF]/10 border-[#635BFF]' : 'bg-[#0a0a0a] border-[#333] hover:border-[#555]'}`}
                                            >
                                                <Building size={24} className={selectedBank === bank ? 'text-[#635BFF]' : 'text-gray-400'} />
                                                <span className={`text-sm font-medium ${selectedBank === bank ? 'text-[#635BFF]' : 'text-gray-300'}`}>{bank}</span>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Other Banks</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#635BFF] transition appearance-none"
                                                onChange={(e) => setSelectedBank(e.target.value)}
                                                value={selectedBank}
                                            >
                                                <option value="" disabled>Select your bank</option>
                                                <option value="Kotak">Kotak Mahindra Bank</option>
                                                <option value="PNB">Punjab National Bank</option>
                                                <option value="BOB">Bank of Baroda</option>
                                                <option value="Yes">Yes Bank</option>
                                            </select>
                                            <ChevronRight size={16} className="absolute right-4 top-4 text-gray-500 rotate-90" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-2">
                    <div className="bg-[#151515] p-6 rounded-xl border border-[#222] shadow-xl sticky top-24">
                        <h2 className="text-xl font-serif text-white mb-6 border-b border-[#222] pb-4">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.book._id} className="flex gap-4 group">
                                    <img src={item.book.coverImage} alt={item.book.title} className="w-12 h-16 object-cover rounded border border-[#333] group-hover:border-gold-500 transition" />
                                    <div className="flex-grow">
                                        <h4 className="text-white text-sm line-clamp-1">{item.book.title}</h4>
                                        <p className="text-gray-500 text-xs mb-1">{item.book.author}</p>
                                        <div className="text-gray-400 text-xs bg-[#222] inline-block px-2 py-0.5 rounded">Qty: {item.qty}</div>
                                    </div>
                                    <div className="text-white font-medium">${(item.book.price * item.qty).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        {/* Coupon Field */}
                        <form onSubmit={applyCoupon} className="mb-6 flex gap-2">
                            <div className="relative flex-grow">
                                <Ticket className="absolute left-3 top-2.5 text-gray-500" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Coupon code (e.g. LAUNCH20)" 
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-[#333] text-white pl-9 pr-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-gold-500 transition"
                                />
                            </div>
                            <button type="submit" className="bg-[#222] hover:bg-[#333] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition border border-[#333]">
                                Apply
                            </button>
                        </form>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded">
                                    <span>Discount (20%)</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Tax (8%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <div className="border-t border-[#333] pt-4 mb-6 flex justify-between items-center text-white font-bold text-2xl">
                            <span>Total</span>
                            <span className="text-gold-500">${total.toFixed(2)}</span>
                        </div>

                        <button 
                            form={paymentMethod === 'card' ? 'card-form' : paymentMethod === 'upi' ? 'upi-form' : ''}
                            onClick={paymentMethod === 'netbanking' || paymentMethod === 'upi' ? handlePayment : undefined}
                            type={paymentMethod === 'card' || paymentMethod === 'upi' ? "submit" : "button"}
                            disabled={isProcessing}
                            className="w-full bg-[#635BFF] hover:bg-[#5b54eb] text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(99,91,255,0.3)] hover:shadow-[0_0_30px_rgba(99,91,255,0.5)] disabled:opacity-70 disabled:hover:shadow-none"
                        >
                            {isProcessing ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <Lock size={18} /> Pay ${total.toFixed(2)} Securely
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-4 flex justify-center items-center gap-1.5 font-medium">
                            <ShieldCheck size={14} className="text-green-500"/> 256-bit SSL Encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
