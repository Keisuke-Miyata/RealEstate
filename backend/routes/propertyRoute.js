import express from "express"
import { createResidency, getAllResidencies, getResidency, getAllUserProperties } from "../controllers/propertyController.js"
import jwtCheck from "../config/auth0Config.js"

const router = express.Router()
router.post("/createProperty", createResidency)
router.get("/allProperties", getAllResidencies)
router.get("/allUserProperties", getAllUserProperties)
router.get("/:id", getResidency)

export { router as propertyRoute }