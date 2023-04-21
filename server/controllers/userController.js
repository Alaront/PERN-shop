import ApiError from "../Utils/ApiError.js";
import {config} from "dotenv";
import jwt from 'jsonwebtoken';
import {User, UserShop} from "../models/models.js";
import bcrypt from 'bcrypt';

config()

const generateJwt = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET_KEY)
}

class UserController {
    async registration(req, res, next) {
        try {
            const {name, email, pass} = req.body;

            if(!name || !email || !pass) {
                return next(ApiError.badRequest('Не задан name email pass'))
            }
            const candidate = await User.findOne({where: {email}});

            if(candidate) {
                return next(ApiError.badRequest('Пользователь с такой почтой уже существует'))
            }

            const hashPassword = await bcrypt.hash(pass, 5);
            const user = await User.create({name: name, email: email, role: 'USER', password: hashPassword})
            const userShop = await UserShop.create({title: name + '-shop', userId: user.id})

            const token = generateJwt(user.id, email)

            return res.json({token})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Error', e))
        }
    }

    async login(req, res, next) {
        const {email, pass} = req.body;

        const user = await User.findOne({where: {email}})

        if(!user) {
            return next(ApiError.internal('Неверный email или пароль'))
        }

        let compressPassword = bcrypt.compareSync(pass, user.password)
        if(!compressPassword) {
            return next(ApiError.internal('Неверный email или пароль'))
        }

        const token = generateJwt(user.id, email.email)
        return res.json(token)
    }

    async getOne(req, res) {
        const {id} = req.params;

        const user = await User.findOne({where: {id}});

        return res.json(user);
    }

    async auth(req, res, next) {
        const {id} = req.query

        if(!id) {
            return next(ApiError.badRequest('Not set ID'))
        }

        return res.json(id)
    }
}

export default new UserController()