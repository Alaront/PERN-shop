import { transliterate as tr } from 'transliteration';
import ApiError from "../Utils/ApiError.js";
import {Type} from "../models/models.js";
import {where} from "sequelize";

class TypeController {
    async create(req, res, next) {
        try {
            let {name, slug} = req.body;

            if(!name) {
                return next(ApiError.badRequest('Not set name'))
            }

            if(!slug) {
                slug = tr(name).replace(' ', '') + '_' + Date.now()
            }

            const type = await Type.create({name, slug: tr(slug)})

            return res.json(type)

        } catch (e) {
            return next(ApiError.internal('Error', e))
        }
    }

    async get(req, res, next) {
        try {
            const type = await Type.findAll()

            return res.json(type)

        } catch (e) {
            return next(ApiError.internal('Error', e))
        }
    }

    async update(req, res, next) {
        try {
            const {id, name, slug} = req.body;

            if(!id) {
                return next(ApiError.badRequest('Not set id'))
            }

            let type = null;

            if(name && !slug) {
                type = await Type.update({name: name}, {where: {id: id}, returning: true})
            }

            if(!name && slug) {
                type = await Type.update({slug: slug}, {where: {id: id}, returning: true})
            }

            if(name && slug) {
                type = await Type.update({name: name, slug: slug}, {where: {id: id}, returning: true})
            }


            return res.json(type)
        } catch (e) {
            return next(ApiError.internal('Error', e))
        }
    }

    async del(req, res, next) {
        try {
            const {id} = req.body;

            if(!id) {
                return next(ApiError.badRequest('Not set id'))
            }

            await Type.destroy({where: {id}})

            return res.json({message: 'success'})

        }catch (e) {
            return next(ApiError.internal('Error', e))
        }

    }
}

export default new TypeController()