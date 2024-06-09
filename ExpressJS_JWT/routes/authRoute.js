import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// router.route('/register');
router.route("/login").post(authController.login);
router.route("/refreshToken").post(authController.refreshToken);
router.route("/logout").post(authController.deleteToken);

// module.exports = router;
export default router;
