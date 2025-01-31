import express from "express"
import { createItem, getAllItems, getItem } from "../controllers/itemController.js"
import jwtCheck from "../config/auth0Config.js"

const router = express.Router()

router.post("/createItem", createItem)
router.get("/allItems", getAllItems)
router.get("/:id", getItem)

export { router as itemRoute }