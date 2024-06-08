import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// router.route('/register');
router.route("/login").post(authController.login);

// module.exports = router;
export default router;
