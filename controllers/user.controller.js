const User = require('../models/user.model.js');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords from the response
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `User ${user.fullname} deleted successfully` });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = req.body.email || user.email;
        user.fullname = req.body.fullname || user.fullname; 

        const updatedUser = await user.save();

        // Exclude password from the response
        const { password, ...userProfile } = updatedUser.toObject();

        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Add product to favorites
const addToFavorites = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.favorites.includes(productId)) {
            user.favorites.push(productId);
            await user.save();
        }

        res.status(200).json({ message: 'Product added to favorites' });
    } catch (error) {
        console.error('Error in addToFavorites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Remove product from favorites
const removeFromFavorites = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.favorites = user.favorites.filter(fav => fav.toString() !== productId);
        await user.save();

        res.status(200).json({ message: 'Product removed from favorites' });
    } catch (error) {
        console.error('Error in removeFromFavorites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    getUserProfile,
    updateUserProfile,
    addToFavorites,
    removeFromFavorites
};
