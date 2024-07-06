const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {

        fullname: {
            type: String,
            required: [true, "Please enter your fullname!"]
        },

        email: {
            type: String,
            required: [true, "Please enter email!"],
            unique: true
        },

        password: {
            type: String,
            required: [true, "Please enter password!"],
        },

        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],

        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],

        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],

        isAdmin: {
            type: Boolean, default: false
        }

    },

    {
        timestamps: true
    }

);

const User = mongoose.model("User", UserSchema);

module.exports = User;
