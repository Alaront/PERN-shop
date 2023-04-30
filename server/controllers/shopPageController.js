import ApiError from "../Utils/ApiError.js";
import {Brand, UserShop} from "../models/models.js";
import HelperFiles from "../Utils/helperFiles.js";

class ShopPageController {
    async change(req, res, next) {
        try {
            let {id, title, description, email, phone, country} = req.body;

            if(!id ) {
                return next(ApiError.badRequest('Not set id'))
            }

            const {dataValues} = await UserShop.findOne({where: {id}})

            title = title || dataValues.title;
            description = description || dataValues.description;
            phone = phone || dataValues.phone;
            email = email || dataValues.email;
            country = country || dataValues.country;

            const newShopPage = await UserShop.update({title, description, email, phone, country}, {where: {id}, returning: true})

            return res.json(newShopPage)
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Error', e))
        }
    }

    async updatePhoto(req, res, next) {
        try {
            const {id} = req.body;
            const {photo} = req.files;

            if(!id || !photo) {
                return next(ApiError.badRequest('Not set id or logo'))
            }

            const oldBrand = await UserShop.findOne({where: {id}})
            const photoUrl = oldBrand.dataValues.img
            if(photoUrl) {
                await HelperFiles.dellFile(photoUrl, ({status, data}) => {

                    if(status !== 'success') {
                        return next(ApiError.internal('Error', data))
                    }
                });
            }
            const fileName = HelperFiles.makeImgReturnPath(photo)

            let shopPage = await UserShop.update({img: fileName}, {where: {id: id}, returning: true})

            return res.json(shopPage)

        } catch (e) {
            console.log('Error', e)
            return next(ApiError.internal('Error', e))
        }
    }

    async getOne(req, res, next) {
        try {
            const {userId} = req.params;

            const shopPage = await UserShop.findOne({where: {userId: userId}})

            return res.json(shopPage)

        } catch (e) {
            console.log(e)
            return next(ApiError.internal(e))
        }
    }
}

export default new ShopPageController()