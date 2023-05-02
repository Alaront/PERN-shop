import ApiError from "../Utils/ApiError.js";
import {Question, QuestionAnswer, ReviewComment, User} from "../models/models.js";

class QuestionController {
    async addQuestion(req, res, next) {
        try {
            const {text, deviceId, userId} = req.body;

            if(!text || !deviceId || !userId) {
                return next(ApiError.badRequest('Not set text or deviceId or userId'))
            }

            const question = await Question.create({text, deviceId, userId})

            return res.json(question)

        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Error', e))
        }
    }

    async addQuestionAnswer(req, res, next) {
        try {
            const {text, questionId, userId} = req.body;

            if(!text || !questionId || !userId) {
                return next(ApiError.badRequest('Not set text or deviceId or userId'))
            }

            const answer = await QuestionAnswer.create({text, questionId, userId})

            return res.json(answer)
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Error', e))
        }
    }

    async getQuestion(req, res, next) {
        try {
            const {deviceId} = req.body;

            const questions = await Question.findAll({
                    where: {deviceId},
                    include: [{model: User}, {model: QuestionAnswer, include: [{model: User}]}]
                }
            )

            return res.json(questions)
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Error', e))
        }
    }
}

export default new QuestionController();