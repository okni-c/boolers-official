const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        productDescription: {
            type: String,
            required: true,
            min: 1,
            max: 300
        },
        productName: {
            type: String,
            required: true
        },
        productQuote: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        imageRoute: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = mongoose.model('Product', ProductSchema);