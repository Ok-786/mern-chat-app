import express from 'express';
import userAuthMiddleware from '../middleware/userAuthMiddleware.js';
import { accessChat, addMessage, addToGroup, createGroupChat, fetchChat, getAllMessage, removeFromGroup, renameGroup } from '../controllers/chatsController.js';
const router = express.Router();


router.post('/addmsg', addMessage);
router.post('/getmsg', getAllMessage);


router.post('/', userAuthMiddleware, accessChat);
router.get('/', userAuthMiddleware, fetchChat);
router.post('/group', userAuthMiddleware, createGroupChat);
router.get('/group/rename', userAuthMiddleware, renameGroup);
router.get('/group/remove', userAuthMiddleware, removeFromGroup);
router.get('/group/add', userAuthMiddleware, addToGroup);

export default router;