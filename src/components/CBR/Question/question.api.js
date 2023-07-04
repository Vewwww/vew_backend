const express = require("express");
const {
    createQuestion,
    getQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    getAllCategories,
    getQuestionsByCategory
} = require("./question.services");
const questionValidation = require("./question.validator");

const router = express.Router();
router.route("/category/:category").get(getQuestionsByCategory);
router.route("/getAllCategories").get(getAllCategories);
router.route("/").post(questionValidation, createQuestion).get(getQuestions);
router.route("/:id").get(getQuestion).put(updateQuestion).delete(deleteQuestion);

module.exports = router;
