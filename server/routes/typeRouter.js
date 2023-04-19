import {Router} from "express";
import typeController from "../controllers/typeController.js";

const router = new Router();

router.post('', typeController.create)
router.patch('', typeController.update)
router.delete('', typeController.del)
router.get('', typeController.get)

export default router