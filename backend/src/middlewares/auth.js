import admin from '../config/firebase.js';

// Middleware to verify Firebase ID token
export const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // contains uid, email, etc.
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid user token' });
    }
};

// Middleware to verify admin session
export const verifyAdmin = (req, res, next) => {
    try {
        const adminSession = req.session?.admin;

        if (!adminSession?.username) {
            return res.status(401).json({ error: 'Unauthorized: Admin session required' });
        }

        if (process.env.ADMIN_USERNAME && adminSession.username !== process.env.ADMIN_USERNAME) {
            return res.status(403).json({ error: 'Forbidden: Requires admin privileges' });
        }

        req.admin = adminSession;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid admin session' });
    }
};
