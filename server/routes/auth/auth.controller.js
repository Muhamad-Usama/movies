const {findUserByEmail, saveUser, existsUserWithEmail} = require("../../models/users/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Handles user sign-in.
 * 1. Checks if the user exists by email.
 * 2. Compares the provided password with the stored hash.
 * 3. Generates a JWT token for the authenticated user.
 *
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object to send the result or error message.
 */
const signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Find user by email using existing model method
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            return res.status(404).send({message: "No record Found"});
        }

        // Compare password with the hashed password using model method
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);

        if (!isCorrectPassword) {
            return res.status(400).send({message: "Bad Credentials"});
        }

        // Generate JWT token
        const token = jwt.sign({id: existingUser._id, email: existingUser.email}, "test", // Secret key, use environment variables in production
            {expiresIn: "4h"});

        // Send response with user data and token
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
};

/**
 * Handles user sign-up.
 * 1. Checks if the user already exists by email using model method.
 * 2. Verifies password confirmation.
 * 3. Hashes the password and creates a new user record using the model method.
 * 4. Generates a JWT token for the new user.
 *
 * @param {Object} req - The request object containing user sign-up data.
 * @param {Object} res - The response object to send the result or error message.
 */
const signUp = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Check if user already exists using model method
        const userExists = await existsUserWithEmail(email);
        if (userExists) {
            return res.status(409).send({message: "User Already Exists"});
        }

        // Check if passwords match
        if (password !== req.body.confirmPassword) {
            return res.status(400).send({message: "Passwords do not match"});
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user object and save it using model method
        const user = {
            name: `${req.body.firstName} ${req.body.lastName}`, password: hashedPassword, email: req.body.email,
        };

        // Save user using the model method
        const result = await saveUser(user);

        // Generate JWT token
        const token = jwt.sign({id: result._id, email: result.email}, "test", {
            expiresIn: "1h",
        });

        // Send response with user data and token
        res.status(201).json({result: result, token});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
};

module.exports = {
    signIn, signUp
}
