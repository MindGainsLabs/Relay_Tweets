import express from 'express';
import { getMessages, downloadMessages, getTotalMessages } from '../controllers/messageController.js';

const router = express.Router();

router.post('/retrieve-messages', getMessages);
router.get('/download-messages', downloadMessages);
router.get('/total-messages', getTotalMessages);

export default router;