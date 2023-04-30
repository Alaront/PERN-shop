import ApiError from "../Utils/ApiError.js";
import {Review, ReviewComment, User} from "../models/models.js";

class ReviewController {
    async createByDevice(req, res, next) {
        try {
            let { text, positive, negative, grade, deviceId, userId } = req.body;

            if(!userId || !deviceId) {
                return next(ApiError.badRequest('Нет userId || deviceId'))
            }

            const reviewOld = await Review.findOne({where: {userId: userId, deviceId: deviceId}})
            if(reviewOld) {
                return next(ApiError.badRequest('Пользователь уже писал отзыв'))
            }

            if (!text || !positive || !negative || !grade) {
                return next(ApiError.badRequest('Нет текста или positive или negative или grade'))
            }

            const review = await Review.create({text,  rating: grade, userShopId: null, deviceId, positive, negative, userId})

            return res.json(review)

        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Error', e))
        }
    }

    async createByShop(req, res, next) {
        try {
            let { text, grade, userShopId, userId } = req.body;

            if(!userShopId || !userId) {
                return next(ApiError.badRequest('Нет userShopId или userId'))
            }

            const reviewOld = await Review.findOne({where: {userId: userId, userShopId: userShopId}})
            if(reviewOld) {
                return next(ApiError.badRequest('Пользователь уже писал отзыв'))
            }

            const review = await Review.create({text,  rating: grade, userShopId, deviceId: null, userId })

            return res.json(review)

        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Error', e))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;

            if(!id) {
                return next(ApiError.badRequest('Not set id'))
            }

            const review = await Review.findOne({where: {id}})

            return res.json(review)

        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Error', e))
        }
    }

    async reviewComment(req, res, next) {
        try {
            const {reviewId, text} = req.body;

            if(!reviewId || !text) {
                return next(ApiError.badRequest('reviewId или text не заданы'))
            }

            console.log(req.user.id)
            const user = await User.findOne({where: {id: req.user.id}})

            const parentComment = await Review.findOne({id: reviewId});

            if(!parentComment) {
                return next(ApiError.badRequest('not found reviewId'))
            }

            const reviewComment = await ReviewComment.create({text, reviewId, name: user.dataValues.name})

            return res.json(reviewComment)

        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Error', e))
        }
    }
}

export default new ReviewController()