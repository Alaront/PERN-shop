import jwt from "jsonwebtoken";
import {config} from "dotenv";
import {User} from "../models/models.js";
config()

export default function (role) {
    return async function (req, res, next) {
        if(req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json({message: "Not auth"})
            }

            const decode = jwt.verify(token, process.env.SECRET_KEY);

            const user = await User.findOne({where: {id: decode.id}});
            if(user.role !== role) {
                return res.status(403).json({message: "Not promesion"})
            }

            req.user = decode;
            next()
        } catch (e) {
            console.log(e)
        }
    }
}