import {Router} from "express";
import userController from "../controllers/userController.js";

const router = new Router();

router.post('/', userController.create)
router.get('/', userController.get)

export default router