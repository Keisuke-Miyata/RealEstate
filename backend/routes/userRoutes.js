import express from "express"
import { getAllFav, createUser, toFav } from "../controllers/userController.js"

const router = express.Router()

router.post("/register", createUser)
router.post("/toFav/:rid", toFav)
router.get("/allFav", getAllFav)

export { router as userRoute }