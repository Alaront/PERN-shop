import {Router} from "express";
import userController from "../controllers/userController.js";

const router = new Router();

router.post('/', userController.create)
router.get('/', userController.get)
router.get('/auth', userController.auth)

export default router