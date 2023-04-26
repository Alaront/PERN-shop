import {Router} from "express";
import brandController from "../controllers/brandController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post('', checkRoleMiddleware('ADMIN'), brandController.create)
router.get('', brandController.get)
router.delete('', checkRoleMiddleware('ADMIN'), brandController.dell)
router.patch('/title', checkRoleMiddleware('ADMIN'), brandController.updateTitle)
router.patch('/photo', checkRoleMiddleware('ADMIN'), brandController.updatePhoto)

export default router