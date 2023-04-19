import {Router} from "express";
import reviewController from "../controllers/reviewController.js";

const router = new Router();

router.post('', reviewController.create)
router.get('', reviewController.get)

export default router