const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
            unique: false
        },
        
        price: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            required: false,
            default: "https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg"
        },

        description: {
            type: String,
            required: false,
        },

        brand: {
            type: String,
            required: [true, "Please enter product brand"],
        },

        category: {
            type: String,
            required: [true, "Please enter product category"],
        },

        type: {
            type: String,
            required: [true, "Please enter product type"],
        },

        salePercent: {
            type: Number,
            required: false,
        },

        priceAfterSale: {
            type: Number,
            required: false,
        },

        priceBeforePromotion: {
            type: Number,
            required: false,
        },

        priceAfterPromotion: {
            type: Number,
            required: false,
        },

        salesCount: {
            type: Number,
            default: 0,
        },

        rating: {
            type: Number,
            default: 0,
        },

        reviewsCount: {
            type: Number,
            default: 0,
        },

        featured: {
            type: Boolean,
            default: false,
        }
    },

    {
        timestamps: true
    }

);

// Compound unique index
ProductSchema.index({ name: 1, brand: 1, category: 1, type: 1 }, { unique: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
