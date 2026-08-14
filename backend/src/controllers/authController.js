import jwt from 'jsonwebtoken';
import { asyncHandler, Errors } from '../utils/errors.js';
import { getAdminSessionName, getAdminSessionSameSite, getAdminSessionSecret } from '../config/session.js';

const promisifySessionAction = (action) => new Promise((resolve, reject) => {
    action((error) => {
        if (error) {
            reject(error);
            return;
        }

        resolve();
    });
});

const clearCookieOptions = () => ({
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: getAdminSessionSameSite(),
});

/**
 * Admin login
 * POST /api/admin/session/login
 */
export const adminLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
        throw Errors.internal('Admin credentials are not configured on the server');
    }

    if (username !== adminUsername || password !== adminPassword) {
        throw Errors.unauthorized('Invalid admin credentials');
    }

    if (!req.session) {
        throw Errors.internal('Session middleware is not configured');
    }

    await promisifySessionAction((done) => req.session.regenerate(done));

    req.session.admin = {
        username,
        loggedInAt: new Date().toISOString(),
    };

    await promisifySessionAction((done) => req.session.save(done));

    // Generate JWT for alternative auth that bypasses third-party cookie restrictions
    const token = jwt.sign(
        { username, role: 'admin' },
        getAdminSessionSecret(),
        { expiresIn: '7d' }
    );

    res.json({
        success: true,
        admin: req.session.admin,
        token
    });
});

export const getAdminSession = asyncHandler(async (req, res) => {
    if (!req.admin?.username) {
        throw Errors.unauthorized('Admin session not found');
    }

    res.json({
        success: true,
        admin: req.admin,
    });
});

export const adminLogout = asyncHandler(async (req, res) => {
    const sessionName = getAdminSessionName();

    if (!req.session) {
        return res.json({ success: true, message: 'Admin logged out' });
    }

    await promisifySessionAction((done) => req.session.destroy(done));

    res.clearCookie(sessionName, clearCookieOptions());

    res.json({
        success: true,
        message: 'Admin logged out',
    });
});
