import express from "express"
import { createItem, getAllItems, getItem, getAllUserItems, deleteItem } from "../controllers/itemController.js"
import jwtCheck from "../config/auth0Config.js"

const router = express.Router()

router.post("/createItem", jwtCheck, createItem)
router.get("/allItems", getAllItems)
router.get('/allUserItems', getAllUserItems)
router.delete('/delete/:id', jwtCheck, deleteItem)
router.get("/:id", getItem)

export { router as itemRoute }