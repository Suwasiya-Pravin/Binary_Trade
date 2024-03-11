// Middleware to check user type (developer or admin)
const checkAdminOrDev = (req, res, next) => {
    // Check if the user is authenticated and their userType is developer or admin
    if (req.rootUser && (req.rootUser.userType === 'developer' || req.rootUser.userType === 'admin')) {
      // If user is developer or admin, proceed to the next middleware
      next();
    } else {
      // If user is not authorized, return an error response
      return res.status(403).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = checkAdminOrDev;