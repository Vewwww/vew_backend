const express = require("express");
const {
    createCase,
    getCases,
    getCase,
    updateCase,
    deleteCase,
    findSolution
} = require("./case.services");
const { caseValidation } = require("./case.validator");

const router = express.Router();
router.route("/cbr").post(findSolution);
router.route("/").post(caseValidation, createCase).get(getCases);
router.route("/:id").get(getCase).put(updateCase).delete(deleteCase);

module.exports = router;
