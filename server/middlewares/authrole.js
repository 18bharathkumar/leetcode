// middlewares/authorizeRole.js

// Middleware factory to authorize based on user role
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Role information missing.' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

export default authorizeRole;
