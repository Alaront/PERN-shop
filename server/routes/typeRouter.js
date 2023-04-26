import {Router} from "express";
import typeController from "../controllers/typeController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post('', checkRoleMiddleware('ADMIN'), typeController.create)
router.patch('', checkRoleMiddleware('ADMIN'), typeController.update)
router.delete('', checkRoleMiddleware('ADMIN'), typeController.del)
router.get('', typeController.get)

export default router