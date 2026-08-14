import session from 'express-session';
import MongoStore from 'connect-mongo';

export const getAdminSessionName = () => process.env.ADMIN_SESSION_NAME || 'jms_admin_sid';

export const getAdminSessionSecret = () => (
    process.env.SESSION_SECRET || process.env.JWT_SECRET || 'jms_admin_session_secret_2026'
);

export const isCrossDomainOrProd = () => (
    process.env.NODE_ENV === 'production' || !!process.env.RENDER || !!process.env.CLIENT_URL
);

export const getAdminSessionSameSite = () => (
    isCrossDomainOrProd() ? 'none' : 'lax'
);

export const getAdminSessionSecure = () => (
    isCrossDomainOrProd() ? true : false
);

export const createAdminSessionMiddleware = () => {
    const isProd = isCrossDomainOrProd();

    const sessionOptions = {
        name: getAdminSessionName(),
        secret: getAdminSessionSecret(),
        resave: false,
        saveUninitialized: false,
        proxy: true, // Always trust proxy on Render for correct HTTPS headers
        rolling: true,
        cookie: {
            httpOnly: true,
            secure: isProd ? true : false,
            sameSite: isProd ? 'none' : 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
    };

    if (process.env.MONGO_URI) {
        try {
            sessionOptions.store = MongoStore.create({
                mongoUrl: process.env.MONGO_URI,
                collectionName: 'admin_sessions',
                ttl: 60 * 60 * 24 * 7,
                autoRemove: 'native',
            });
        } catch (e) {
            console.error('⚠️ MongoStore initialization error:', e.message);
        }
    }

    return session(sessionOptions);
};