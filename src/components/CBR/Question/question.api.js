const express = require("express");
const {
    createQuestion,
    getQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion,
} = require("./question.services");
const questionValidation = require("./question.validator");

const router = express.Router();

router.route("/").post(questionValidation, createQuestion).get(getQuestions);
router.route("/:id").get(getQuestion).put(updateQuestion).delete(deleteQuestion);

module.exports = router;
