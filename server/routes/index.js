import {Router} from "express";

import userRouter from './userRouter.js'
import deviceRouter from "./deviceRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";
import reviewRouter from "./reviewRouter.js";

const router = new Router();

router.use('/user', userRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/review', reviewRouter)

export default router