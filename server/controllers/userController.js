class UserController {
    async create(res, req) {

    }

    async get(req, res) {
        return res.status(203).json('Answer test')
    }
}

export default new UserController()