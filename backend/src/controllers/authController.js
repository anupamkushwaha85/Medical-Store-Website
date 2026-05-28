import jwt from 'jsonwebtoken';
import { asyncHandler, Errors } from '../utils/errors.js';

/**
 * Admin login
 * POST /api/admin/login
 */
export const adminLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw Errors.internal('JWT_SECRET is not configured on the server');
    }

    if (!adminUsername || !adminPassword) {
        throw Errors.internal('Admin credentials are not configured on the server');
    }

    if (username !== adminUsername || password !== adminPassword) {
        throw Errors.unauthorized('Invalid admin credentials');
    }

    const token = jwt.sign(
        { username, role: 'admin' },
        jwtSecret,
        { expiresIn: '24h' }
    );

    res.json({
        success: true,
        token,
        expiresIn: '24h'
    });
});
