import jwt from "jsonwebtoken";
import {config} from "dotenv";
import {where} from "sequelize"; //  config для работы с .env файлами для считывания данных
config() // запуск и считывание с файла


export default function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    console.log('START AUTH MIDDLE')

    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: "Нет токена"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded
        console.log('decoded', decoded)

        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: 'User not auth'})
    }
}