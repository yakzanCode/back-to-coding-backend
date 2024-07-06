require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

// Signup function to create a new user
async function signup(req, res) {
    const { email, password, fullname } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            fullname
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Signin function to authenticate an existing user
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a token
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Exclude the password from the user object
        const { password: _, ...userWithoutPassword } = user.toObject();

        // Send the token and user information in the response
        res.cookie("access_token", token, { httpOnly: true, maxAge: 3600000 })
           .status(200)
           .json({ message: 'Sign-in successful', user: userWithoutPassword });

    } catch (error) {
        console.error('Error in signin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    signup,
    signin
};
