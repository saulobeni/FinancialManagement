import { Router } from 'express';
import { UsersController } from '../Controller/UserController';

const router = Router();
const controller = new UsersController;

router.get('/', controller.getAll);
router.get('/:id', controller.getUsersById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;