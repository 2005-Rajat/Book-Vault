import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Book',
            },
            qty: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
