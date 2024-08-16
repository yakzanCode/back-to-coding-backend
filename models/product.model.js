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



// {
//     "name": "LASH SENSATIONAL FIREWORK",
//     "price": 13.99,
//     "category": "Eyes",
//     "type": "Maskara",
//     "brand": "Maybelline",
//     "image": "https://www.maybelline.com/-/media/project/loreal/brand-sites/mny/americas/us/eye-makeup/mascara/lash-sensational-firework-washable-mascara/maybelline-lash-sensational-firework-mascara-washable-very-black-41554086287-p.jpg?rev=bec03548e7de4f5794867f2e039a5a22&cx=0.46&cy=0.5&cw=760&ch=1138&hash=D0B0702E19A5652E1E24D76F231CB447",
//     "description": "WASHABLE MASCARA MAKEUP",
//     "salePercent": 20,
//     "priceAfterSale": 11.20,
//     "priceBeforePromotion": ,
//     "priceAfterPromotion": ,
//     "salesCount": 36,
//     "rating": 4.6,
//     "reviewsCount": 8,
//     "featured": true
//   }