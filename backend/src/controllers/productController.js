import mongoose from 'mongoose';
import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
import { asyncHandler, Errors } from '../utils/errors.js';
import { cacheGet, cacheSet, cacheInvalidatePattern } from '../config/redis.js';

/**
 * Create a new product (admin)
 * POST /api/products
 */
export const createProduct = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw Errors.badRequest('Product image is required');
    }

    if (req.file.size > 1 * 1024 * 1024) {
        throw Errors.badRequest('Image size exceeds 1MB limit. Please upload an image smaller than 1MB.');
    }

    // Upload image to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: 'products',
        resource_type: 'image',
    });

    const {
        name,
        brand,
        marked_price,
        selling_price,
        requires_prescription,
        category,
        description,
        composition,
        stock
    } = req.body;

    const product = await Product.create({
        name,
        brand,
        image_url: uploadResponse.secure_url,
        marked_price: Number(marked_price),
        selling_price: Number(selling_price),
        requires_prescription: requires_prescription === 'true' || requires_prescription === true,
        category,
        description,
        composition,
        stock: Number(stock) || 0
    });

    // Invalidate product list caches
    await cacheInvalidatePattern('products_*');

    res.status(201).json({
        success: true,
        product
    });
});

/**
 * Get paginated products with optional filters
 * GET /api/products
 */
export const getProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, category, search } = req.query;
    
    // Construct cache key
    const cacheKey = `products_page_${page}_limit_${limit}_cat_${category || 'all'}_search_${search || 'none'}`;
    const cachedData = await cacheGet(cacheKey);
    
    if (cachedData) {
        return res.json(cachedData);
    }

    const filter = {};

    // Only show active products for public requests (no admin token)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        filter.is_active = true;
    }

    if (category && mongoose.Types.ObjectId.isValid(category)) {
        filter.category = category;
    }

    if (search) {
        // Escape regex special characters to prevent ReDoS
        const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        filter.name = { $regex: safeSearch, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        Product.find(filter)
            .populate('category', 'name slug')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        Product.countDocuments(filter)
    ]);

    const responseData = {
        success: true,
        products,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / limit)
        }
    };

    await cacheSet(cacheKey, responseData);

    res.json(responseData);
});

/**
 * Get a single product by ID
 * GET /api/products/:id
 */
export const getProductById = asyncHandler(async (req, res) => {
    const cacheKey = `product_${req.params.id}`;
    const cachedProduct = await cacheGet(cacheKey);

    if (cachedProduct) {
        return res.json({ success: true, product: cachedProduct });
    }

    const product = await Product.findById(req.params.id).populate('category', 'name slug');

    if (!product) {
        throw Errors.notFound('Product not found');
    }

    await cacheSet(cacheKey, product);

    res.json({
        success: true,
        product
    });
});

/**
 * Update a product
 * PUT /api/products/:id
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw Errors.notFound('Product not found');
    }

    const updateData = { ...req.body };

    // Handle image update
    if (req.file) {
        if (req.file.size > 1 * 1024 * 1024) {
            throw Errors.badRequest('Image size exceeds 1MB limit. Please upload an image smaller than 1MB.');
        }

        // Delete old image from Cloudinary if it exists and is not a default placeholder
        if (product.image_url && product.image_url.includes('cloudinary')) {
            try {
                const urlParts = product.image_url.split('/');
                const filename = urlParts[urlParts.length - 1];
                const publicId = `products/${filename.split('.')[0]}`;
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error('Failed to delete old image from Cloudinary:', err);
            }
        }

        // Upload new image
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        const uploadRes = await cloudinary.uploader.upload(dataURI, {
            folder: 'products'
        });

        updateData.image_url = uploadRes.secure_url;
    }

    // Recalculate discount percentage (pre-save hook doesn't run on findByIdAndUpdate)
    const finalMarked = Number(updateData.marked_price) || product.marked_price;
    const finalSelling = Number(updateData.selling_price) || product.selling_price;
    if (finalMarked && finalSelling) {
        updateData.discount_percentage = Math.max(0, Math.round(((finalMarked - finalSelling) / finalMarked) * 100));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
    ).populate('category', 'name slug');

    // Invalidate caches
    await cacheInvalidatePattern('products_*');
    await cacheInvalidatePattern(`product_${req.params.id}`);

    res.json({
        success: true,
        product: updatedProduct
    });
});

/**
 * Delete a product
 * DELETE /api/products/:id
 */
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw Errors.notFound('Product not found');
    }

    // Delete image from Cloudinary
    if (product.image_url && product.image_url.includes('cloudinary')) {
        try {
            const urlParts = product.image_url.split('/');
            const filename = urlParts[urlParts.length - 1];
            const publicId = `products/${filename.split('.')[0]}`;
            await cloudinary.uploader.destroy(publicId);
        } catch (err) {
            console.error('Failed to delete image from Cloudinary:', err);
        }
    }

    await product.deleteOne();

    // Invalidate caches
    await cacheInvalidatePattern('products_*');
    await cacheInvalidatePattern(`product_${req.params.id}`);

    res.json({
        success: true,
        message: 'Product deleted successfully'
    });
});

/**
 * Toggle product active status
 * PATCH /api/products/:id/toggle
 */
export const toggleProductActive = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw Errors.notFound('Product not found');
    }

    product.is_active = !product.is_active;
    await product.save();

    // Invalidate caches
    await cacheInvalidatePattern('products_*');
    await cacheInvalidatePattern(`product_${req.params.id}`);

    res.json({
        success: true,
        product
    });
});
