import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createAdminSessionMiddleware } from './src/config/session.js';
import { connectDB } from './src/config/db.js';
import { initFirebase } from './src/config/firebase.js';
import { connectCloudinary } from './src/config/cloudinary.js';
import { connectRedis } from './src/config/redis.js';
import { globalLimiter } from './src/middlewares/rateLimiter.js';
import { AppError, buildErrorResponse } from './src/utils/errors.js';

// Routes
import authRoutes from './src/routes/authRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

// ─── Environment Validation ───────────────────────────────────────────────────
const validateEnv = () => {
    const optionalEnvVars = [
        'SESSION_SECRET',
        'JWT_SECRET',
        'ADMIN_SESSION_NAME',
        'ADMIN_USERNAME',
        'ADMIN_PASSWORD',
        'UPSTASH_REDIS_REST_URL',
        'RAZORPAY_KEY_ID',
        'RAZORPAY_KEY_SECRET',
        'CLOUDINARY_CLOUD_NAME'
    ];

    optionalEnvVars.forEach((key) => {
        if (!process.env[key]) {
            console.warn(`⚠️  Warning: ${key} is not set. Some features may be disabled.`);
        }
    });
};

validateEnv();

// ─── Initialization ───────────────────────────────────────────────────────────
const app = express();
app.set('trust proxy', 1);

// Database and External Services
connectDB();
initFirebase();
connectCloudinary();
connectRedis();

// ─── Middlewares ──────────────────────────────────────────────────────────────
const envOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(url => url.trim().replace(/\/$/, ''))
    : [];

const defaultOrigins = [
    'https://jayamedicalstore.work.gd',
    'http://jayamedicalstore.work.gd',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
];

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. UptimeRobot, curl, server-to-server)
        if (!origin) return callback(null, true);
        const cleanOrigin = origin.replace(/\/$/, '');
        if (allowedOrigins.includes(cleanOrigin) || allowedOrigins.includes('*')) {
            return callback(null, true);
        }
        if (/^https?:\/\/localhost(:\d+)?$/.test(cleanOrigin) || /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(cleanOrigin)) {
            return callback(null, true);
        }
        return callback(null, true); // Permissive CORS fallback for custom domain/preview deployments
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(createAdminSessionMiddleware());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
app.use('/api', globalLimiter);

// ─── Health Check Endpoints (for UptimeRobot & Monitors) ─────────────────────
const sendHealthOk = (req, res) => {
    if (req.method === 'HEAD') {
        return res.sendStatus(200);
    }
    return res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production'
    });
};

app.get('/health', sendHealthOk);
app.head('/health', sendHealthOk);

app.get('/api/health', sendHealthOk);
app.head('/api/health', sendHealthOk);

app.get('/healthz', (req, res) => res.status(200).send('ok'));
app.head('/healthz', (req, res) => res.sendStatus(200));

app.head('/', (req, res) => res.sendStatus(200));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Jaya Medical Store API is running...');
});

// ─── Error Handling ───────────────────────────────────────────────────────────

// 404 Handler
app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global Error Handler
app.use((err, req, res, next) => {
    // Multer file size error
    if (err.code === 'LIMIT_FILE_SIZE') {
        err = new AppError('File size exceeds 1MB limit. Please upload an image under 1MB.', 400);
    }
    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const details = Object.values(err.errors).map(val => ({
            field: val.path,
            message: val.message
        }));
        err = new AppError('Validation failed', 400, details);
    }

    // Mongoose Cast Error (invalid ObjectId)
    if (err.name === 'CastError') {
        err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    }

    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
        err = new AppError('Duplicate field value entered', 409);
    }

    const statusCode = err.statusCode || 500;
    const isDev = process.env.NODE_ENV === 'development';

    if (statusCode === 500) {
        console.error('🔥 Server Error:', err);
    }

    res.status(statusCode).json(buildErrorResponse(err, isDev));
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('\n========================================');
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📡 Listening on port ${PORT}`);
    console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
    console.log('========================================\n');
});

export default app;
