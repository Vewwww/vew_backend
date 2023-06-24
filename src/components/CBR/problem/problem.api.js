const express = require("express");
const {
    createProblem,
    getProblem,
    getProblems,
    updateProblem,
    deleteProblem,
    getUnsolved
} = require("./problem.services");

const router = express.Router();

router.route("/unsolved").get(getUnsolved);
router.route("/").post(createProblem).get(getProblems);
router.route("/:id").get(getProblem).put(updateProblem).delete(deleteProblem);

module.exports = router;
