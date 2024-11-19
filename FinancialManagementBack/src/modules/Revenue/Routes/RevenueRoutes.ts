import { Router } from 'express';
import { RevenueController } from '../Controller/RevenueController';

const router = Router();
const controller = new RevenueController;

router.post('/', controller.create); 
router.get('/', controller.getAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;