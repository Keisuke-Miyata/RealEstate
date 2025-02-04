import express from "express"
import { createResidency, getAllResidencies, getResidency, getAllUserProperties, deleteResidency, updateProperty } from "../controllers/propertyController.js"
import jwtCheck from "../config/auth0Config.js"

const router = express.Router()
router.post("/createProperty", jwtCheck, createResidency)
router.get("/allProperties",getAllResidencies)
router.get("/allUserProperties", getAllUserProperties)
router.put("/update/:id", updateProperty)
router.delete('/delete/:id', jwtCheck, deleteResidency)
router.get("/:id", getResidency)


export { router as propertyRoute }