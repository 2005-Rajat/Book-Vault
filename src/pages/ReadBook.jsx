import { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2, AlertCircle, Bookmark, BookOpen, ZoomIn, ZoomOut, ShoppingCart } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import api from '../services/api';
import { booksData } from '../data/books';

// Set worker URL
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ReadBook() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const searchParams = new URLSearchParams(location.search);
    const isSample = searchParams.get('sample') === 'true';
    const userInfo = localStorage.getItem('userInfo');

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [book, setBook] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // New features state
    const [viewMode, setViewMode] = useState('single');
    const [scale, setScale] = useState(1.2);
    const [bookmarks, setBookmarks] = useState(() => {
        if (isSample) return [];
        return JSON.parse(localStorage.getItem(`bookmarks_${id}`) || '[]');
    });

    // Enforce login for full reading
    useEffect(() => {
        if (!isSample && !userInfo) {
            navigate('/login');
        }
    }, [isSample, userInfo, navigate]);

    useEffect(() => {
        if (isSample) return;
        const savedPage = localStorage.getItem(`readingProgress_${id}`);
        if (savedPage) {
            setPageNumber(parseInt(savedPage, 10));
        }
    }, [id, isSample]);

    useEffect(() => {
        if (isSample) return;
        if (pageNumber > 0) {
            localStorage.setItem(`readingProgress_${id}`, pageNumber.toString());
        }
    }, [pageNumber, id, isSample]);

    const fetchPdf = async (fileUrl, sampleMode) => {
        try {
            const endpoint = sampleMode ? `/books/${fileUrl}/sample` : `/books/${fileUrl}/read`;
            const response = await api.get(endpoint, {
                responseType: 'blob'
            });
            const fileURL = URL.createObjectURL(response.data);
            setPdfUrl(fileURL);
            setLoading(false);
        } catch (err) {
            console.error("PDF Fetch Error:", err);
            const errorDetail = err.response?.data?.message || err.response?.statusText || err.message;
            setError(`Failed to load PDF (${err.response?.status || 'Network Error'}): ${errorDetail}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        let fileUrlToFetch = null;
        let bookInfo = null;

        if (isSample) {
            bookInfo = booksData.find(b => b._id === id);
            fileUrlToFetch = bookInfo?.fileUrl;
        } else {
            const library = JSON.parse(localStorage.getItem('myLibrary') || '[]');
            const purchasedBook = library.find(b => b._id === id);
            
            if (purchasedBook) {
                bookInfo = purchasedBook;
                // Fix for Atomic Habits (or any book): If fileUrl is missing in localStorage, grab it from booksData fallback
                fileUrlToFetch = purchasedBook.fileUrl || booksData.find(b => b._id === id)?.fileUrl;
                
                // Self-heal localStorage
                if (!purchasedBook.fileUrl && fileUrlToFetch) {
                    purchasedBook.fileUrl = fileUrlToFetch;
                    localStorage.setItem('myLibrary', JSON.stringify(library));
                }
            }
        }

        if (fileUrlToFetch) {
            setBook(bookInfo || booksData.find(b => b._id === id));
            fetchPdf(fileUrlToFetch, isSample);
        } else {
            setError(isSample ? "Sample not available for this book." : "Book not found in your library or file missing.");
            setLoading(false);
        }
    }, [id, isSample]);

    useEffect(() => {
        return () => {
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [pdfUrl]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(isSample ? Math.min(numPages, 5) : numPages);
    }

    const prevPage = () => {
        const step = viewMode === 'dual' ? 2 : 1;
        setPageNumber(prev => Math.max(1, prev - step));
    };

    const nextPage = () => {
        const step = viewMode === 'dual' ? 2 : 1;
        setPageNumber(prev => Math.min(numPages || prev, prev + step));
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error(err));
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    const toggleBookmark = () => {
        if (isSample) return;
        let newBookmarks;
        if (bookmarks.includes(pageNumber)) {
            newBookmarks = bookmarks.filter(b => b !== pageNumber);
        } else {
            newBookmarks = [...bookmarks, pageNumber].sort((a, b) => a - b);
        }
        setBookmarks(newBookmarks);
        localStorage.setItem(`bookmarks_${id}`, JSON.stringify(newBookmarks));
    };

    const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.5));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    
    const isBookmarked = bookmarks.includes(pageNumber);

    if (error) {
        return (
            <div className="bg-[#0f0f11] min-h-screen text-white flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle size={64} className="text-red-500 mb-6" />
                <h1 className="text-2xl font-bold mb-4">{error}</h1>
                <Link to={isSample ? `/book/${id}` : "/library"} className="bg-gold-500 text-[#111] font-bold py-2 px-6 rounded hover:bg-gold-600 transition">
                    Return to {isSample ? 'Book Details' : 'Library'}
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#0f0f11] h-screen text-white flex flex-col overflow-hidden font-sans relative">
            {/* Reader Header */}
            <header className="bg-[#151515] border-b border-[#222] px-4 md:px-6 py-4 flex justify-between items-center z-20 shrink-0 shadow-lg">
                <div className="flex items-center gap-4">
                    <Link to={isSample ? `/book/${id}` : "/library"} className="text-gray-400 hover:text-white transition bg-[#222] hover:bg-[#333] p-2 rounded-full">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="hidden sm:flex items-center gap-3">
                        {isSample && <span className="bg-gold-500 text-[#111] text-[10px] font-extrabold px-2 py-0.5 rounded tracking-widest uppercase">Sample</span>}
                        <div>
                            <h1 className="font-serif text-lg text-white font-medium truncate max-w-[200px] md:max-w-[300px]">
                                {book ? book.title : 'Loading...'}
                            </h1>
                            <p className="text-xs text-gray-500">{book ? book.author : ''}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
                    {/* Controls */}
                    <div className="items-center gap-1 bg-[#222] rounded-lg p-1 hidden lg:flex border border-white/5">
                        <button onClick={zoomOut} className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded transition" title="Zoom Out"><ZoomOut size={18} /></button>
                        <span className="text-xs text-gray-400 font-mono w-12 text-center select-none">{Math.round(scale * 100)}%</span>
                        <button onClick={zoomIn} className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded transition" title="Zoom In"><ZoomIn size={18} /></button>
                    </div>

                    <div className="items-center gap-1 bg-[#222] rounded-lg p-1 hidden md:flex border border-white/5">
                        <button 
                            onClick={() => { setViewMode('single'); setScale(1.2); }}
                            className={`p-1.5 rounded transition ${viewMode === 'single' ? 'bg-[#333] text-gold-400 shadow-sm' : 'text-gray-400 hover:text-white hover:bg-transparent'}`}
                            title="Single Page View"
                        >
                            <BookOpen size={18} />
                        </button>
                        <button 
                            onClick={() => { setViewMode('dual'); setScale(0.9); }}
                            className={`p-1.5 rounded transition ${viewMode === 'dual' ? 'bg-[#333] text-gold-400 shadow-sm' : 'text-gray-400 hover:text-white hover:bg-transparent'}`}
                            title="Dual Page View"
                        >
                            <div className="flex -space-x-2">
                                <BookOpen size={18} />
                                <BookOpen size={18} className="opacity-50" />
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center bg-[#222] rounded-lg p-1 border border-white/5 shadow-inner">
                        <button 
                            onClick={prevPage} 
                            disabled={pageNumber <= 1}
                            className="p-1.5 hover:bg-[#333] rounded disabled:opacity-30 transition hover:text-white text-gray-400"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="px-2 md:px-4 text-xs md:text-sm font-mono text-gray-300 min-w-[60px] md:min-w-[90px] text-center select-none">
                            {viewMode === 'dual' && pageNumber + 1 <= numPages ? `${pageNumber}-${pageNumber + 1}` : pageNumber} / {numPages || '--'}
                        </span>
                        <button 
                            onClick={nextPage} 
                            disabled={viewMode === 'dual' ? pageNumber + 1 >= numPages : pageNumber >= numPages}
                            className="p-1.5 hover:bg-[#333] rounded disabled:opacity-30 transition hover:text-white text-gray-400"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        {!isSample && (
                            <button 
                                onClick={toggleBookmark}
                                className={`transition p-2 rounded-full hover:bg-[#222] ${isBookmarked ? 'text-gold-500' : 'text-gray-400 hover:text-white'}`}
                                title="Bookmark Page"
                            >
                                <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                            </button>
                        )}

                        <button 
                            onClick={toggleFullscreen}
                            className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-[#222] hidden sm:block"
                            title="Toggle Fullscreen"
                        >
                            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Reader Body */}
            <div className="flex-grow overflow-auto bg-gradient-to-b from-[#111] to-[#050505] relative flex flex-col custom-scrollbar scroll-smooth z-10">
                <div className="flex-grow flex justify-center items-start p-4 md:p-8 min-h-full">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 font-medium">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mb-6"></div>
                            {isSample ? 'Loading Free Sample...' : 'Decrypting and Loading Secure PDF...'}
                        </div>
                    ) : pdfUrl && (
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={
                                <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 font-medium">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mb-6"></div>
                                    Rendering Document...
                                </div>
                            }
                            error={
                                <div className="flex flex-col items-center justify-center h-[60vh] text-red-400">
                                    <AlertCircle size={56} className="mb-4 text-red-500" />
                                    Failed to render PDF. The file might be corrupted.
                                </div>
                            }
                        >
                            <div className="flex gap-2 md:gap-8 justify-center items-start transition-all duration-300 mb-12">
                                <div className="shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white ring-1 ring-white/10 rounded-sm overflow-hidden transition-transform duration-200">
                                    <Page 
                                        pageNumber={pageNumber} 
                                        renderTextLayer={false} 
                                        renderAnnotationLayer={false}
                                        scale={scale}
                                        className="transition-all"
                                    />
                                </div>
                                {viewMode === 'dual' && pageNumber + 1 <= numPages && (
                                    <div className="shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white ring-1 ring-white/10 rounded-sm overflow-hidden hidden md:block transition-transform duration-200">
                                        <Page 
                                            pageNumber={pageNumber + 1} 
                                            renderTextLayer={false} 
                                            renderAnnotationLayer={false}
                                            scale={scale}
                                            className="transition-all"
                                        />
                                    </div>
                                )}
                            </div>
                        </Document>
                    )}
                </div>
                
                {/* Sample Mode Purchase Call to Action */}
                {isSample && pageNumber >= (viewMode === 'dual' ? numPages - 1 : numPages) && (
                    <div className="sticky bottom-0 left-0 right-0 bg-[#151515]/95 backdrop-blur-md border-t border-gold-500/30 p-4 flex flex-col sm:flex-row items-center justify-center gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                        <div className="text-gray-300 text-sm text-center">
                            You've reached the end of the sample. Purchase the full book to continue reading.
                        </div>
                        <Link 
                            to={`/book/${id}`}
                            className="bg-gold-500 hover:bg-gold-600 text-[#111] font-bold py-2 px-6 rounded-lg transition shadow-lg shadow-gold-500/20 whitespace-nowrap flex items-center gap-2"
                        >
                            <ShoppingCart size={16} /> Purchase Full Book
                        </Link>
                    </div>
                )}
            </div>
            
            {/* Minimalist Progress Bar */}
            {numPages && (
                <div className="h-1 w-full bg-[#111] shrink-0 relative z-20">
                    <div 
                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        style={{ width: `${((viewMode === 'dual' ? Math.min(numPages, pageNumber + 1) : pageNumber) / numPages) * 100}%` }}
                    ></div>
                </div>
            )}
        </div>
    );
}

export default ReadBook;
