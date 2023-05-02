import {Router} from "express";
import QuestionController from "../controllers/questionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('', authMiddleware, QuestionController.addQuestion);
router.post('/answer', authMiddleware, QuestionController.addQuestionAnswer);
router.get('', authMiddleware, QuestionController.getQuestion)

export default router