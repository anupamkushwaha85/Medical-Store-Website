import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({ 
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit per image
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (JPEG, PNG, WEBP, GIF, SVG) are allowed'), false);
        }
    }
});
