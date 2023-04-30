import jwt from "jsonwebtoken";
import {config} from "dotenv";
import {Device, User, UserShop} from "../models/models.js";
import ApiError from "../Utils/ApiError.js";
config()

export default async function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const {deviceId} = req.body;

        console.log('deviceId', deviceId)

        if(!token) {
            return res.status(401).json({message: "Not auth"})
        }

        if(!deviceId) {
            return res.status(401).json({message: "Not set device id"})
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        // const user = await User.findOne({where: {id: decode.id}});
        const device = await Device.findOne({where: {id: deviceId}})
        const userShop = await UserShop.findOne({where: {id: device.userShopId}});

        if(userShop.userId !== decode.id) {
            console.log(userShop.userId, decode.id )
            return  res.status(401).json('У вас нет доступа к редактированию данного продукта')
        }

        req.user = decode;
        next()
    } catch (e) {
        console.log(e)
    }
}