import ApiError from "../Utils/ApiError.js";
import {Brand, Type} from "../models/models.js";
import HelperFiles from "../Utils/helperFiles.js";

class BrandController {
    async create(req, res, next) {
        try {
            const {title} = req.body;
            const {logo} = req.files;


            if (!title || !logo) {
                return next(ApiError.badRequest('Not set name or logo'))
            }

            const fileName = HelperFiles.makeImgReturnPath(logo)

            const brand = await Brand.create({name: title, photo: fileName})

            return res.json(brand)

        } catch (e) {
            console.log('e', e)
            return next(ApiError.internal('Error', e))
        }
    }

    async get(req, res, next) {
        try {
            const brands = await Brand.findAll()

            return res.json(brands)

        } catch (e) {
            return next(ApiError.internal('Error', e))
        }
    }

    async updateTitle(req, res, next) {
        try {
            const { id, title } = req.body;

            if(!id) {
                return next(ApiError.badRequest('Not set id'))
            }

            let brand = await Brand.update({name: title}, {where: {id: id}, returning: true})

            return res.json(brand)
        } catch (e) {
            return next(ApiError.internal('Error', e))
        }
    }

    async updatePhoto(req, res, next) {
        try {
            const {id } = req.body;
            const {logo} = req.files;

            if(!id || !logo) {
                return next(ApiError.badRequest('Not set id or logo'))
            }

            const oldBrand = await Brand.findOne({where: {id}})
            const photoUrl = oldBrand.dataValues.photo
            if(photoUrl) {
               await HelperFiles.dellFile(photoUrl, ({status, data}) => {

                   if(status !== 'success') {
                       return next(ApiError.internal('Error', data))
                   }
               });
            }

            console.log(3)
            const fileName = HelperFiles.makeImgReturnPath(logo)

            let brand = await Brand.update({photo: fileName}, {where: {id: id}, returning: true})

            return res.json(brand)

        } catch (e) {
            console.log('Error', e)
            return next(ApiError.internal('Error', e))
        }
    }

    async dell(req, res, next) {
        try {
            const {id} = req.body;

            if(!id) {
                return next(ApiError.badRequest('Not set id'))
            }

            const brand = await Brand.findOne({where: {id}})
            const photoUrl = brand.dataValues.photo
            HelperFiles.dellFile(photoUrl, ({status, data}) => {
                if(status !== 'success') {
                    return next(ApiError.internal('Error', data))
                }
            });

            await Brand.destroy({where: {id}})

            return res.json({message: 'success'})
        } catch (e) {
            return next(ApiError.internal('Error', e))
        }
    }
}

export default new BrandController()