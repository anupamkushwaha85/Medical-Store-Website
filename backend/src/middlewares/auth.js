import admin from '../config/firebase.js';
import jwt from 'jsonwebtoken';
import { getAdminSessionSecret } from '../config/session.js';

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
        let adminUsername = req.session?.admin?.username;

        // Fallback to JWT if session cookie is missing (bypasses 3rd party cookie block)
        if (!adminUsername) {
            const token = req.headers.authorization?.split('Bearer ')[1];
            if (token) {
                try {
                    const decoded = jwt.verify(token, getAdminSessionSecret());
                    if (decoded.role === 'admin' && decoded.username) {
                        adminUsername = decoded.username;
                        req.admin = { username: adminUsername };
                    }
                } catch (e) {
                    // Invalid JWT
                }
            }
        }

        if (!adminUsername) {
            return res.status(401).json({ error: 'Unauthorized: Admin session required' });
        }

        if (process.env.ADMIN_USERNAME && adminUsername !== process.env.ADMIN_USERNAME) {
            return res.status(403).json({ error: 'Forbidden: Requires admin privileges' });
        }

        if (!req.admin) {
            req.admin = req.session?.admin || { username: adminUsername };
        }
        
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid admin session' });
    }
};
