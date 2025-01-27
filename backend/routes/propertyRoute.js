import express from "express"
import { createResidency, getAllResidencies, getResidency } from "../controllers/propertyController.js"

const router = express.Router()
router.post("/createProperty", createResidency)
router.get("/allProperties", getAllResidencies)
router.get("/:id", getResidency)


export { router as propertyRoute }