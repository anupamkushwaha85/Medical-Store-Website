import { Router } from 'express';
import { getOrders, updateOrderStatus } from '../controllers/adminController.js';
import { adminLogin, adminLogout, getAdminSession } from '../controllers/authController.js';
import { verifyAdmin } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { updateOrderStatusSchema, orderQuerySchema, adminLoginSchema } from '../utils/validators.js';

const router = Router();

router.post('/session/login', validate(adminLoginSchema), adminLogin);
router.get('/session', verifyAdmin, getAdminSession);
router.post('/session/logout', adminLogout);

router.get('/orders', verifyAdmin, validate(orderQuerySchema, 'query'), getOrders);
router.put('/orders/:id/status', verifyAdmin, validate(updateOrderStatusSchema), updateOrderStatus);

export default router;
