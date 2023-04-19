import ApiError from "../Utils/ApiError.js";

class UserController {
    async create(res, req) {

    }

    async get(req, res) {
        return res.status(203).json('Answer test')
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