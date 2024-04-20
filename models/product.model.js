const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {


        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        
        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false,
            default: "https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg"
        }

    },

    {
        timestamps: true
    }

);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
