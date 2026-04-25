import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        default: "", // URL to PDF/EPUB file
    },
    sampleUrl: {
        type: String,
        default: "", // URL to Sample PDF
    },
    category: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    pages: {
        type: Number,
        default: 0
    },
    language: {
        type: String,
        default: "English"
    }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
