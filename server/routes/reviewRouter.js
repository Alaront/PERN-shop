import {Router} from "express";
import reviewController from "../controllers/reviewController.js";

const router = new Router();

router.post('/device', reviewController.createByDevice)
router.post('/shop', reviewController.createByShop)
router.post('/reviewComment', reviewController.reviewComment)
router.get('/:id', reviewController.getOne)

export default router