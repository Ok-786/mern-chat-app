import express from "express";
import { allUsers, authUser, registerUser, setAvatar } from "../controllers/userController.js";
import fileUpload from "../middleware/file-Upload.js";
// import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

const router = express.Router();

// router.post('/', fileUpload.single('file'), registerUser);
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/setAvatar/:id', fileUpload.single('file'), setAvatar);
router.get('/allUsers/:id', allUsers);
// router.get('/', userAuthMiddleware, allUsers);

export default router;