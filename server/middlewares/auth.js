const jwt = require("jsonwebtoken");

/**
 * Middleware to authorize the user by verifying the JWT token.
 */
const authorize = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    // If token is missing, send a "Bad Credentials" error
    if (!token) {
        return res.status(401).json({message: "Unauthorized"}); // Return here to prevent further execution
    }

    try {
        // Verify the token
        const decodedData = jwt.verify(token, "test");  // 'test' should ideally be an environment variable
        req.userId = decodedData?.id;  // Attach user ID to the request object
        next();  // Proceed to the next middleware/handler
    } catch (error) {
        // If token is invalid or expired, handle the error
        return res.status(400).json({message: "Invalid or expired token"});
    }
};

module.exports = authorize;
