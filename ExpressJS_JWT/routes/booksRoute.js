import express from "express";

import booksController from "../controllers/booksController.js";

const router = express.Router();

router.route("/").get(booksController.getAllBooks);

export default router;
// module.exports = router;
