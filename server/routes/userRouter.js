import {Router} from "express";
import userController from "../controllers/userController.js";
import authMeddleware from "../middleware/authMeddleware.js";

const router = new Router();

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/check', authMeddleware, userController.check)
router.get('/search/:id', userController.getOne)
router.get('/', userController.getAll)

export default router