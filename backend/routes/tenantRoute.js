import express from "express"
import { createTenant, getAllTenants, getTenant } from "../controllers/tenantController.js"

const router = express.Router()

router.post("/createTenant", createTenant)
router.get("/allTenants", getAllTenants)
router.get("/:id", getTenant)