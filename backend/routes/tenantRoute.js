import express from "express"
import { createTenant, getAllTenants, getTenant, getAllUserTenant } from "../controllers/tenantController.js"
import jwtCheck from "../config/auth0Config.js"

const router = express.Router()

router.post("/createTenant", createTenant)
router.get("/allTenants", getAllTenants)
router.get('/allUserTenants', getAllUserTenant)
router.get("/:id", getTenant)

export { router as tenantRoute }