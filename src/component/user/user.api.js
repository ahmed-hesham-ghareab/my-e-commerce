const { signUp, signIn } = require("./user.auth");
const { GetUsers, CreateUser, GetUser, UpdateUser, DeleteUser, ChangePasswordUser } = require("./user.service");

const router = require("express").Router();

router.route("/").post(CreateUser).get(GetUsers);
router.route("/:id").get(GetUser).put(UpdateUser);
router.delete("/:id", DeleteUser).patch("/changepassword/:id",ChangePasswordUser)
router.post("/signup",signUp)
router.post("/signin",signIn)
module.exports = router;
 