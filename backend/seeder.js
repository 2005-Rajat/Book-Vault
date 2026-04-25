import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';
import User from './models/User.js';

dotenv.config();

const booksData = [
    {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 14.99,
        description: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.",
        coverImage: "https://m.media-amazon.com/images/I/71g2ednj0JL._SL1500_.jpg",
        fileUrl: "Psychology-of-Money.pdf",
        rating: 4.9,
        numReviews: 1542,
        category: "Psychology",
        pages: 252,
        language: "English"
    },
    {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        price: 16.99,
        description: "The phenomenal New York Times Bestseller by Nobel Prize-winner Daniel Kahneman, Thinking, Fast and Slow offers a whole new look at the way our minds work.",
        coverImage: "/images/thinking-fast.png",
        fileUrl: "thinking-fast-and-slow.pdf",
        rating: 4.7,
        numReviews: 2310,
        category: "Psychology",
        pages: 499,
        language: "English"
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        price: 15.99,
        description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation.",
        coverImage: "https://m.media-amazon.com/images/I/81bGKUa1e0L._SL1500_.jpg",
        fileUrl: "Atomic-habbits.pdf",
        rating: 4.8,
        numReviews: 5430,
        category: "Psychology",
        pages: 320,
        language: "English",
        isFeatured: true
    },
    {
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        price: 13.99,
        description: "Rich Dad Poor Dad is Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing.",
        coverImage: "https://m.media-amazon.com/images/I/81bsw6fnUiL._SL1500_.jpg",
        fileUrl: "rich-dad-poor-dad.pdf",
        rating: 4.8,
        numReviews: 4200,
        category: "Business & Finance",
        pages: 336,
        language: "English",
        isFeatured: true
    },
    {
        title: "Zero to One",
        author: "Peter Thiel",
        price: 18.99,
        description: "If you want to build a better future, you must believe in secrets. The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create.",
        coverImage: "https://m.media-amazon.com/images/I/71uAI28kJuL._SL1500_.jpg",
        fileUrl: "Zero-to-One.pdf",
        rating: 4.6,
        numReviews: 1850,
        category: "Business & Finance",
        pages: 224,
        language: "English"
    },
    {
        title: "The Lean Startup",
        author: "Eric Ries",
        price: 17.99,
        description: "Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched.",
        coverImage: "https://m.media-amazon.com/images/I/81-QB7nDh4L._SL1500_.jpg",
        fileUrl: "The-Lean-Startup.pdf",
        rating: 4.5,
        numReviews: 2100,
        category: "Business & Finance",
        pages: 336,
        language: "English",
        isFeatured: true
    },
    {
        title: "Ikigai",
        author: "Héctor García",
        price: 12.99,
        description: "The Japanese Secret to a Long and Happy Life. Bring meaning and joy to all your days with this internationally bestselling guide to the Japanese concept of ikigai.",
        coverImage: "https://m.media-amazon.com/images/I/814L+vq01mL._SL1500_.jpg",
        fileUrl: "Ikigai.pdf",
        rating: 4.7,
        numReviews: 3200,
        category: "Self Help",
        pages: 208,
        language: "English"
    },
    {
        title: "Can't Hurt Me",
        author: "David Goggins",
        price: 19.99,
        description: "For David Goggins, childhood was a nightmare - poverty, prejudice, and physical abuse colored his days and haunted his nights. But through self-discipline, mental toughness, and hard work, Goggins transformed himself.",
        coverImage: "https://m.media-amazon.com/images/I/81gTRv2HXrL._SL1500_.jpg",
        fileUrl: "Can-t-Hurt-Me.pdf",
        rating: 4.9,
        numReviews: 6100,
        category: "Self Help",
        pages: 364,
        language: "English",
        isFeatured: true
    },
    {
        title: "The Power of Now",
        author: "Eckhart Tolle",
        price: 14.50,
        description: "To make the journey into the Now we will need to leave our analytical mind and its false created self, the ego, behind.",
        coverImage: "/images/power-of-now.jpg",
        fileUrl: "power-of-now.pdf",
        rating: 4.6,
        numReviews: 2900,
        category: "Self Help",
        pages: 236,
        language: "English"
    },
    {
        title: "Deep Work",
        author: "Cal Newport",
        price: 16.50,
        description: "Rules for Focused Success in a Distracted World. Deep work is the ability to focus without distraction on a cognitively demanding task.",
        coverImage: "/images/deep-work.jpg",
        fileUrl: "deep-work.pdf",
        rating: 4.7,
        numReviews: 2400,
        category: "Productivity",
        pages: 304,
        language: "English"
    },
    {
        title: "Eat That Frog!",
        author: "Brian Tracy",
        price: 11.99,
        description: "21 Great Ways to Stop Procrastinating and Get More Done in Less Time. There just isn't enough time for everything on our 'To Do' list—and there never will be.",
        coverImage: "/images/eat-that-frog.jpg",
        fileUrl: "eat-that-frog.pdf",
        rating: 4.5,
        numReviews: 1800,
        category: "Productivity",
        pages: 144,
        language: "English"
    },
    {
        title: "The ONE Thing",
        author: "Gary Keller",
        price: 15.00,
        description: "The Surprisingly Simple Truth Behind Extraordinary Results. You want fewer distractions and less on your plate. The daily barrage of e-mails, texts, tweets, messages, and meetings distract you and stress you out.",
        coverImage: "/images/the-one-thing.png",
        fileUrl: "the-one-thing.pdf",
        rating: 4.7,
        numReviews: 3100,
        category: "Productivity",
        pages: 240,
        language: "English"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding...");

        await Book.deleteMany();
        console.log("Cleared old books...");

        await Book.insertMany(booksData);
        console.log("Data Imported successfully!");

        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
