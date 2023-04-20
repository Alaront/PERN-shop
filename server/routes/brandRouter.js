import {Router} from "express";
import brandController from "../controllers/brandController.js";

const router = new Router();

router.post('', brandController.create)
router.get('', brandController.get)
router.delete('', brandController.dell)
router.patch('/title', brandController.updateTitle)
router.patch('/photo', brandController.updatePhoto)

export default router