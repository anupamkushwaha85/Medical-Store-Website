import session from 'express-session';
import MongoStore from 'connect-mongo';

export const getAdminSessionName = () => process.env.ADMIN_SESSION_NAME || 'jms_admin_sid';

export const getAdminSessionSecret = () => (
    process.env.SESSION_SECRET || process.env.JWT_SECRET || 'jms_admin_session_secret'
);

export const getAdminSessionSameSite = () => (
    process.env.NODE_ENV === 'production' ? 'none' : 'lax'
);

export const createAdminSessionMiddleware = () => session({
    name: getAdminSessionName(),
    secret: getAdminSessionSecret(),
    resave: false,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV === 'production',
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'admin_sessions',
        ttl: 60 * 60 * 24 * 7,
        autoRemove: 'native',
    }),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: getAdminSessionSameSite(),
        maxAge: 1000 * 60 * 60 * 8,
    },
});