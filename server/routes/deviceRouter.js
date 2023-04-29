import {Router} from "express";
import deviceController from "../controllers/deviceController.js";

const router = new Router();

router.post('', deviceController.create)
router.post('/addPhoto', deviceController.addDevicePhoto)
router.patch('/photo', deviceController.updateMainPhoto)
router.patch('/', deviceController.changeInfoDevice)
router.post('/buyDevice', deviceController.buyDevice)
router.post('/newRating', deviceController.newRatingDevice)
router.get('/similar', deviceController.getSimilar)
router.get('/:id', deviceController.getOne)
router.get('/', deviceController.getAll)

export default router