import { Router } from 'express';
import { ExpenseController } from '../Controller/ExpenseController';

const router = Router();
const controller = new ExpenseController;

router.post('/', controller.create); 
router.get('/', controller.getAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;