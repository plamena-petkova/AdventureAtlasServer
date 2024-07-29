const { register, login, getAllUsers } = require("../controllers/userController");


const router = require("express").Router();

router.post("/sign-up", register);
router.post("/login", login);
router.get("/all-users", getAllUsers);

module.exports = router;