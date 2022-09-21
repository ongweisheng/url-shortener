import express from "express"
import * as urlController from "../controllers/urlController.js"

const router = express.Router();

router.route("/").post(urlController.createShortenedUrl)
router.route("/").get(urlController.getUrls)

export default router