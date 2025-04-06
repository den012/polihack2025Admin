import { Router } from 'express';
import { createEvent } from '../controller/formController';

const router = Router();

router.post('/events', createEvent);

export default router;