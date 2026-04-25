import Book from '../models/Book.js';

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        } : {};

        const books = await Book.find({ ...keyword });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
    try {
        const book = new Book({
            title: 'Sample name',
            author: 'Sample Author',
            price: 0,
            description: 'Sample description',
            coverImage: '/images/sample.jpg',
            category: 'Sample category',
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
    try {
        const { title, author, price, description, coverImage, category, isFeatured, fileUrl } = req.body;

        const book = await Book.findById(req.params.id);

        if (book) {
            book.title = title || book.title;
            book.author = author || book.author;
            book.price = price || book.price;
            book.description = description || book.description;
            book.coverImage = coverImage || book.coverImage;
            book.category = category || book.category;
            book.isFeatured = isFeatured !== undefined ? isFeatured : book.isFeatured;
            book.fileUrl = fileUrl || book.fileUrl;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Order from '../models/Order.js';
import path from 'path';

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Read a purchased book (Serve PDF)
// @route   GET /api/books/:filename/read
// @access  Private
const readBook = async (req, res) => {
    try {
        const filename = req.params.id; // Using id param as filename
        
        // For our simulated payment gateway, the frontend tracks purchases in localStorage.
        // So we will just verify the user is logged in (handled by 'protect' middleware)
        // and serve the requested file.
        
        if (!filename) {
            return res.status(404).json({ message: 'Book PDF not found' });
        }
        
        // Serve the PDF file from the secure backend folder
        const filePath = path.join(__dirname, `../uploads/books/${filename}`);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("sendFile error:", err);
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error sending file: ' + err.message });
                }
            }
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook, readBook };
