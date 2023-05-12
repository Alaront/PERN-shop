import {Router} from "express";
import deviceController from "../controllers/deviceController.js";
import checkOwnerDeviceMiddleware from "../middleware/checkOwnerDeviceMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('', deviceController.create)
router.post('/addPhoto', checkOwnerDeviceMiddleware, deviceController.addDevicePhoto)
router.patch('/photo', checkOwnerDeviceMiddleware, deviceController.updateMainPhoto)
router.patch('/', checkOwnerDeviceMiddleware, deviceController.changeInfoDevice)
router.post('/buyDevice', authMiddleware, deviceController.buyDevice)
router.post('/newRating', authMiddleware, deviceController.newRatingDevice)
router.post('/getDevicesById', deviceController.getDevicesById)
router.post('/getDevicesByShop', deviceController.getDevicesByShop)
router.delete('/dellDevice', deviceController.dellDevice)
router.get('/getDevicesBySubString', deviceController.getDevicesBySubString)
router.get('/getDevicesForMain', deviceController.getDevicesForMain)
router.get('/similar', deviceController.getSimilar)
router.get('/search', deviceController.getDevicesByFilter)
router.get('/:id', deviceController.getOne)
router.get('/', deviceController.getAll)

export default router