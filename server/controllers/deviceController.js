import ApiError from "../Utils/ApiError.js";
import {
    Brand,
    Device,
    DeviceCharacteristics,
    DeviceInfo,
    User,
    UserShop,
    DevicePhoto,
    Review, ReviewComment, Question, QuestionAnswer, UserOperation
} from "../models/models.js";
import HelperFiles from "../Utils/helperFiles.js";

const average = array => array.reduce((a, b) => a + b) / array.length;

class DeviceController {
    constructor() {
    }


    async create(req, res, next) {
        try {
            let {userId, price, discount, count, countSales, typeId, brandId, fullName, text, ratingSetUsers, rating, characteristics}  = req.body;
            let {photo} = req.files;

            if(!userId) {
                return next(ApiError.badRequest('Not set userID'))
            }

            const {id} = await UserShop.findOne({where: {userId: userId}})

            console.log('photo', photo)

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

            const device = await Device.create({ price, discount, count, countSales, typeId, brandId, userShopId: id });
            const deviceInfo = await DeviceInfo.create({ fullName, text, ratingSetUsers, rating, deviceId: device.id, mainPhoto: photo });

            console.log('characteristics', characteristics)
            console.log(this)
            if(characteristics) {
                characteristics = JSON.parse(characteristics);
                console.log(this)
                characteristics.forEach((item) => {
                    DeviceCharacteristics.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id
                    })
                })
            }

            return res.json({ device, deviceInfo })

        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async addDevicePhoto(req, res, next) {
        try {
            const {deviceId} = req.body;
            const {photo} = req.files;

            if(!deviceId || !photo) {
                return next(ApiError.badRequest('Not set id or logo'))
            }

            const fileName = HelperFiles.makeImgReturnPath(photo)

            const photoNew = await DevicePhoto.create({url: fileName, text: '', deviceId})

            return res.json(photoNew)

        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
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
        console.log('change info')
        try {
            let { id, price, discount, count, typeId, brandId, fullName, text }  = req.body;

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
            const {id} = req.params;

            if(!id) {
                return next(ApiError.badRequest('Not set id'))
            }

            const device = await Device.findOne({where: {id}})
            const deviceInfo = await DeviceInfo.findOne({where: {deviceId: id}})
            const deviceCharacteristics = await DeviceCharacteristics.findAll({where: {deviceId: id}})
            const deviceShopOwner = await UserShop.findOne({where: {id: device.userShopId}})
            const devicePhotos = await DevicePhoto.findAll({where: {deviceId: id}})
            const deviceReviews = await Review.findAll({
                where: {deviceId: id},
                include: [{model: User}, {model: ReviewComment}]
            })
            const deviceQuestions = await Question.findAll({
                    where: {deviceId: id},
                    include: [{model: User}, {model: QuestionAnswer, include: [{model: User}]}]
                }
            )
            const shopTitle = deviceShopOwner.title;

            return res.json({shopTitle, device, deviceInfo, deviceCharacteristics, devicePhotos, deviceReviews, deviceQuestions})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async getSimilar(req, res, next) {
        try {
            const {typeId, brandId} = req.query;


            const productByType = await Device.findAll({
                where: {typeId},
                limit: 10,
                include: [{model: DeviceInfo}]
            })
            const productByBrand = await  Device.findAll({where: {brandId}, limit: 5 })


            const similarProduct = [...productByType];

            return res.json(similarProduct)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async getAll(req, res, next) {
        try {
            const device = await Device.findAll();
            const deviceInfo = await DeviceInfo.findAll();

            return res.json({device, deviceInfo})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async buyDevice(req, res, next) {
        try {
            const {id, countForBuy} = req.body;

            if(!id || !countForBuy) {
                return next(ApiError.badRequest('Not set id or countForBuy'))
            }

            const device = await Device.findOne({where: {id}})

            const count = await device.dataValues.count - countForBuy;

            if(count < 0) {
                return next(ApiError.badRequest('Недостаточно товаров для покупки'))
            }

            const countSales = await device.dataValues.countSales + countForBuy;

            const newDevice = await Device.update({count, countSales}, {where: {id}, returning: true});
            const deviceOwner = await User.findOne({where: {id: device.dataValues.userShopId}})

            await UserOperation.create({sum: countForBuy * device.dataValues.price, type: 'Покупка', userId: req.user.id, product: id, count: countForBuy})
            await UserOperation.create({sum: countForBuy * device.dataValues.price, type: 'Продажа', userId: deviceOwner.dataValues.id, product: id, count: countForBuy})

            return res.json(newDevice)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async newRatingDevice(req, res, next) {
        try {
            const {deviceId, userId, grade} = req.body;

            if(!deviceId || !userId || !grade) {
                return next(ApiError.badRequest('Not set id or userId or score'))
            }

            const device = await DeviceInfo.findOne({where: {deviceId}});

            let beforeUser = false;
            let arrayScore = [];

            let ratingSetUsers = device.dataValues.ratingSetUsers ? JSON.parse(device.dataValues.ratingSetUsers) : [];

            console.log(ratingSetUsers)

            ratingSetUsers.forEach(item => {
                arrayScore.push(item.score)

                if(item.userId === userId) beforeUser = true
            })

            if(beforeUser) {
                return next(ApiError.badRequest('Данный пользователь уже устанавливал оценку'))
            }

            const rating = Math.round(average([...arrayScore, grade]))
            ratingSetUsers = JSON.stringify([...ratingSetUsers, {userId: userId, score: grade}]);

            const deviceNew = await DeviceInfo.update({rating, ratingSetUsers}, {where: {id: deviceId}, returning: true});

            return res.json(deviceNew)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async getDevicesById(req, res, next) {
        try {
            let {allId} = req.body;

            console.log('allId', allId)

            console.log(allId)

            if(!allId) {
                return next(ApiError.badRequest('not set allId'));
            }

            const products = await Device.findAll({where: {id: allId}, include: [{model: DeviceInfo}]})

            return res.json(products)

        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }
}

export default new DeviceController()