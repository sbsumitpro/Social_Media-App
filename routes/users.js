const express = require("express")
const userController = require("../controllers/users_controller")
const router = express.Router()
const passport = require("../config/passport-local-strategy")

router.get("/profile/:id", passport.checkAuthentication, userController.getProfile)

router.post("/update/:id", passport.checkAuthentication, userController.update)

router.get("/sign-up", userController.signUp)

router.get("/sign-in", userController.signIn)

router.post("/create", userController.create)

router.post("/create-session",passport.authenticate(
    "local",
    {failureRedirect:"/users/sign-in"},
),userController.createSession)

router.get("/sign-out", userController.destroySession)

router.get("/email-form", userController.verifyEmailForResetPassword)

router.post("/send-reset-password-email", userController.sendResetPasswordEmail)

router.get("/reset-password", userController.renderResetPassword)

router.post("/reset-password-verify", userController.resetPasswordAction)

router.get("/auth/google", passport.authenticate("google",{scope:["profile","email"]}));
router.get("/auth/google/callback", passport.authenticate("google",{failureRedirect:"/users/sign-in"}), userController.createSession);


module.exports = router