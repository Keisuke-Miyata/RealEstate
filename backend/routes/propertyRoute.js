import express from "express"
import { createResidency, getAllResidencies, getResidency } from "../controllers/propertyController.js"
import jwtCheck from "../config/auth0Config.js"

const router = express.Router()
router.post("/createProperty", createResidency)
router.get("/allProperties", getAllResidencies)
router.get("/:id", getResidency)
// router.get("/allUserProperties", getAllUserProperties)


export { router as propertyRoute }