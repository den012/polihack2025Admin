import { Router } from 'express';
import { createEvent, getCategories } from '../controller/formController';

const router = Router();

router.post('/events', createEvent);
router.get('/categories', getCategories);

export default router;