import express from "express"
import { getAllFav, createUser, toFav, getUser } from "../controllers/userController.js"
import jwtCheck from "../config/auth0Config.js"

const router = express.Router()

router.post("/register", createUser)
router.post("/toFav/:rid", toFav)
router.get("/allFav", getAllFav)
router.get("/:email", getUser)

export { router as userRoute }