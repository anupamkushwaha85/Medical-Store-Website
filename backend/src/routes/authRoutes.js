import { Router } from 'express';
import { adminLogin } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { adminLoginSchema } from '../utils/validators.js';

const router = Router();

router.post('/admin/login', validate(adminLoginSchema), adminLogin);

export default router;
