import {Router} from "express";
import ShopPageController from '../controllers/shopPageController.js'

const router = new Router();

router.patch('/', ShopPageController.change)
router.patch('/photo', ShopPageController.updatePhoto)
router.get('/:userId', ShopPageController.getOne)

export default router