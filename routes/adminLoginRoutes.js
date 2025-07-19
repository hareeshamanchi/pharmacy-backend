// routes/adminLoginRoutes.js
import express from 'express';
import { loginAdmin } from '../controllers/adminLoginController.js';

const router = express.Router();

router.post('/', loginAdmin);

export default router;
