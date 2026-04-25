import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';

dotenv.config();

const updates = [
    { title: "The Psychology of Money", fileUrl: "Psychology-of-Money.pdf" },
    { title: "Thinking, Fast and Slow", fileUrl: "thinking-fast-and-slow.pdf" },
    { title: "Atomic Habits", fileUrl: "Atomic-habbits.pdf" },
    { title: "Rich Dad Poor Dad", fileUrl: "rich-dad-poor-dad.pdf" },
    { title: "Zero to One", fileUrl: "Zero-to-One.pdf" },
    { title: "The Lean Startup", fileUrl: "The-Lean-Startup.pdf" },
    { title: "Ikigai", fileUrl: "Ikigai.pdf" },
    { title: "Can't Hurt Me", fileUrl: "Can-t-Hurt-Me.pdf" },
    { title: "The Power of Now", fileUrl: "power-of-now.pdf" },
    { title: "Deep Work", fileUrl: "deep-work.pdf" },
    { title: "Eat That Frog!", fileUrl: "eat-that-frog.pdf" },
    { title: "The ONE Thing", fileUrl: "the-one-thing.pdf" }
];

const updateDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for safe update...");

        for (const update of updates) {
            const result = await Book.updateOne(
                { title: update.title },
                { $set: { fileUrl: update.fileUrl } }
            );
            if (result.matchedCount > 0) {
                console.log(`Updated fileUrl for: "${update.title}"`);
            } else {
                console.log(`Warning: Book not found: "${update.title}"`);
            }
        }

        console.log("Safe update completed!");
        process.exit();
    } catch (error) {
        console.error(`Error with data update: ${error.message}`);
        process.exit(1);
    }
};

updateDB();
