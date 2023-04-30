import {Router} from "express";
import reviewController from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/device', authMiddleware, reviewController.createByDevice)
router.post('/shop', authMiddleware, reviewController.createByShop)
router.post('/reviewComment', authMiddleware, reviewController.reviewComment)
router.get('/:id', reviewController.getOne)

export default router