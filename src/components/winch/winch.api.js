const {
  signup,
  emailVerify,
  getNearestWinch,
  createWinch
} = require("./winch.services");
winchValidation=require("./winch.validator");
const router = require("express").Router();

router.post("/signup", winchValidation,signup,createWinch);
router.get("/verify/:token", emailVerify);
router.get("/getNearestWinch", getNearestWinch);
// const {
//   createWinch,
//   getWinch,
//   getWinches,
//   updateWinch,
//   deleteWinch,
// } = require("./winch.services");

// const router = express.Router();

// router.route("/").post(createWinch).get(getWinches);
// router.route("/:id").get(getWinch).put(updateWinch).delete(deleteWinch);

module.exports = router;
