const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getUserProfile, updateUserProfile, addToFavorites, removeFromFavorites } = require('../controllers/user.controller.js');
const { isAuthenticated } = require('../middlewares/auth.middleware.js');

router.get('/All', getAllUsers);

router.delete('/:userId', deleteUser);

// Get user profile
router.get('/profile', isAuthenticated, getUserProfile);

// Update user profile
router.put('/profile', isAuthenticated, updateUserProfile);

// Add product to favorites
router.post('/favorites/:productId', isAuthenticated, addToFavorites);

// Remove product from favorites
router.delete('/favorites/:productId', isAuthenticated, removeFromFavorites);


module.exports = router;
