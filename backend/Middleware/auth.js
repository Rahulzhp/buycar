const jwt = require("jsonwebtoken")
const key = "cars"
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Authentication token is missing" });
    }

    try {
        const decoded = jwt.verify(token, "cars"); // Replace with your secret key
        req.user = decoded; // Store user information in the request object
        console.log("desvbsvsv", decoded)

        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ error: "Invalid token or token has expired" });
    }
}
module.exports = {
    authenticate
};

