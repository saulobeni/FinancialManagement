import { Router } from 'express';
import { AuthController } from '../Controller/AuthController';

const router = Router();
const controller = new AuthController();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/me', controller.getMe); 

export default router;
