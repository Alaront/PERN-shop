import ApiError from "../Utils/ApiError.js";
import {Brand, Device, DeviceCharacteristics, DeviceInfo, UserShop} from "../models/models.js";
import HelperFiles from "../Utils/helperFiles.js";

const average = array => array.reduce((a, b) => a + b) / array.length;

class DeviceController {
    async create(req, res, next) {
        try {
            let {userShopId, price, discount, count, countSales, typeId, brandId, fullName, text, ratingSetUsers, rating, characteristics}  = req.body;
            let {photo} = req.files;

            if(!userShopId) {
                return next(ApiError.badRequest('Not set userShopId'))
            }

            if(!typeId || !brandId) {
                return next(ApiError.badRequest('Not set typeId || brandId'))
            }

            price = price || 0;
            discount = discount || 0;
            count = count || 0;
            countSales = countSales || 0;
            fullName = fullName || '-';
            text = text || '-';
            ratingSetUsers = ratingSetUsers || '';
            rating = rating || 0;

            if(!photo) {
                photo = '';
            } else  {
                photo = HelperFiles.makeImgReturnPath(photo)
            }

            const device = await Device.create({ price, discount, count, countSales, typeId, brandId, userShopId });
            const deviceInfo = await DeviceInfo.create({ fullName, text, ratingSetUsers, rating, deviceId: device.id, mainPhoto: photo });

            console.log('characteristics', characteristics)
            if(characteristics) {
                characteristics = JSON.parse(characteristics);

                characteristics.forEach((item) => {
                    this.deviceCharacteristicsWrite(item, device.id);
                })
            }

            return res.json({ device, deviceInfo })

        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async deviceCharacteristicsWrite(item, deviceId) {
        await DeviceCharacteristics.create({
            title: item.title,
            description: item.description,
            deviceId
        })
    }

    async updateMainPhoto(req, res, next) {
        try {
            const {deviceId} = req.body;
            const {photo} = req.files;

            if(!deviceId || !photo) {
                return next(ApiError.badRequest('Not set id or logo'))
            }

            const oldMainPhoto = await DeviceInfo.findOne({where: {deviceId}})
            const photoUrl = oldMainPhoto.dataValues.mainPhoto

            if(photoUrl) {
                await HelperFiles.dellFile(photoUrl, ({status, data}) => {
                    if(status !== 'success') {
                        return next(ApiError.internal('Error', data))
                    }
                });
            }

            const fileName = HelperFiles.makeImgReturnPath(photo)

            let deviceInfo = await DeviceInfo.update({mainPhoto: fileName}, {where: {deviceId}, returning: true})

            return res.json(deviceInfo)

        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async  changeInfoDevice(req, res, next) {
        try {
            let {id, price, discount, count, typeId, brandId, fullName, text }  = req.body;

            if(!id) {
                return next(ApiError.badRequest('Not set id '))
            }

            const DeviceOld = await Device.findOne({where: {id}})
            const DeviceInfoOld = await DeviceInfo.findOne({where: {deviceId: id}})

            price = price || DeviceOld.dataValues.price;
            discount = discount || DeviceOld.dataValues.discount;
            count = count || DeviceOld.dataValues.count;
            typeId = typeId || DeviceOld.dataValues.typeId;
            brandId = brandId || DeviceOld.dataValues.brandId;

            fullName = fullName || DeviceInfoOld.dataValues.fullName;
            text = text || DeviceInfoOld.dataValues.text;

            // const newShopPage = await UserShop.update({title, description, email, phone, country}, {where: {id}, returning: true})

            const device = await Device.update({price, discount, count, typeId, brandId}, {where: {id}, returning: true})
            const deviceInfo = await DeviceInfo.update({fullName, text}, {where: {deviceId: id}, returning: true})

            return res.json({device, deviceInfo})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }

    }

    async getOne(req, res, next) {
        try {
            const {id} = req.body;

            if(!id) {
                return next(ApiError.badRequest('Not set id'))
            }

            const device = await Device.findOne({where: {id}})
            const deviceInfo = await DeviceInfo.findOne({where: {deviceId: id}})

            return res.json({device, deviceInfo})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async buyDevice(req, res, next) {
        try {
            const {id} = req.body;

            if(!id) {
                return next(ApiError.badRequest('Not set id'))
            }

            const device = await Device.findOne({where: {id}})

            const count = await device.dataValues.count - 1;

            if(count < 0) {
                return next(ApiError.badRequest('Недостаточно товаров для покупки'))
            }

            const countSales = await device.dataValues.countSales + 1;

            const newDevice = await Device.update({count, countSales}, {where: {id}, returning: true})

            return res.json(newDevice)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async newRatingDevice(req, res, next) {
        try {
            const {deviceId, userId, score} = req.body;

            if(!deviceId || !userId || !score) {
                return next(ApiError.badRequest('Not set id or userId or score'))
            }

            const device = await Device.findOne({where: {id: deviceId}});

            let beforeUser = false;
            let arrayScore = [];

            let ratingSetUsers = JSON.parse(device.dataValues.ratingSetUsers);

            ratingSetUsers.forEach(item => {
                arrayScore.push(item.score)

                if(item.userId === userId) beforeUser = true
            })

            if(beforeUser) {
                return next(ApiError.badRequest('Данный пользователь уже устанавливал оценку'))
            }

            const rating = average(arrayScore)
            ratingSetUsers = [...ratingSetUsers, {userId: userId, score: score}];

            const deviceNew = await Device.update({rating, ratingSetUsers}, {where: {id: deviceId}, returning: true});

            return res.json(deviceNew)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }
}

export default new DeviceController()